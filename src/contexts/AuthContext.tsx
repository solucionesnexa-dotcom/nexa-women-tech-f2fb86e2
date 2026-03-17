import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isFounder: boolean;
  roles: string[];
  subscription: SubscriptionStatus | null;
  subscriptionLoading: boolean;
  refreshSubscription: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

type SubscriptionStatus = {
  subscribed?: boolean;
  subscription_end?: string | null;
  plan?: string | null;
} | null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFounder, setIsFounder] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionStatus>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  const fetchUserData = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_founder")
        .eq("user_id", userId)
        .single();
      setIsFounder(profile?.is_founder ?? false);

      const { data: userRoles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      setRoles(userRoles?.map((r) => r.role) ?? []);
    } catch {
      // ignore
    }
  };

  const refreshSubscription = async () => {
    setSubscriptionLoading(true);
    try {
      const { data } = await supabase.functions.invoke("check-subscription");
      setSubscription(data ?? null);
    } catch {
      setSubscription(null);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  useEffect(() => {
    const handleSession = async (nextSession: Session | null) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setIsFounder(false);
        setRoles([]);
        setSubscription(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      await fetchUserData(nextSession.user.id);
      setLoading(false);
      void refreshSubscription();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void handleSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      void handleSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isFounder,
        roles,
        subscription,
        subscriptionLoading,
        refreshSubscription,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

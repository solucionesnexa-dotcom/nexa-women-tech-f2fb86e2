import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  stripe_payment_id: string | null;
  created_at: string;
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
      setPayments(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="font-display font-bold">Pagos ({payments.length})</h2>
      </div>
      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Cargando...</div>
      ) : payments.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">No hay pagos registrados.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Importe</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Stripe ID</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3 font-medium">{p.amount}€</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      p.status === "completed" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.stripe_payment_id || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString("es-ES")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;

"use client";
import PaymentDashboard from "@/components/payment-dashboard";
import ErrorMessage from "@/components/ui/error";
import Spinner from "@/components/ui/spinner";
import { useGetReports } from "@/mutations/report-mutation";

export default function DashboardPage() {
  const { data, isLoading, isError, error } = useGetReports();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return <PaymentDashboard paymentData={data} />;
}

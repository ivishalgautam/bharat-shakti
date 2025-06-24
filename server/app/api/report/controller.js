"use strict";
import table from "../../db/models.js";

const getReports = async (req, res) => {
  try {
    const [stats, todayRevenue, trends, latest, breakdown] = await Promise.all([
      table.RazorpayPaymentModel.getDashboardStats(),
      table.RazorpayPaymentModel.getTodayRevenue(),
      table.RazorpayPaymentModel.getPaymentsOverTime(),
      table.RazorpayPaymentModel.getLatestTransactions(),
      table.RazorpayPaymentModel.getStatusBreakdown(),
    ]);

    res.send({
      status: true,
      data: {
        ...stats,
        revenue_today: todayRevenue,
        payments_overtime: trends,
        latest_transactions: latest,
        payment_status_breakdown: breakdown,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getReports: getReports,
};

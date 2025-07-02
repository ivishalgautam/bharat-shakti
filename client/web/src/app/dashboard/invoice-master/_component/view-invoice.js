import { rupee } from "@/lib/Intl";
import moment from "moment";

export default function ViewInvoice({ data }) {
  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="mb-2 text-3xl font-light text-gray-900">
          Invoice Details
        </h1>
        <div className="flex space-x-8 text-sm text-gray-500">
          <span>
            Invoice: <strong>{data.invoice_no}</strong>
          </span>
          <span>
            Bid: <strong>{data.bid_number}</strong>
          </span>
          <span>
            Date: <strong>{moment(data.date).format()}</strong>
          </span>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-lg font-medium text-gray-900">Summary</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">
                {data.invoice_quantity}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-500">
                Invoice Quantity
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">
                {data.accepted_quantity}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-500">
                Accepted Quantity
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-red-600">
                {data.rejected_quantity}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-500">
                Rejected Quantity
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-blue-600">
                {rupee.format(data.payment_received)}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-500">
                Payment Received
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-orange-600">
                {rupee.format(data.payment_dues)}
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-500">
                Payment Dues
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            Financial Breakdown
          </h2>
          <div className="space-y-3">
            {[
              {
                label: "Supplied Value (Basic)",
                value: data.supplied_value_basic,
              },
              { label: "Supplied Value (GST)", value: data.supplied_value_gst },
              {
                label: "Accepted Value (Basic)",
                value: data.accepted_value_basic,
              },
              { label: "Accepted Value (GST)", value: data.accepted_value_gst },
              {
                label: "LD Deduction",
                value: data.ld_deduction,
                negative: true,
              },
              { label: "GST TDS", value: data.gst_tds },
              { label: "IT TDS", value: data.it_tds },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-100 py-2"
              >
                <span className="text-gray-600">{item.label}</span>
                <span
                  className={`font-medium ${item.negative ? "text-red-600" : "text-gray-900"}`}
                >
                  {rupee.format(item.value)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            Order Information
          </h2>
          <div className="rounded-lg bg-gray-50 p-6">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="text-gray-500">Internal Order:</span>
                <span className="ml-2 font-medium">
                  {data.internal_order_no}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Unit:</span>
                <span className="ml-2 font-medium">{data.unit}</span>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Items:</span>
              <p className="mt-2 leading-relaxed text-gray-700">{data.items}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

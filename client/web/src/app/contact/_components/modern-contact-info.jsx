import { companyDetails } from "@/data/constants";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ModernContactInfo() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-3xl font-light text-slate-900">
          Get in Touch
        </h2>
        <p className="leading-relaxed text-slate-600">
          Our dedicated team is ready to help you navigate the world of tender
          bidding with confidence and success.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100">
            <Phone className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <h3 className="mb-1 font-medium text-slate-900">Phone</h3>
            <p className="text-sm text-slate-600 sm:text-base">
              {companyDetails.contact}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100">
            <Mail className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <h3 className="mb-1 font-medium text-slate-900">Email</h3>
            <p className="text-sm text-slate-600 sm:text-base">
              {companyDetails.mail}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100">
            <MapPin className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <h3 className="mb-1 font-medium text-slate-900">Office</h3>
            <p className="text-sm text-slate-600 sm:text-base">
              {companyDetails.address}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-100">
            <Clock className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <h3 className="mb-1 font-medium text-slate-900">Hours</h3>
            <p className="text-sm text-slate-600 sm:text-base">
              Monday - Friday: 9:00 AM - 6:00 PM
            </p>
            <p className="text-sm text-slate-600 sm:text-base">
              Saturday: 10:00 AM - 2:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

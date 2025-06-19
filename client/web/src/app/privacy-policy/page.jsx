export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Privacy Policy
            </h1>
            {/* <p className="text-gray-600">Last updated: June 11, 2025</p> */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-xl bg-white p-8 shadow-lg lg:p-12">
          {/* Introduction */}
          <div className="mb-12">
            <p className="mb-6 leading-relaxed text-gray-700">
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </p>
            <p className="leading-relaxed text-gray-700">
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </p>
          </div>

          {/* Interpretation and Definitions */}
          <section className="mb-12">
            <h2 className="mb-8 border-b-2 border-blue-200 pb-3 text-3xl font-bold text-gray-900">
              Interpretation and Definitions
            </h2>

            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                Interpretation
              </h3>
              <p className="leading-relaxed text-gray-700">
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </p>
            </div>

            <div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-800">
                Definitions
              </h3>
              <p className="mb-6 text-gray-700">
                For the purposes of this Privacy Policy:
              </p>

              <div className="space-y-4">
                {[
                  {
                    term: "Account",
                    definition:
                      "means a unique account created for You to access our Service or parts of our Service.",
                  },
                  {
                    term: "Affiliate",
                    definition:
                      'means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.',
                  },
                  {
                    term: "Company",
                    definition:
                      '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Bharat Shakti, No.18741, Gedam Layout, Ground Floor, Hingna, Nagpur 441110.',
                  },
                  {
                    term: "Cookies",
                    definition:
                      "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.",
                  },
                  {
                    term: "Country",
                    definition: "refers to: Maharashtra, India",
                  },
                  {
                    term: "Device",
                    definition:
                      "means any device that can access the Service such as a computer, a cellphone or a digital tablet.",
                  },
                  {
                    term: "Personal Data",
                    definition:
                      "is any information that relates to an identified or identifiable individual.",
                  },
                  {
                    term: "Service",
                    definition: "refers to the Website.",
                  },
                  {
                    term: "Service Provider",
                    definition:
                      "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.",
                  },
                  {
                    term: "Usage Data",
                    definition:
                      "refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).",
                  },
                  {
                    term: "Website",
                    definition:
                      "refers to Bharat Shakti, accessible from <a href='https://bharatshaktitenders.com/' target='_blank'>https://bharatshaktitenders.com/</a>",
                  },
                  {
                    term: "You",
                    definition:
                      "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-sm border-l-4 border-blue-500 bg-gray-50 p-4"
                  >
                    <p className="text-gray-700">
                      <strong className="text-gray-900">{item.term}</strong>{" "}
                      <span
                        dangerouslySetInnerHTML={{ __html: item.definition }}
                      />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Collecting and Using Your Personal Data */}
          <section className="mb-12">
            <h2 className="mb-8 border-b-2 border-blue-200 pb-3 text-3xl font-bold text-gray-900">
              Collecting and Using Your Personal Data
            </h2>

            <div className="mb-8">
              <h3 className="mb-6 text-2xl font-semibold text-gray-800">
                Types of Data Collected
              </h3>

              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-gray-800">
                  Personal Data
                </h4>
                <p className="mb-4 leading-relaxed text-gray-700">
                  While using Our Service, We may ask You to provide Us with
                  certain personally identifiable information that can be used
                  to contact or identify You. Personally identifiable
                  information may include, but is not limited to:
                </p>
                <div className="rounded-lg bg-blue-50 p-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {[
                      "Email address",
                      "First name and last name",
                      "Phone number",
                      "Address, State, Province, ZIP/Postal code, City",
                      "Usage Data",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-gray-800">
                  Usage Data
                </h4>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Usage Data is collected automatically when using the Service.
                </p>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Usage Data may include information such as Your Device&apos;s
                  Internet Protocol address (e.g. IP address), browser type,
                  browser version, the pages of our Service that You visit, the
                  time and date of Your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                </p>
                <p className="mb-4 leading-relaxed text-gray-700">
                  When You access the Service by or through a mobile device, We
                  may collect certain information automatically, including, but
                  not limited to, the type of mobile device You use, Your mobile
                  device unique ID, the IP address of Your mobile device, Your
                  mobile operating system, the type of mobile Internet browser
                  You use, unique device identifiers and other diagnostic data.
                </p>
                <p className="leading-relaxed text-gray-700">
                  We may also collect information that Your browser sends
                  whenever You visit our Service or when You access the Service
                  by or through a mobile device.
                </p>
              </div>

              <div className="mb-8">
                <h4 className="mb-4 text-xl font-semibold text-gray-800">
                  Tracking Technologies and Cookies
                </h4>
                <p className="mb-6 leading-relaxed text-gray-700">
                  We use Cookies and similar tracking technologies to track the
                  activity on Our Service and store certain information.
                  Tracking technologies used are beacons, tags, and scripts to
                  collect and track information and to improve and analyze Our
                  Service. The technologies We use may include:
                </p>

                <div className="mb-6 space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-gray-700">
                      <strong className="text-gray-900">
                        Cookies or Browser Cookies.
                      </strong>{" "}
                      A cookie is a small file placed on Your Device. You can
                      instruct Your browser to refuse all Cookies or to indicate
                      when a Cookie is being sent. However, if You do not accept
                      Cookies, You may not be able to use some parts of our
                      Service. Unless you have adjusted Your browser setting so
                      that it will refuse Cookies, our Service may use Cookies.
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Web Beacons.</strong>{" "}
                      Certain sections of our Service and our emails may contain
                      small electronic files known as web beacons (also referred
                      to as clear gifs, pixel tags, and single-pixel gifs) that
                      permit the Company, for example, to count users who have
                      visited those pages or opened an email and for other
                      related website statistics (for example, recording the
                      popularity of a certain section and verifying system and
                      server integrity).
                    </p>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-gray-700">
                  Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                  Cookies. Persistent Cookies remain on Your personal computer
                  or mobile device when You go offline, while Session Cookies
                  are deleted as soon as You close Your web browser. You can
                  learn more about cookies on{" "}
                  <a
                    href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    TermsFeed website
                  </a>{" "}
                  article.
                </p>

                <p className="mb-4 text-gray-700">
                  We use both Session and Persistent Cookies for the purposes
                  set out below:
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Necessary / Essential Cookies",
                      type: "Session Cookies",
                      admin: "Us",
                      purpose:
                        "These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.",
                    },
                    {
                      title: "Cookies Policy / Notice Acceptance Cookies",
                      type: "Persistent Cookies",
                      admin: "Us",
                      purpose:
                        "These Cookies identify if users have accepted the use of cookies on the Website.",
                    },
                    {
                      title: "Functionality Cookies",
                      type: "Persistent Cookies",
                      admin: "Us",
                      purpose:
                        "These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.",
                    },
                  ].map((cookie, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4"
                    >
                      <h5 className="mb-2 font-semibold text-gray-900">
                        {cookie.title}
                      </h5>
                      <div className="mb-2 text-sm text-gray-600">
                        <span className="font-medium">Type:</span> {cookie.type}{" "}
                        | <span className="font-medium">Administered by:</span>{" "}
                        {cookie.admin}
                      </div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Purpose:</span>{" "}
                        {cookie.purpose}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 leading-relaxed text-gray-700">
                  For more information about the cookies we use and your choices
                  regarding cookies, please visit our Cookies Policy or the
                  Cookies section of our Privacy Policy.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-6 text-2xl font-semibold text-gray-800">
                Use of Your Personal Data
              </h3>
              <p className="mb-6 text-gray-700">
                The Company may use Personal Data for the following purposes:
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "To provide and maintain our Service",
                    description:
                      "including to monitor the usage of our Service.",
                  },
                  {
                    title: "To manage Your Account:",
                    description:
                      "to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
                  },
                  {
                    title: "For the performance of a contract:",
                    description:
                      "the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.",
                  },
                  {
                    title: "To contact You:",
                    description:
                      "To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.",
                  },
                  {
                    title: "To provide You",
                    description:
                      "with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.",
                  },
                  {
                    title: "To manage Your requests:",
                    description: "To attend and manage Your requests to Us.",
                  },
                  {
                    title: "For business transfers:",
                    description:
                      "We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.",
                  },
                  {
                    title: "For other purposes",
                    description:
                      "We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.",
                  },
                ].map((use, index) => (
                  <div
                    key={index}
                    className="rounded-lg border-l-4 border-green-500 bg-gray-50 p-4"
                  >
                    <p className="text-gray-700">
                      <strong className="text-gray-900">{use.title}</strong>{" "}
                      {use.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mb-4 mt-8 text-gray-700">
                We may share Your personal information in the following
                situations:
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "With Service Providers:",
                    description:
                      "We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.",
                  },
                  {
                    title: "For business transfers:",
                    description:
                      "We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.",
                  },
                  {
                    title: "With Affiliates:",
                    description:
                      "We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.",
                  },
                  {
                    title: "With business partners:",
                    description:
                      "We may share Your information with Our business partners to offer You certain products, services or promotions.",
                  },
                  {
                    title: "With other users:",
                    description:
                      "when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.",
                  },
                  {
                    title: "With Your consent",
                    description:
                      "We may disclose Your personal information for any other purpose with Your consent.",
                  },
                ].map((sharing, index) => (
                  <div
                    key={index}
                    className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-3"
                  >
                    <p className="text-sm text-gray-700">
                      <strong className="text-gray-900">{sharing.title}</strong>{" "}
                      {sharing.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Retention of Your Personal Data
            </h3>
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p className="leading-relaxed text-gray-700">
                The Company will also retain Usage Data for internal analysis
                purposes. Usage Data is generally retained for a shorter period
                of time, except when this data is used to strengthen the
                security or to improve the functionality of Our Service, or We
                are legally obligated to retain this data for longer time
                periods.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Transfer of Your Personal Data
            </h3>
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                Your information, including Personal Data, is processed at the
                Company&apos;s operating offices and in any other places where
                the parties involved in the processing are located. It means
                that this information may be transferred to — and maintained on
                — computers located outside of Your state, province, country or
                other governmental jurisdiction where the data protection laws
                may differ than those from Your jurisdiction.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                Your consent to this Privacy Policy followed by Your submission
                of such information represents Your agreement to that transfer.
              </p>
              <p className="leading-relaxed text-gray-700">
                The Company will take all steps reasonably necessary to ensure
                that Your data is treated securely and in accordance with this
                Privacy Policy and no transfer of Your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of Your data and other
                personal information.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Delete Your Personal Data
            </h3>
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                You have the right to delete or request that We assist in
                deleting the Personal Data that We have collected about You.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                Our Service may give You the ability to delete certain
                information about You from within the Service.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                You may update, amend, or delete Your information at any time by
                signing in to Your Account, if you have one, and visiting the
                account settings section that allows you to manage Your personal
                information. You may also contact Us to request access to,
                correct, or delete any personal information that You have
                provided to Us.
              </p>
              <p className="leading-relaxed text-gray-700">
                Please note, however, that We may need to retain certain
                information when we have a legal obligation or lawful basis to
                do so.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Disclosure of Your Personal Data
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-xl font-semibold text-gray-800">
                  Business Transactions
                </h4>
                <p className="leading-relaxed text-gray-700">
                  If the Company is involved in a merger, acquisition or asset
                  sale, Your Personal Data may be transferred. We will provide
                  notice before Your Personal Data is transferred and becomes
                  subject to a different Privacy Policy.
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-xl font-semibold text-gray-800">
                  Law enforcement
                </h4>
                <p className="leading-relaxed text-gray-700">
                  Under certain circumstances, the Company may be required to
                  disclose Your Personal Data if required to do so by law or in
                  response to valid requests by public authorities (e.g. a court
                  or a government agency).
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-xl font-semibold text-gray-800">
                  Other legal requirements
                </h4>
                <p className="mb-4 text-gray-700">
                  The Company may disclose Your Personal Data in the good faith
                  belief that such action is necessary to:
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="space-y-2">
                    {[
                      "Comply with a legal obligation",
                      "Protect and defend the rights or property of the Company",
                      "Prevent or investigate possible wrongdoing in connection with the Service",
                      "Protect the personal safety of Users of the Service or the public",
                      "Protect against legal liability",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-3 h-2 w-2 rounded-full bg-gray-500"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Security of Your Personal Data
            </h3>
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <p className="leading-relaxed text-gray-700">
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 border-b-2 border-blue-200 pb-3 text-3xl font-bold text-gray-900">
              Children&apos;s Privacy
            </h2>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If You are a parent or guardian and
                You are aware that Your child has provided Us with Personal
                Data, please contact Us. If We become aware that We have
                collected Personal Data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from Our servers.
              </p>
              <p className="leading-relaxed text-gray-700">
                If We need to rely on consent as a legal basis for processing
                Your information and Your country requires consent from a
                parent, We may require Your parent&apos;s consent before We
                collect and use that information.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 border-b-2 border-blue-200 pb-3 text-3xl font-bold text-gray-900">
              Links to Other Websites
            </h2>
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                Our Service may contain links to other websites that are not
                operated by Us. If You click on a third party link, You will be
                directed to that third party&apos;s site. We strongly advise You
                to review the Privacy Policy of every site You visit.
              </p>
              <p className="leading-relaxed text-gray-700">
                We have no control over and assume no responsibility for the
                content, privacy policies or practices of any third party sites
                or services.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 border-b-2 border-blue-200 pb-3 text-3xl font-bold text-gray-900">
              Changes to this Privacy Policy
            </h2>
            <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-6">
              <p className="mb-4 leading-relaxed text-gray-700">
                We may update Our Privacy Policy from time to time. We will
                notify You of any changes by posting the new Privacy Policy on
                this page.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                We will let You know via email and/or a prominent notice on Our
                Service, prior to the change becoming effective and update the
                &quot;Last updated&quot; date at the top of this Privacy Policy.
              </p>
              <p className="leading-relaxed text-gray-700">
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-6 border-b-2 border-blue-200 pb-3 text-3xl font-bold text-gray-900">
              Contact Us
            </h2>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <p className="mb-4 text-gray-700">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <div className="flex items-center text-gray-700">
                <div className="mr-3 h-3 w-3 rounded-full bg-blue-500"></div>
                <span>By email: </span>
                <a
                  href="mailto:contact@bharatshaktitenders.com"
                  className="ml-1 text-blue-600 underline hover:text-blue-800"
                >
                  contact@bharatshaktitenders.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

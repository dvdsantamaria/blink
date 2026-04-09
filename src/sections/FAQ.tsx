import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Do you deliver custom printed blinds Australia-wide?',
    answer: `Yes! Blinds & Tales delivers custom printed roller blinds to all states and territories across Australia. We offer FREE measure and quote services in select metropolitan areas, and our blinds are Australian made with a comprehensive 5-year warranty. Whether you're in Sydney, Melbourne, Brisbane, Perth, Adelaide, or anywhere in between, we can help transform your windows with personalized designs.`,
    category: 'Delivery',
  },
  {
    question: 'How much do custom printed blinds cost in Australia?',
    answer: `Our custom printed roller blinds are competitively priced across Australia. Prices vary based on size, fabric choice, and design complexity. We offer FREE measure and quote services with no obligation in select areas. Contact us at 1800 676 583 for a personalized quote. We also offer payment plans and can work with most budgets. All quotes include manufacturing and delivery.`,
    category: 'Pricing',
  },
  {
    question: 'How long does delivery take for custom blinds in Australia?',
    answer: `From order confirmation to delivery, custom printed blinds typically take 2-3 weeks Australia-wide. This includes: 1) Order processing and design confirmation (1-2 days), 2) Manufacturing (10-14 days for Australian-made blinds), and 3) Shipping via trusted courier partners (2-7 days depending on location). Express shipping options available to Sydney, Melbourne, Brisbane, and Perth.`,
    category: 'Delivery',
  },
  {
    question: 'What types of blind designs do you offer?',
    answer: `We offer an extensive range of custom printed blind designs including: Nature & Tropical (floral, jungle, botanical), Coastal Living (ocean, beach, nautical themes), Kids & Nursery (dinosaurs, space, animals, fairy tales), Sports Fan (NRL, AFL, soccer, cricket), Wildlife (native Australian animals, birds), and Pets (cats, dogs, custom pet portraits). Cannot find what you are looking for? We can print ANY design - just provide your image!`,
    category: 'Products',
  },
  {
    question: 'Do you provide a warranty on your blinds?',
    answer: `Yes! All our blinds come with a comprehensive 5-year warranty covering manufacturing defects, mechanism failures, and fabric issues. As an Australian-made product, we stand behind our quality. Our warranty includes: free repairs for defects, replacement of faulty components, and fabric replacement if there are print quality issues. We also offer after-warranty repair services at competitive rates.`,
    category: 'Warranty',
  },
  {
    question: 'Are your blinds Australian made?',
    answer: `Yes! All our custom printed blinds are proudly Australian made. We manufacture locally, which means: faster turnaround times, support for Australian jobs, strict quality control, reduced environmental impact from shipping, and compliance with Australian standards. Our materials are sourced from Australian suppliers where possible, and our printing process uses eco-friendly, UV-resistant inks.`,
    category: 'Quality',
  },
  {
    question: 'Can I see samples before ordering?',
    answer: `Definitely! We offer fabric sample packs that can be delivered to your door anywhere in Australia. You can feel the quality, see print colors in person, and discuss design options with our team. Contact us to request a sample pack. For customers in select areas, we also offer in-home consultations where we bring samples to you.`,
    category: 'Samples',
  },
  {
    question: 'Do you offer installation services?',
    answer: `Yes! We offer professional installation services in select metropolitan areas including Sydney, Melbourne, Brisbane, and Perth metro areas. For customers outside these areas, our blinds are designed for easy DIY installation with comprehensive instructions included. We also provide video guides and phone support to help you install your blinds with confidence.`,
    category: 'Installation',
  },
  {
    question: 'What makes Blinds & Tales different from other blind companies?',
    answer: `Blinds & Tales stands out because: 1) We specialize in CUSTOM PRINTED designs - unlimited options, 2) Australia-wide delivery, 3) Australian made with 5-year warranty, 4) FREE measure and quote in select areas with no pressure sales, 5) Personal service from a family-owned business, 6) Fast turnaround times (2-3 weeks), 7) Full service from design to delivery, 8) Serving customers across all of Australia. Read our 500+ 5-star reviews to see why customers love us!`,
    category: 'About Us',
  },
  {
    question: 'How do I measure my windows for custom blinds?',
    answer: `Measuring for custom blinds is easy! We provide a comprehensive measurement guide with every order. For customers in Sydney, Melbourne, Brisbane, and Perth metro areas, we offer FREE professional measurement services. For all other areas, our customer service team can guide you through the process over the phone, or you can follow our step-by-step video guides. Accurate measurements ensure a perfect fit every time.`,
    category: 'Measurement',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-medium text-blue-600 tracking-wider uppercase">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about our custom printed blinds, 
            delivered Australia-wide.
          </p>
        </div>

        {/* FAQ List - Structured for SGE/AI optimization */}
        <div className="max-w-3xl mx-auto space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex-shrink-0 mt-0.5">
                    {faq.category}
                  </span>
                  <h3 
                    className="font-semibold text-slate-900 text-lg"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-6 pt-0"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="pl-16">
                    <p 
                      className="text-slate-600 leading-relaxed"
                      itemProp="text"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1800676583"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Call 1800 676 583
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Contact Us
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>

        {/* National SEO Content Block */}
        <div className="max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-200">
          <article className="prose prose-slate max-w-none">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Custom Printed Blinds Delivered Australia-Wide
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Blinds & Tales is your trusted provider of <strong>custom printed roller blinds across Australia</strong>. 
              Our family-owned business has been transforming homes from Sydney to Perth, Melbourne to Brisbane 
              since 2019 with unique, personalized window coverings that reflect your style and personality.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Based in regional NSW, we combine the personal service of a family business with the reach of 
              modern Australia-wide delivery. From nature-inspired designs perfect for coastal homes to playful 
              kids' room themes and sophisticated urban patterns, we offer unlimited customization options. 
              All our blinds are <strong>Australian made</strong> and backed by our industry-leading <strong>5-year warranty</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We pride ourselves on exceptional customer service, with over <strong>500 five-star reviews</strong> 
              from satisfied customers across Sydney, Melbourne, Brisbane, Perth, Adelaide, and beyond. 
              Our FREE measure and quote service is available in select metro areas, and we provide 
              comprehensive measurement guides for all other locations. Call{' '}
              <a href="tel:1800676583" className="text-blue-600 hover:underline">1800 676 583</a> today 
              to discover how custom printed blinds can transform your space.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

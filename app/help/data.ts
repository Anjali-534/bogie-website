export type FaqItem = { q: string; a: string };
export type FaqSection = { section: string; items: FaqItem[] };

export const FAQ_DATA: FaqSection[] = [
  {
    section: "Booking",
    items: [
      {
        q: "How do I book a ride?",
        a: "Open the Bogie app, tap Cab, Truck, or Ambulance on the home screen, enter your pickup and drop location, select your vehicle type, and confirm. You'll see the fare upfront before you book.",
      },
      {
        q: "Can I schedule a ride in advance?",
        a: "Right now Bogie supports instant bookings only. Scheduled rides are coming soon.",
      },
      {
        q: "Why can't I find a driver?",
        a: "No drivers may be available in your area right now. Try again in a few minutes or adjust your pickup location slightly.",
      },
    ],
  },
  {
    section: "Cancellations & refunds",
    items: [
      {
        q: "How do I cancel a booking?",
        a: "Open the active booking screen and tap Cancel. Cancelling within 2 minutes of booking is free; a small fee of ₹30–₹50 may apply after that.",
      },
      {
        q: "My driver cancelled. What happens?",
        a: "We automatically try to match you with another driver. If none are available, a full refund is processed immediately.",
      },
      {
        q: "How do I get a refund?",
        a: "Approved refunds are processed in 5–7 business days back to your original payment method.",
      },
    ],
  },
  {
    section: "Payments",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "Cash, UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and Bogie Wallet.",
      },
      {
        q: "I was charged incorrectly. What do I do?",
        a: "Raise a dispute within 24 hours from Help → Payment Issue → Wrong Charge. Our team reviews and responds within 2 business days.",
      },
    ],
  },
  {
    section: "Ambulance: free vs. paid",
    items: [
      {
        q: "Is the free ambulance option really free?",
        a: "Yes. Free ambulance rides are routed through our network of registered NGOs and sewa organisations, subject to availability — Bogie never charges a fee on top. Response time isn't guaranteed the way a paid ride is, so for life-threatening emergencies, always call 108 (India's national emergency number) first, then use Bogie for follow-up transport.",
      },
      {
        q: "What's the difference between the free and paid options?",
        a: "Free rides come from NGO and sewa organisation ambulances and depend on what's available nearby. Paid rides are dispatched directly by partner hospitals with BLS/ALS-equipped ambulances, billed by the hospital — Bogie takes zero commission on either option.",
      },
      {
        q: "What's included in a paid BLS ambulance?",
        a: "A trained paramedic, oxygen cylinder, first aid kit, stretcher, and basic patient monitoring equipment.",
      },
    ],
  },
  {
    section: "Driver verification",
    items: [
      {
        q: "How are Bogie drivers verified?",
        a: "Every driver submits their license, vehicle registration, and identity documents when they sign up. Our team reviews and verifies each document before a driver is allowed to go online and accept rides.",
      },
      {
        q: "What happens if a driver's documents expire or fail review?",
        a: "Drivers whose documents don't pass verification, or who let them lapse, are blocked from going online until they resubmit valid documents.",
      },
    ],
  },
  {
    section: "Safety features",
    items: [
      {
        q: "How do I know I'm getting into the right vehicle?",
        a: "Every ride requires your driver to enter a one-time OTP shown in your app before the trip starts — this confirms you're both matched to the same booking before you get in.",
      },
      {
        q: "Can I track my ride live?",
        a: "Yes. You can see your driver's live location and route on the map from the moment they're assigned until you're dropped off.",
      },
      {
        q: "What if something feels wrong during a ride?",
        a: "Use the in-app SOS button to instantly alert Bogie support with your live location. It works for both riders and drivers.",
      },
    ],
  },
];

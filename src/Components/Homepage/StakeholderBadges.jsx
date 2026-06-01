const badges = [
  "CDSCO",
  "State Drug Control",
  "Manufacturers",
  "Pharmacy / Distributor",
  "Citizens",
  "Ayushman Bharat",
];

export default function StakeholderBadges() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-950 shadow-sm"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
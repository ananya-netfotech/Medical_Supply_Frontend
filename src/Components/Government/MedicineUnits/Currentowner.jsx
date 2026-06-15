import OwnerBadge from "./OwnerBadge";

export default function CurrentOwner({ owner }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900">{owner.id}</p>
      <p className="mt-0.5 text-xs text-gray-500">{owner.name}</p>
      <div className="mt-1">
        <OwnerBadge ownerType={owner.type} />
      </div>
    </div>
  );
}
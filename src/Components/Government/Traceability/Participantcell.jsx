import { MapPin } from "lucide-react";
import OwnerBadge from "./OwnerBadge";

export default function ParticipantCell({ participant }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-900">
        {participant.name}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <OwnerBadge ownerType={participant.type} />

        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3" />
          {participant.location}
        </span>
      </div>
    </div>
  );
}
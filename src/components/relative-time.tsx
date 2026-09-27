import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

export function RelativeTime({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const parsed = new Date(date);
  const valid = !Number.isNaN(parsed.getTime());
  const iso = valid ? parsed.toISOString() : date;
  const [label, setLabel] = useState(() =>
    valid ? formatDistanceToNow(parsed, { addSuffix: true }) : date,
  );

  useEffect(() => {
    const next = new Date(date);
    if (Number.isNaN(next.getTime())) {
      setLabel(date);
      return;
    }
    setLabel(formatDistanceToNow(next, { addSuffix: true }));
  }, [date]);

  return (
    <time className={className} dateTime={iso}>
      {label}
    </time>
  );
}

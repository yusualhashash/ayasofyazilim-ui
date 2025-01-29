import { Label } from '@/components/ui/label';

export function FieldLabel({
  id,
  className,
  required,
  label,
}: {
  label: string | undefined;
  id: string | undefined;
  className?: string;
  required?: boolean;
}) {
  if (!label) return null;
  return (
    <Label htmlFor={id} className={className}>
      {label}
      {required ? <span className="text-destructive">*</span> : null}
    </Label>
  );
}

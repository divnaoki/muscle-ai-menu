"use client";

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export function SelectButton({ label, selected, onClick, disabled }: Props) {
  const base =
    "px-4 py-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const active = "border-indigo-400 bg-indigo-50 text-indigo-700";
  const inactive = "border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${selected ? active : inactive}`}
    >
      {label}
    </button>
  );
}

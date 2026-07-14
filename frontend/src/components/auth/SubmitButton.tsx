type Props = {
  label: string;
  loadingLabel: string;
  disabled: boolean;
};

export default function SubmitButton({ label, loadingLabel, disabled }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {disabled ? loadingLabel : label}
    </button>
  );
}

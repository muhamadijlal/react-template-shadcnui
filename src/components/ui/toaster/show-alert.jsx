import { isValidElement } from "react";
import { toast } from "sonner";
import { X, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";

const ALERT_STYLES = {
  success: {
    container: "border-green-300 bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    textPrimary: "text-green-900",
    textSecondary: "text-green-700",
    icon: CheckCircle,
    actionColor: "text-green-600",
  },
  info: {
    container: "border-blue-400 bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    textPrimary: "text-blue-900",
    textSecondary: "text-blue-700",
    icon: Info,
    actionColor: "text-blue-600",
  },
  warning: {
    container: "border-yellow-400 bg-yellow-50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    textPrimary: "text-yellow-900",
    textSecondary: "text-yellow-700",
    icon: AlertTriangle,
    actionColor: "text-yellow-600",
  },
  danger: {
    container: "border-red-300 bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    textPrimary: "text-red-900",
    textSecondary: "text-red-700",
    icon: XCircle,
    actionColor: "text-red-600",
  },
};

export function showAlert(type = "info", options = {}) {
  const style = ALERT_STYLES[type] ?? ALERT_STYLES.info;
  const DefaultIcon = style.icon;

  const iconElement = isValidElement(options.icon) ? (
    options.icon
  ) : options.icon ? (
    <options.icon className="h-5 w-5" />
  ) : (
    <DefaultIcon className="h-5 w-5" />
  );

  toast.custom(
    (t) => (
      <div
        className={`flex w-[calc(100vw-64px)] max-w-xl items-center gap-3 rounded-2xl border px-3 py-2 shadow-sm ${style.container}`}
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${style.iconBg} ${style.iconColor}`}
        >
          {iconElement}
        </div>

        <div className="min-w-0 flex-1">
          {options.title && (
            <p className={`text-sm font-semibold ${style.textSecondary}`}>
              {options.title}
            </p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-1">
            {options.description && (
              <span className={`text-base font-semibold ${style.textPrimary}`}>
                {options.description}
              </span>
            )}

            {options.subDescription && (
              <span className={`text-base ${style.textSecondary}`}>
                {options.subDescription}
              </span>
            )}

            {options.actionLabel && (
              <button
                type="button"
                onClick={options.onAction}
                className={`text-base font-semibold hover:underline ${style.actionColor}`}
              >
                {options.actionLabel}
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.dismiss(t)}
          className="shrink-0 cursor-pointer rounded-md p-1 text-black transition hover:bg-black/5"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    ),
    {
      duration: options.duration ?? 4000,
      position: options.position ?? "top-right",
    },
  );
}

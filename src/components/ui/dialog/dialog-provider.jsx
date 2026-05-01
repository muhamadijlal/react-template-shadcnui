import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogMedia,
} from "@src/components/ui/dialog/alert-dialog";
import { FiInfo, FiAlertTriangle, FiXCircle } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

const DialogContext = createContext(null);

const dialogVariantConfig = {
  info: {
    icon: FiInfo,
    iconColor: "var(--secondary)",
    iconBg: "rgba(5, 114, 219, 0.12)",
    primaryButtonBg: "var(--secondary)",
    primaryButtonColor: "#ffffff",
  },
  success: {
    icon: FaCheck,
    iconColor: "#22c55e",
    iconBg: "rgba(34, 197, 94, 0.14)",
    primaryButtonBg: "#22c55e",
    primaryButtonColor: "#ffffff",
  },
  warning: {
    icon: FiAlertTriangle,
    iconColor: "#f59e0b",
    iconBg: "rgba(245, 158, 11, 0.14)",
    primaryButtonBg: "#f59e0b",
    primaryButtonColor: "#ffffff",
  },
  error: {
    icon: FiXCircle,
    iconColor: "#ef4444",
    iconBg: "rgba(239, 68, 68, 0.14)",
    primaryButtonBg: "#ef4444",
    primaryButtonColor: "#ffffff",
  },
};

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    open: false,
    key: null,
    type: "status",
    variant: "info",
    title: "",
    description: "",
    confirmText: "OK",
    cancelText: "Batal",
    onConfirm: null,
    onCancel: null,
    loading: false,
  });

  const closeDialog = useCallback(() => {
    setDialog((prev) => ({
      ...prev,
      open: false,
      loading: false,
    }));
  }, []);

  const openStatus = useCallback((key, options = {}) => {
    setDialog({
      open: true,
      key,
      type: "status",
      variant: options.variant ?? "info",
      title: options.title ?? "",
      description: options.description ?? "",
      confirmText: options.confirmText ?? "Oke",
      cancelText: options.cancelText ?? "Batal",
      onConfirm: options.onConfirm ?? null,
      onCancel: options.onCancel ?? null,
      loading: false,
    });
  }, []);

  const openConfirm = useCallback((key, options = {}) => {
    setDialog({
      open: true,
      key,
      type: "confirm",
      variant: options.variant ?? "warning",
      title: options.title ?? "",
      description: options.description ?? "",
      confirmText: options.confirmText ?? "Ya",
      cancelText: options.cancelText ?? "Batal",
      onConfirm: options.onConfirm ?? null,
      onCancel: options.onCancel ?? null,
      loading: false,
    });
  }, []);

  const setDialogLoading = useCallback((loading) => {
    setDialog((prev) => ({
      ...prev,
      loading,
    }));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (dialog.loading) return;

    const currentKey = dialog.key;

    try {
      setDialog((prev) => ({
        ...prev,
        loading: true,
      }));

      if (dialog.onConfirm) {
        await dialog.onConfirm();
      }

      setDialog((prev) => {
        if (prev.key !== currentKey) {
          return prev;
        }

        return {
          ...prev,
          open: false,
          loading: false,
        };
      });
    } catch (error) {
      setDialog((prev) => {
        if (prev.key !== currentKey) {
          return prev;
        }

        return {
          ...prev,
          loading: false,
        };
      });
    }
  }, [dialog]);

  const handleCancel = useCallback(async () => {
    if (dialog.loading) return;

    try {
      if (dialog.onCancel) {
        await dialog.onCancel();
      }
    } finally {
      closeDialog();
    }
  }, [dialog, closeDialog]);

  const value = useMemo(
    () => ({
      dialog,
      openStatus,
      openConfirm,
      closeDialog,
      setDialogLoading,
    }),
    [dialog, openStatus, openConfirm, closeDialog, setDialogLoading],
  );

  const currentVariant =
    dialogVariantConfig[dialog.variant] ?? dialogVariantConfig.info;
  const Icon = currentVariant.icon;

  return (
    <DialogContext.Provider value={value}>
      {children}

      <AlertDialog
        open={dialog.open}
        onOpenChange={(open) => {
          if (!open && !dialog.loading) closeDialog();
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia
              style={{
                color: currentVariant.iconColor,
                backgroundColor: currentVariant.iconBg,
              }}
            >
              <Icon />
            </AlertDialogMedia>

            <AlertDialogTitle>{dialog.title}</AlertDialogTitle>

            <AlertDialogDescription>
              {dialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
            {dialog.type === "confirm" && (
              <AlertDialogCancel
                onClick={handleCancel}
                disabled={dialog.loading}
                className="w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {dialog.cancelText}
              </AlertDialogCancel>
            )}

            <AlertDialogAction
              onClick={handleConfirm}
              disabled={dialog.loading}
              className="w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                backgroundColor: currentVariant.primaryButtonBg,
                color: currentVariant.primaryButtonColor,
                border: "none",
                gridColumn: dialog.type === "status" ? "1 / -1" : undefined,
              }}
            >
              {dialog.loading ? "Memproses..." : dialog.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }

  return context;
}

import { useEffect, useState } from "react";
import { AlertTriangle, Ban, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeToUserWarnings, Warning } from "@/lib/warningService";

export function WarningNotificationModal() {
  const { user, userProfile } = useAuth();
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!user || !userProfile) return;

    // Subscribe to real-time warning updates
    const unsubscribe = subscribeToUserWarnings(user.uid, (newWarnings) => {
      setWarnings(newWarnings);

      // Show notification if there are new warnings and we haven't shown it yet
      if (newWarnings.length > 0 && !hasShown) {
        setHasShown(true);
      }
    });

    return unsubscribe;
  }, [user, userProfile, hasShown]);

  // Show notification only for the most recent warning
  const latestWarning = warnings[0];

  if (!latestWarning || !hasShown) return null;

  const isBan = latestWarning.type === "ban";
  const isSuspension = latestWarning.type === "suspension";

  const handleDismiss = () => {
    setHasShown(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
      <div className="w-full max-w-md border border-border/40 rounded-2xl p-6 space-y-5 bg-card shadow-2xl">
        {/* Header with Icon */}
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${
              isBan
                ? "bg-destructive/20"
                : isSuspension
                  ? "bg-yellow-500/20"
                  : "bg-blue-500/20"
            }`}
          >
            {isBan ? (
              <Ban
                size={24}
                className={isBan ? "text-destructive" : "text-yellow-500"}
              />
            ) : (
              <AlertTriangle
                size={24}
                className={isSuspension ? "text-yellow-500" : "text-blue-500"}
              />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold capitalize">
              {latestWarning.type === "ban" ? "Account Banned" : "Warning"}
            </h2>
            <p className="text-xs text-muted-foreground">
              Issued by {latestWarning.adminName}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 border-t border-border/20 pt-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Reason
            </p>
            <p className="text-sm text-foreground/90">{latestWarning.reason}</p>
          </div>

          {latestWarning.details && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Details
              </p>
              <p className="text-sm text-foreground/90">
                {latestWarning.details}
              </p>
            </div>
          )}

          {latestWarning.expiresAt && (
            <div className="flex items-center gap-2 text-sm p-3 bg-secondary/40 border border-border/30 rounded-lg">
              <Clock
                size={16}
                className="text-muted-foreground flex-shrink-0"
              />
              <span className="text-foreground/80">
                {latestWarning.type === "suspension"
                  ? "Expires "
                  : "Issued on "}
                {new Date(latestWarning.expiresAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}

          {isBan && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive/90">
                Your account has been permanently banned. You cannot access your
                account or create new accounts.
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button onClick={handleDismiss} className="w-full">
          I Understand
        </Button>

        {/* Close Icon */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1 hover:bg-secondary/50 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

import { db } from "./firebase";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

export interface MaintenanceStatus {
  enabled: boolean;
  message?: string;
  updatedAt: Date;
  updatedBy?: string;
}

const MAINTENANCE_DOC = "site_config/maintenance";

// Get current maintenance status
export async function getMaintenanceStatus(): Promise<MaintenanceStatus> {
  try {
    const docRef = doc(db, "site_config", "maintenance");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        enabled: data.enabled || false,
        message: data.message,
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        updatedBy: data.updatedBy,
      };
    }

    return {
      enabled: false,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Error fetching maintenance status:", error);
    return {
      enabled: false,
      updatedAt: new Date(),
    };
  }
}

// Set maintenance mode
export async function setMaintenanceMode(
  enabled: boolean,
  message?: string,
  updatedBy?: string,
): Promise<void> {
  try {
    const docRef = doc(db, "site_config", "maintenance");
    await setDoc(
      docRef,
      {
        enabled,
        message: message || "",
        updatedAt: Timestamp.now(),
        updatedBy: updatedBy || "Unknown",
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error setting maintenance mode:", error);
    throw error;
  }
}

// Subscribe to maintenance status changes in real-time
export function subscribeToMaintenanceStatus(
  callback: (status: MaintenanceStatus) => void,
): () => void {
  const docRef = doc(db, "site_config", "maintenance");

  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        enabled: data.enabled || false,
        message: data.message,
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
        updatedBy: data.updatedBy,
      });
    } else {
      callback({
        enabled: false,
        updatedAt: new Date(),
      });
    }
  });

  return unsubscribe;
}

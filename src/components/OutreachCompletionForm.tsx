import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Intervention, Lead, Company, Contact, User as UserType } from "@/lib/types";


// ✅ Step 1: Define prop types
interface OutreachCompletionFormProps {
  task: Intervention & {
    lead: Lead & {
      company: Company;
      contact?: Contact;
    };
    user: UserType;
  };
  onClose: () => void;
}


export default function OutreachCompletionForm({ task, onClose }: OutreachCompletionFormProps) {
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpTime, setFollowUpTime] = useState("");

  const handleSave = () => {
    // 🟢 later: call the same mutation as OutreachTracker to create outreach
    console.log("Saving outreach completion", {
      taskId: task.id,
      leadId: task.lead.id,
      activityType: task.type,
      notes,
      followUpDate,
      followUpTime,
    });

    // after saving
    onClose();
  };

  return (
    <div className="space-y-4">
      {/* Activity Type (frozen) */}
      <div>
        <label className="block text-sm font-medium mb-1">Activity Type</label>
        <Input value={task.type} disabled />
      </div>

      {/* Status (frozen) */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Input value="Completed" disabled />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea
          placeholder="Add notes about this outreach..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Follow-up Date and Time */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Follow-up Date</label>
          <Input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Follow-up Time</label>
          <Input
            type="time"
            value={followUpTime}
            onChange={(e) => setFollowUpTime(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Activity</Button>
      </div>
    </div>
  );
}

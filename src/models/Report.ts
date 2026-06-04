// Report Model
export interface Report {
  id: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedBy: string;
  reporterName: string;
  reportType: 'harassment' | 'spam' | 'inappropriate' | 'scam' | 'other';
  description: string;
  messageId?: string;
  evidence?: string[];
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  resolution?: string;
  createdAt: number;
  updatedAt: number;
  resolvedAt?: number;
  resolvedBy?: string;
}

export interface ReportStatus {
  id: string;
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  resolution?: string;
  updatedAt: number;
}

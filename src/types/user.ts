import { UserRole } from '@prisma/client';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithCounts extends UserProfile {
  _count: {
    applications: number;
    notifications: number;
  };
}

export interface UserSettings {
  id: string;
  userId: string;
  // Préférences d'affichage
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  // Préférences d'interface
  sidebarCollapsed: boolean;
  itemsPerPage: number;
  defaultApplicationView: string;
  // Préférences de dashboard
  showWelcomeMessage: boolean;
  defaultDashboardTab: string;
  // NOUVEAU : Sécurité 2FA
  enabled2FA: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string | null;
  // Ces champs ne peuvent être modifiés que par un admin
  role?: UserRole;
  isActive?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateUserSettingsRequest {
  theme?: string;
  language?: string;
  timezone?: string;
  dateFormat?: string;
  timeFormat?: string;
  sidebarCollapsed?: boolean;
  itemsPerPage?: number;
  defaultApplicationView?: string;
  showWelcomeMessage?: boolean;
  defaultDashboardTab?: string;
  // NOUVEAU : Paramètre 2FA
  enabled2FA?: boolean;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'name' | 'email' | 'lastLoginAt' | 'role';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedUsers {
  users: UserWithCounts[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
  newUsersThisWeek: number;
  lastLoginStats: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  usersByRole: Record<UserRole, number>;
}

export interface UserActivity {
  id: string;
  name: string;
  email: string;
  lastLoginAt?: Date | null;
  applicationsCount: number;
  notificationsCount: number;
  createdAt: Date;
}

// === NOUVEAUX TYPES POUR LA SÉCURITÉ 2FA ===

export interface UserSecuritySettings {
  enabled2FA: boolean;
  hasPassword: boolean;
  linkedAccounts: {
    google: boolean;
    linkedin: boolean;
  };
  lastLoginAt: Date | null;
  emailVerified: boolean;
}

export interface Toggle2FARequest {
  enabled: boolean;
}

export interface Toggle2FAResponse {
  enabled2FA: boolean;
}

// Types pour les réponses API
export interface UserResponse {
  message: string;
  data: {
    user: UserProfile;
  };
}

export interface UsersResponse {
  message: string;
  data: PaginatedUsers;
}

export interface UserSettingsResponse {
  message: string;
  data: {
    settings: UserSettings;
  };
}

export interface UserSecurityResponse {
  message: string;
  data: {
    security: UserSecuritySettings;
  };
}

export interface AdminStatsResponse {
  message: string;
  data: {
    stats: AdminStats;
  };
}

// Types pour l'upload d'avatar
export interface AvatarUploadResult {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Types pour les actions admin
export interface BulkUserAction {
  userIds: string[];
  action: 'activate' | 'deactivate' | 'delete';
}

export interface UserRoleChange {
  userId: string;
  newRole: UserRole;
  reason?: string;
}
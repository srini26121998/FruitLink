export interface UserProfile {
  id: string;
  name: string;
  email: string;

  /** ROLE id → admin | shop | delivery */
  role: string;

  /** LIST OF PERMISSIONS */
  permissions: string[];
  
  shopName?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface Permission {
  id: string;
  label: string;
  resource: string;
  action?: string;  // ✔ added
}


export type TUserType = 'COMPANY' | 'JOB_SEEKER' | null;
export enum EEmploymentType {
	FULLTIME = 'FULLTIME',
	PARTTIME = 'PARTTIME',
	CONTRACT = 'CONTRACT',
	INTERNSHIP = 'INTERNSHIP',
}

export enum EJobPostStatus {
	DRAFT = 'DRAFT',
	PUBLISHED = 'PUBLISHED',
	EXPIRED = 'EXPIRED',
}

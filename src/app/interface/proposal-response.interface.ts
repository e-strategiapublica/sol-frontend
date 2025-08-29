import { ProposalInterface } from './proposal.interface';
import { LicitationInterface } from './licitacao.interface';

export interface ProposalGetByBidResponse {
  proposals: ProposalInterface[];
  bid: LicitationInterface;
  file?: string; // Base64 string for Excel file
}

export interface ProposalAcceptReviewerDto {
  acceptedRevisorAt: string;
  reviewer_accept: boolean;
}

export interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

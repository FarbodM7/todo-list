import { gql } from '@apollo/client';

export interface ConnectionStatus {
    userId: string;
    status: string;
    lastUpdated: string;
}

export const CONNECTION_STATUS_SUBSCRIPTION = gql`
  subscription ConnectionStatus {
    connectionStatus {
      userId
      status
      lastUpdated
    }
  }
`;

export default CONNECTION_STATUS_SUBSCRIPTION;

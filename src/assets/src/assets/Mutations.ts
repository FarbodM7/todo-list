import { gql } from '@apollo/client';

export const UPDATE_CONNECTION_STATUS = gql`
  mutation UpdateConnectionStatus($rtt: Float!) {
    updateConnectionStatus(rtt: $rtt)
  }
`;

export default { UPDATE_CONNECTION_STATUS };

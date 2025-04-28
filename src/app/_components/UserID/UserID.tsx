'use server';

// Utils
import requestUtils from '../../_utils/request';

const UserID = async () => {
  type Response = {
    success: boolean,
    data?: {
      userID: number,
    },
  };

  const data = await requestUtils.serverSideRequest<Response>({
    url: '/api/account/get', 
  });

  return (
    <span>{data.data.data?.userID}</span>
  )
};

export default UserID;
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActionBoxSkeleton = () => {
  return (
    <div className="actionBoxSkeleton flex flex-row flex-wrap">
      <div className="skeleton-item">
        <Skeleton height={40} width={200} />
      </div>
      <div className="skeleton-item">
        <Skeleton height={40} width={200} />
      </div>
      <div className="skeleton-item">
        <Skeleton height={40} width={200} />
      </div>
      {/* Add more skeleton items as needed */}
    </div>
  );
};

export default ActionBoxSkeleton;

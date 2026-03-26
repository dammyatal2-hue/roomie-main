import { Plus } from "lucide-react";

interface MyListingProps {
  onCreateListing: () => void;
}

export function MyListing({ onCreateListing }: MyListingProps) {
  return (
    <div className="size-full flex flex-col bg-[#fcfcfd]">
      {/* Status Bar Spacer */}
      <div className="h-[44px]" />

      {/* Header */}
      <div className="px-[24px] py-[16px] border-b border-[#e5e7eb]">
        <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px] text-[#1f2a37] text-center">
          My Listing
        </h1>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center px-[24px] pb-[100px]">
        <div className="w-[120px] h-[120px] rounded-full bg-[#f3f4f6] flex items-center justify-center mb-[24px]">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.5 22.5L30 7.5L7.5 22.5V50C7.5 51.3261 8.02678 52.5979 8.96447 53.5355C9.90215 54.4732 11.1739 55 12.5 55H47.5C48.8261 55 50.0979 54.4732 51.0355 53.5355C51.9732 52.5979 52.5 51.3261 52.5 50V22.5Z"
              stroke="#9DA4AE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22.5 55V30H37.5V55"
              stroke="#9DA4AE"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] leading-[28px] text-[#1f2a37] mb-[8px]">
          No listings yet
        </h2>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[20px] text-[#6b7280] text-center max-w-[280px] mb-[32px]">
          Create your first listing to find your perfect roommate or tenant
        </p>

        <button
          onClick={onCreateListing}
          className="flex items-center gap-[8px] h-[52px] px-[24px] bg-[#fe456a] text-white rounded-[8px] shadow-[0px_8px_8px_-4px_rgba(254,69,106,0.1),0px_20px_24px_-4px_rgba(254,69,106,0.15)] hover:bg-[#e63d5f] transition-colors font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] leading-[24px]"
        >
          <Plus size={20} strokeWidth={2.5} />
          Create Listing
        </button>
      </div>
    </div>
  );
}

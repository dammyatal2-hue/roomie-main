import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import svgPaths from "../../imports/svg-j9pexgrbi8";

interface ForgotPasswordProps {
  onBack: () => void;
  onContinue: (method: "phone" | "email") => void;
}

export function ForgotPassword({ onBack, onContinue }: ForgotPasswordProps) {
  const [selectedMethod, setSelectedMethod] = useState<"phone" | "email">("email");

  return (
    <div className="bg-[#fcfcfd] relative size-full flex flex-col">
      {/* Status Bar */}
      <div className="h-[44px] bg-transparent" />

      {/* Back Button */}
      <div className="px-[24px] pt-[24px] pb-[24px]">
        <button 
          onClick={onBack}
          className="size-[24px] flex items-center justify-center"
        >
          <ArrowLeft className="w-[20px] h-[20px] text-[#1f2a37]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-[24px]">
        {/* Caption */}
        <div className="flex flex-col gap-[8px] mb-[32px]">
          <h1 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[20px] leading-[26px] text-[#1f2a37]">
            Forgot Password
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#9da4ae]">
            Select which contact details should we use to reset your password
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-[16px] mb-[32px]">
          {/* Phone Option */}
          <button
            onClick={() => setSelectedMethod("phone")}
            className={`bg-white flex gap-[8px] h-[76px] items-center px-[16px] py-[8px] rounded-[12px] border ${
              selectedMethod === "phone" ? "border-[#fe456a]" : "border-[#d2d6db]"
            } transition-colors`}
          >
            <div className="bg-[#f4ebff] size-[44px] rounded-full flex items-center justify-center">
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                <path
                  d={svgPaths.p90a5500}
                  stroke="#FE456A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[18px] text-[#d2d6db]">
                Via phone
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1f2a37]">
                +250 791 5** 488
              </p>
            </div>
          </button>

          {/* Email Option */}
          <button
            onClick={() => setSelectedMethod("email")}
            className={`bg-white flex gap-[8px] h-[76px] items-center px-[16px] py-[8px] rounded-[12px] border ${
              selectedMethod === "email" ? "border-[#fe456a]" : "border-[#d2d6db]"
            } transition-colors`}
          >
            <div className="bg-[#f4ebff] size-[44px] rounded-full flex items-center justify-center">
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                <g>
                  <path
                    d={svgPaths.p201f2b00}
                    stroke="#FE456A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={svgPaths.p240ea620}
                    stroke="#FE456A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </g>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] leading-[18px] text-[#9da4ae]">
                Via email
              </p>
              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1f2a37]">
                da***@gmail.com
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-[24px] pb-[40px]">
        <button
          onClick={() => onContinue(selectedMethod)}
          className="bg-[#fe456a] w-full h-[52px] rounded-[8px] shadow-[0px_8px_8px_0px_rgba(127,86,217,0.03),0px_20px_24px_0px_rgba(127,86,217,0.08)] font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[27px] text-white hover:bg-[#e63d5f] transition-colors"
        >
          Continue
        </button>
      </div>

      {/* Home Indicator */}
      <div className="h-[34px] flex items-center justify-center">
        <div className="w-[134px] h-[5px] bg-black/10 rounded-full" />
      </div>
    </div>
  );
}

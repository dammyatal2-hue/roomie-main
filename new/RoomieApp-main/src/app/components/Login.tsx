import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import svgPaths from "../../imports/svg-aqhopws0b9";

interface LoginProps {
  onBack?: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onForgotPassword?: () => void;
}

export function Login({ onBack, onSignIn, onSignUp, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState("dammy@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSignIn = () => {
    // In a real app, you would validate credentials here
    onSignIn();
  };

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
            Welcome Back !
          </h1>
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#9da4ae]">
            Sign in with your email and password or social media to continue
          </p>
        </div>

        {/* Form Input */}
        <div className="flex flex-col gap-[16px] mb-[32px]">
          {/* Email Input */}
          <div className="flex flex-col gap-[4px]">
            <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1f2a37]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white h-[52px] px-[16px] py-[8px] rounded-[12px] border border-[#6941c6] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#1f2a37] focus:outline-none focus:border-[#6941c6]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-[4px]">
            <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] leading-[18px] text-[#1f2a37]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white w-full h-[52px] px-[16px] py-[8px] pr-[48px] rounded-[12px] border border-[#d2d6db] font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#1f2a37] focus:outline-none focus:border-[#6941c6]"
                placeholder="Enter your password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[16px] top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <Eye className="w-[24px] h-[24px] text-[#9da4ae]" />
                ) : (
                  <EyeOff className="w-[24px] h-[24px] text-[#9da4ae]" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-[8px]"
            >
              <div className={`size-[16px] rounded-[3px] flex items-center justify-center ${rememberMe ? 'bg-[#6941c6]' : 'border border-[#d2d6db] bg-white'}`}>
                {rememberMe && (
                  <svg className="w-[10px] h-[10px]" fill="none" viewBox="0 0 13.3333 13.3333">
                    <path 
                      clipRule="evenodd" 
                      d={svgPaths.p2a48e080} 
                      fill="white" 
                      fillRule="evenodd" 
                    />
                  </svg>
                )}
              </div>
              <span className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#1f2a37]">
                Remember me
              </span>
            </button>
            <button 
              onClick={onForgotPassword}
              className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#fe456a] hover:opacity-70 transition-opacity"
            >
              Forgot password ?
            </button>
          </div>
        </div>

        {/* Sign In Button */}
        <div className="flex flex-col gap-[24px] items-center mb-[32px]">
          <button
            onClick={handleSignIn}
            className="bg-[#fe456a] w-full h-[52px] rounded-[8px] shadow-[0px_8px_8px_0px_rgba(127,86,217,0.03),0px_20px_24px_0px_rgba(127,86,217,0.08)] font-['Inter:Regular',sans-serif] font-normal text-[18px] leading-[27px] text-white hover:bg-[#e63d5f] transition-colors"
          >
            Sign in
          </button>

          <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#1f2a37]">
            Or
          </p>

          {/* Social Media Buttons */}
          <div className="flex gap-[16px]">
            {/* Facebook */}
            <button className="size-[46px] rounded-full bg-[#e5e7eb] flex items-center justify-center hover:bg-[#d2d6db] transition-colors">
              <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 46 46">
                <path 
                  clipRule="evenodd" 
                  d={svgPaths.p3f1d6180} 
                  fill="#1976D2" 
                  fillRule="evenodd" 
                />
              </svg>
            </button>

            {/* Google */}
            <button className="size-[46px] rounded-full bg-[#e5e7eb] flex items-center justify-center hover:bg-[#d2d6db] transition-colors">
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                <g clipPath="url(#clip0_google)">
                  <path d={svgPaths.p1db44100} fill="#FBBB00" />
                  <path d={svgPaths.p34479700} fill="#518EF8" />
                  <path d={svgPaths.p19764b00} fill="#28B446" />
                  <path d={svgPaths.p23bd0880} fill="#F14336" />
                </g>
                <defs>
                  <clipPath id="clip0_google">
                    <rect fill="white" height="24" width="24" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center pb-[40px]">
          <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] leading-[18px] text-[#1f2a37]">
            Don't have account ?{" "}
            <button 
              onClick={onSignUp}
              className="font-['Inter:Medium',sans-serif] font-medium text-[#fe456a] hover:opacity-70 transition-opacity"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="h-[34px] flex items-center justify-center">
        <div className="w-[134px] h-[5px] bg-black/10 rounded-full" />
      </div>
    </div>
  );
}

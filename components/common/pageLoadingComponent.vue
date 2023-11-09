<template>
  <div
    class="bg-[#2C3735] fixed top-0 left-0 h-screen w-screen flex justify-center flex-col items-center z-50"
  >
    <div class="text-3xl text-white pb-7 tracking-widest">
      <div class="loader"></div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="168.723"
      height="143.633"
      viewBox="0 0 168.723 143.633"
    >
      <defs>
        <clipPath>
          <rect width="168.723" height="143.634" fill="#fff" />
        </clipPath>
      </defs>
      <g transform="translate(4651.361 -16555.529)">
        <g transform="translate(-4651.361 16555.529)" clip-path="url(#clip-path)">
          <rect
            width="54"
            height="20"
            rx="0.5"
            transform="translate(59.361 45.471)"
            fill="#e57199"
            opacity="1"
            class="animated-rect"
          />
          <g>
            <path
              d="M171.223,198.228l-15.972-39.872a4.6,4.6,0,0,0-4.274-2.893H123.53v18.209h12.551a1.263,1.263,0,0,1,1.226.965l1.887,7.784a1.261,1.261,0,0,1-1.226,1.559H40.828a1.261,1.261,0,0,1-1.225-1.561l1.905-7.785a1.262,1.262,0,0,1,1.226-.961H55.287V155.463H27.817a4.6,4.6,0,0,0-4.274,2.893L7.57,198.228a4.6,4.6,0,0,0,4.274,6.317h155.1a4.6,4.6,0,0,0,4.275-6.317"
              transform="translate(-2.835 -60.91)"
              fill="#fff"
            />
            <path
              d="M22.024,55.491,76.247,78.676a9.331,9.331,0,1,0,7.332-17.162L65.37,53.706A11.241,11.241,0,0,1,58.561,44.5a5.106,5.106,0,0,1,4.881-5.719h45.129a67.441,67.441,0,0,0-6.617-9.045A110.219,110.219,0,0,0,84.007,13.1C74.938,6.482,38.115,6.816,38.115,6.816L29.427.912a5.257,5.257,0,0,0-6.355.333L1.507,22.288a4.975,4.975,0,0,0-.4,6.687C4.148,32.76,8.885,39.091,11.693,45.3c2.143,4.761,8.712,9.5,10.331,10.187"
              transform="translate(0)"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.animated-rect {
  animation: rectAnimation 1.25s linear infinite alternate;
}
@keyframes rectAnimation {
  0% {
    height: 20px;
  }
  100% {
    height: 85px;
  }
}

.loader {
  width: fit-content;
  clip-path: inset(0 2ch 0 0);
  animation: l4 1.25s steps(5) infinite;
}
.loader:before {
  content: '數據載入中...';
}
@keyframes l4 {
  to {
    clip-path: inset(0 -1ch 0 0);
  }
}
</style>

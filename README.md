<div style="text-align:center">
<img src="https://res.cloudinary.com/nara9709/image/upload/v1691329744/staffonly_logo_readme_c39gcq.png" width="200px" height="200px" style="" title="Github_Logo"/>
</div>

# STAFF ONLY

<p>알바생들을 위한 커뮤니티 & 달력 서비스</p>

> 개발기간
> 2023.07.09 ~ 개발중

## 배포주소

<a href="https://staff-only-rose.vercel.app/" > https://staff-only-rose.vercel.app/ </a>

## 프로젝트 소개

<strong>⛔️사장님은 출입금지⛔️</strong> 알바생들끼리 통하는 무언가가 있다구요, 알바생들을 위한 우리들의 작은 휴게실 같은 커뮤니티 사이트 <strong>STAFF ONLY</strong> <br>
<strong>최고의 복지는 월급💵 </strong> 근무시간을 적으면 이번달 월급까지 쉽게 확인할수있어요🤗

## 사용 기술

<h3>Development</h3>
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white">
<img src="https://img.shields.io/badge/swr-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/taillwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">

<br>

<h3>Config</h3>
<img src="https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<br>
<h3>Deploy</h3>
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<br>

## 페이지 구성

<div style="display:flex flex-direction:column ">
<div style="display:flex ">
<div><img src="https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.17.39_AM_ee3lhe.png" / >
<p style="text-align:center">기본 포스트 홈페이지</p></div>
<div><img src="https://res.cloudinary.com/nara9709/image/upload/v1691331908/Screenshot_2023-08-06_at_8.25.02_AM_g1fwtb.png" / >
<p style="text-align:center">포스트 디테일 페이지</p></div>
</div>
<div  style="display:flex"> 
<div>
<img src="https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.18.02_AM_i4mlnj.png" / >
<p style="text-align:center">새로운 포스트 작성 페이지</p>
</div>
<div>
<img src="https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.17.54_AM_avtryt.png" / >
<p style="text-align:center">알바달력 페이지</p>
</div>
</div>
<div  style="display:flex">
<div> 
<img src="https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.18.22_AM_keu1xe.png" / >
<p style="text-align:center">북마크 리스트 페이지</p>
</div>
<div> 
<img src="https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.18.28_AM_moo8dm.png" / >
<p style="text-align:center">유저정보 페이지 </p>
</div>
</div>
<br/>

## 주요기능

<strong>(모든 참고 코드는 src 하위 폴더 안에 있음)</strong>

<h4>⭐️카테고리별 포스트 작성</h4>

페이지 코드: component -> NewPostForm.tsx <br>
서비스 코드: service -> post.ts / createPost

<h4>⭐️댓글 및 대댓글 작성</h4>

페이지 코드: component -> Comment.tsx & CommentForm.tsx <br>
서비스 코드: service -> post.ts / addNewComment & addSubComment <br>

<h4>⭐️해당월 근무시간에 따른 월급 계산</h4>

페이지 코드: component -> Calendars.tsx & CalendarModal.tsx <br>
서비스 코드: service -> calendar.ts / addWorkingDay <br>

<h4>⭐️북마크 된 포스트 확인 가능</h4>

페이지 코드: component -> BookmarkList.tsx <br>
서비스 코드: service -> post.ts / getBookmarkedPosts <br>

<h4>⭐️유저 프로필 정보 변경</h4>

페이지 코드: component -> ProfileDetail.tsx <br>
서비스 코드: service -> user.ts / updateProfile <br>

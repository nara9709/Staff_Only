![](https://res.cloudinary.com/nara9709/image/upload/v1691329744/staffonly_logo_readme_c39gcq.png 'Github_Logo')

# STAFF ONLY

알바생들을 위한 커뮤니티 & 달력 서비스

> 개발기간 > 2023.07.09 ~ 개발중

## 배포주소

[https://staff-only-rose.vercel.app/](https://staff-only-rose.vercel.app/)

## 프로젝트 소개

**⛔️사장님은 출입금지⛔️** 알바생들끼리 통하는 무언가가 있다구요, 알바생들을 위한 우리들의 작은 휴게실 같은 커뮤니티 사이트 **STAFF ONLY**  
**최고의 복지는 월급💵** 근무시간을 적으면 이번달 월급까지 쉽게 확인할수있어요🤗

## 사용 기술

### Development

![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![](https://img.shields.io/badge/sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white) ![](https://img.shields.io/badge/swr-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/taillwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

### Config

![](https://img.shields.io/badge/Npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

### Deploy

![](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 페이지 구성

![](https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.17.39_AM_ee3lhe.png)

기본 포스트 홈페이지

![](https://res.cloudinary.com/nara9709/image/upload/v1691331908/Screenshot_2023-08-06_at_8.25.02_AM_g1fwtb.png)

포스트 디테일 페이지

![](https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.18.02_AM_i4mlnj.png)

새로운 포스트 작성 페이지

![](https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.17.54_AM_avtryt.png)

알바달력 페이지

![](https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.18.22_AM_keu1xe.png)

북마크 리스트 페이지

![](https://res.cloudinary.com/nara9709/image/upload/v1691331589/Screenshot_2023-08-06_at_8.18.28_AM_moo8dm.png)

유저정보 페이지

## 주요기능 **(모든 참고 코드는 src 하위 폴더 안에 있음)**

#### ⭐️카테고리별 포스트 작성

페이지 코드: component -> NewPostForm.tsx  
서비스 코드: service -> post.ts / createPost

#### ⭐️댓글 및 대댓글 작성

페이지 코드: component -> Comment.tsx & CommentForm.tsx  
서비스 코드: service -> post.ts / addNewComment & addSubComment

#### ⭐️해당월 근무시간에 따른 월급 계산

페이지 코드: component -> Calendars.tsx & CalendarModal.tsx  
서비스 코드: service -> calendar.ts / addWorkingDay

#### ⭐️북마크 된 포스트 확인 가능

페이지 코드: component -> BookmarkList.tsx  
서비스 코드: service -> post.ts / getBookmarkedPosts

#### ⭐️유저 프로필 정보 변경

페이지 코드: component -> ProfileDetail.tsx  
서비스 코드: service -> user.ts / updateProfile

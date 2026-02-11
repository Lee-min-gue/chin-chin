import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "개인정보 처리방침 | 친친",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 flex items-center gap-3 bg-white/80 px-4 py-3 backdrop-blur-sm border-b">
        <Link href="/" className="p-1">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-medium">개인정보 처리방침</h1>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="prose prose-sm max-w-none text-foreground">
          <p className="text-muted-foreground">시행일: 2026년 2월 1일</p>

          <p>
            친친(이하 &quot;서비스&quot;)은 이용자의 개인정보를 중요하게 여기며, 「개인정보
            보호법」 등 관련 법령을 준수합니다. 본 개인정보 처리방침은 서비스가 수집하는
            개인정보의 항목, 이용 목적, 보유 기간 등을 안내합니다.
          </p>

          <h2>1. 수집하는 개인정보 항목</h2>
          <h3>필수 수집 항목</h3>
          <ul>
            <li><strong>카카오 계정 정보:</strong> 카카오 고유 ID, 닉네임, 프로필 사진 URL</li>
            <li><strong>프로필 정보:</strong> 나이, 성별, 직업군, 한 줄 소개, 취향 키워드</li>
            <li><strong>프로필 사진:</strong> 이용자가 업로드한 사진 (원본 및 블러 처리본)</li>
          </ul>
          <h3>선택 수집 항목</h3>
          <ul>
            <li>MBTI, 음악 장르, 인스타그램 아이디</li>
          </ul>
          <h3>자동 수집 항목</h3>
          <ul>
            <li>서비스 이용 기록 (접속 일시, 프로필 조회수, 채팅 신청 기록)</li>
          </ul>

          <h2>2. 개인정보의 수집 및 이용 목적</h2>
          <ul>
            <li><strong>회원 관리:</strong> 카카오 OAuth 기반 회원 식별 및 인증</li>
            <li><strong>서비스 제공:</strong> 프로필 작성·공유, 블라인드 소개, 채팅 중개</li>
            <li><strong>서비스 개선:</strong> 통계 분석 및 서비스 품질 향상</li>
            <li><strong>안전한 환경:</strong> 부정 이용 방지, 신고·차단 처리</li>
          </ul>

          <h2>3. 개인정보의 보유 및 파기</h2>
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>카카오 계정 정보</td>
                <td>회원 탈퇴 시 즉시 파기</td>
              </tr>
              <tr>
                <td>프로필 정보 및 사진</td>
                <td>프로필 만료 후 30일 이내 파기</td>
              </tr>
              <tr>
                <td>채팅 메시지</td>
                <td>채팅방 종료 후 30일 이내 파기</td>
              </tr>
              <tr>
                <td>신고 기록</td>
                <td>처리 완료 후 1년간 보관 후 파기</td>
              </tr>
            </tbody>
          </table>

          <h2>4. 개인정보의 제3자 제공</h2>
          <p>
            서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는
            예외로 합니다:
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 따라 요청이 있는 경우</li>
          </ul>

          <h2>5. 개인정보 처리 위탁</h2>
          <table>
            <thead>
              <tr>
                <th>수탁업체</th>
                <th>위탁 업무</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Supabase Inc.</td>
                <td>데이터베이스 호스팅 및 파일 저장</td>
              </tr>
              <tr>
                <td>Vercel Inc.</td>
                <td>웹 애플리케이션 호스팅</td>
              </tr>
              <tr>
                <td>카카오</td>
                <td>소셜 로그인 인증</td>
              </tr>
            </tbody>
          </table>

          <h2>6. 이용자의 권리</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다:</p>
          <ul>
            <li>개인정보 열람 요구</li>
            <li>개인정보 정정·삭제 요구</li>
            <li>개인정보 처리 정지 요구</li>
            <li>회원 탈퇴 (대시보드에서 로그아웃 후 카카오 계정 연결 해제)</li>
          </ul>

          <h2>7. 개인정보의 안전성 확보 조치</h2>
          <ul>
            <li>데이터 전송 시 TLS(HTTPS) 암호화 적용</li>
            <li>데이터베이스 행 수준 보안(RLS) 정책 적용</li>
            <li>카카오 액세스 토큰 서버 측 안전 저장</li>
            <li>프로필 사진 블라인드(블러) 처리를 통한 프라이버시 보호</li>
          </ul>

          <h2>8. 쿠키 사용</h2>
          <p>
            서비스는 로그인 세션 유지를 위해 쿠키를 사용합니다.
            이용자는 브라우저 설정에서 쿠키를 관리할 수 있으나, 쿠키를 차단할 경우
            서비스 이용에 제한이 있을 수 있습니다.
          </p>

          <h2>9. 개인정보 보호책임자</h2>
          <p>
            개인정보 처리에 관한 문의, 불만, 피해구제 등은 아래로 연락해 주세요.
          </p>
          <ul>
            <li>서비스명: 친친</li>
            <li>이메일: support@chinchin.app</li>
          </ul>

          <h2>10. 개인정보 처리방침 변경</h2>
          <p>
            본 방침은 시행일로부터 적용되며, 변경 시 서비스 내 공지 또는 개별 안내를
            통해 알려드립니다.
          </p>

          <p className="mt-8 text-muted-foreground">
            본 개인정보 처리방침은 2026년 2월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}

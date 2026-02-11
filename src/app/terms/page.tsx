import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "서비스 이용약관 | 친친",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 flex items-center gap-3 bg-white/80 px-4 py-3 backdrop-blur-sm border-b">
        <Link href="/" className="p-1">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-medium">서비스 이용약관</h1>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="prose prose-sm max-w-none text-foreground">
          <p className="text-muted-foreground">시행일: 2026년 2월 1일</p>

          <h2>제1조 (목적)</h2>
          <p>
            이 약관은 친친(이하 &quot;서비스&quot;)이 제공하는 소개팅 중개 서비스의
            이용 조건 및 절차, 이용자와 서비스 간의 권리·의무 및 책임사항을 규정함을
            목적으로 합니다.
          </p>

          <h2>제2조 (정의)</h2>
          <ol>
            <li>&quot;서비스&quot;란 친친이 제공하는 프로필 기반 소개 및 채팅 서비스를 말합니다.</li>
            <li>&quot;이용자&quot;란 이 약관에 동의하고 서비스를 이용하는 자를 말합니다.</li>
            <li>&quot;프로필&quot;이란 이용자 또는 주선자가 작성한 소개 정보를 말합니다.</li>
            <li>&quot;주선자&quot;란 친구를 소개하기 위해 초대 링크를 생성한 이용자를 말합니다.</li>
          </ol>

          <h2>제3조 (약관의 효력 및 변경)</h2>
          <ol>
            <li>이 약관은 서비스 내에 게시하거나 기타 적절한 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
            <li>서비스는 관련 법령에 위배되지 않는 범위 내에서 약관을 개정할 수 있으며, 개정 시 최소 7일 전 공지합니다.</li>
          </ol>

          <h2>제4조 (이용 계약의 성립)</h2>
          <ol>
            <li>이용 계약은 카카오 계정으로 로그인을 완료하고 이 약관에 동의한 시점에 성립됩니다.</li>
            <li>이용자는 만 18세 이상이어야 합니다.</li>
          </ol>

          <h2>제5조 (서비스의 내용)</h2>
          <p>서비스는 다음의 기능을 제공합니다:</p>
          <ol>
            <li>프로필 작성 및 공유</li>
            <li>블라인드 프로필 조회</li>
            <li>채팅 신청 및 익명 대화</li>
            <li>상호 동의 기반 프로필 공개</li>
            <li>친구 초대를 통한 소개</li>
          </ol>

          <h2>제6조 (이용자의 의무)</h2>
          <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
          <ol>
            <li>허위 정보로 프로필을 작성하는 행위</li>
            <li>타인의 개인정보를 무단으로 수집·이용하는 행위</li>
            <li>서비스를 이용하여 다른 이용자에게 불쾌감을 주거나 괴롭히는 행위</li>
            <li>음란물, 폭력적 콘텐츠 등 부적절한 자료를 게시하는 행위</li>
            <li>서비스의 정상적인 운영을 방해하는 행위</li>
            <li>영리 목적의 광고·홍보를 하는 행위</li>
          </ol>

          <h2>제7조 (서비스의 제한 및 중지)</h2>
          <ol>
            <li>서비스는 이용자가 제6조를 위반한 경우 사전 통보 없이 이용을 제한하거나 계정을 정지할 수 있습니다.</li>
            <li>기술적 사유, 점검 등으로 서비스 제공이 일시적으로 중단될 수 있습니다.</li>
          </ol>

          <h2>제8조 (프로필 및 콘텐츠)</h2>
          <ol>
            <li>프로필에 등록된 사진 및 정보의 정확성에 대한 책임은 이용자에게 있습니다.</li>
            <li>프로필은 설정된 유효기간이 지나면 자동으로 만료됩니다.</li>
            <li>블라인드 처리된 사진은 상호 동의(프로필 공개) 전까지 원본이 공개되지 않습니다. 단, 이용자가 블러 해제를 선택한 사진은 즉시 원본이 공개됩니다.</li>
          </ol>

          <h2>제9조 (개인정보 보호)</h2>
          <p>
            서비스의 개인정보 처리에 관한 사항은{" "}
            <Link href="/privacy" className="text-primary underline">
              개인정보 처리방침
            </Link>
            에서 확인할 수 있습니다.
          </p>

          <h2>제10조 (면책)</h2>
          <ol>
            <li>서비스는 이용자 간의 만남·교제·결과에 대해 어떠한 책임도 지지 않습니다.</li>
            <li>서비스는 이용자가 제공한 정보의 정확성·진실성을 보증하지 않습니다.</li>
            <li>천재지변 또는 이에 준하는 불가항력으로 서비스를 제공할 수 없는 경우 면책됩니다.</li>
          </ol>

          <h2>제11조 (분쟁 해결)</h2>
          <p>
            서비스 이용과 관련하여 분쟁이 발생한 경우, 양 당사자는 원만한 해결을 위해
            성실히 협의합니다. 협의가 이루어지지 않는 경우 대한민국 법률에 따릅니다.
          </p>

          <p className="mt-8 text-muted-foreground">
            본 약관은 2026년 2월 1일부터 시행됩니다.
          </p>
        </div>
      </div>
    </main>
  );
}

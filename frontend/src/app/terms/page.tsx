export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <article className="rounded-2xl border border-orange-100 bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          利用規約
        </h1>

        <div className="mt-6 space-y-8 text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
          <div className="space-y-3">
            <p>
              この利用規約（以下「本規約」といいます。）は、Animal
              Album（以下「本サービス」といいます。）の利用条件を定めるものです。
            </p>
            <p>
              利用者は、本規約に同意したうえで本サービスを利用するものとします。
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              1. 本サービスについて
            </h2>
            <p>
              本サービスは、動物の画像や動画を投稿、閲覧および管理するための、個人開発によるポートフォリオ・試験運用サービスです。
            </p>
            <p className="mt-3">
              本サービスは、予告なく内容を変更、停止または終了する場合があります。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              2. ユーザー登録
            </h2>
            <p>
              利用者は、正確な情報を使用してユーザー登録を行うものとします。
            </p>
            <p className="mt-3">
              登録したアカウントおよびパスワードは、利用者自身の責任で管理してください。
            </p>
            <p className="mt-3">
              アカウントを第三者へ譲渡、貸与または共有することはできません。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              3. 投稿できる内容
            </h2>
            <p>
              利用者は、自身が投稿する権利を持つ画像、動画および文章のみを投稿してください。
            </p>
            <p className="mt-3">
              他人が撮影した画像や動画、他人の著作物、人物の顔などが含まれる場合は、必要な許可を得たうえで投稿してください。
            </p>
            <p className="mt-3">
              投稿内容に関する責任は、投稿した利用者が負うものとします。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              4. 禁止事項
            </h2>
            <p>利用者は、以下の行為をしてはいけません。</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>法令または公序良俗に違反する行為</li>
              <li>
                他者の著作権、肖像権、プライバシーその他の権利を侵害する行為
              </li>
              <li>他者になりすます行為</li>
              <li>虚偽の情報を登録する行為</li>
              <li>不正アクセスや、本サービスへ過度な負荷をかける行為</li>
              <li>ウイルスその他の有害なプログラムを送信する行為</li>
              <li>動物と関係のない不適切な画像や動画を投稿する行為</li>
              <li>
                暴力的、差別的、わいせつまたは第三者へ不快感を与える内容を投稿する行為
              </li>
              <li>本サービスの運営を妨害する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              5. 投稿内容の削除
            </h2>
            <p>
              運営者は、投稿内容が本規約に違反している場合、または本サービスの運営上必要と判断した場合、利用者への事前通知なく投稿内容を非公開または削除できるものとします。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              6. アカウントの停止および削除
            </h2>
            <p>
              運営者は、利用者が本規約に違反した場合、不正利用が確認された場合、または運営上必要と判断した場合、アカウントを停止または削除できるものとします。
            </p>
            <p className="mt-3">
              利用者がアカウントの削除を希望する場合は、運営者へお問い合わせください。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              7. データの保存
            </h2>
            <p>
              運営者は、投稿されたデータを適切に管理するよう努めますが、データの永続的な保存を保証するものではありません。
            </p>
            <p className="mt-3">
              障害、誤操作、サービス停止その他の理由によりデータが消失する可能性があります。
            </p>
            <p className="mt-3">
              重要な画像や動画は、利用者自身でもバックアップを保存してください。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              8. 本サービスの変更、停止および終了
            </h2>
            <p>
              運営者は、以下の場合に、本サービスの全部または一部を変更、停止または終了できるものとします。
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>システムの保守や更新を行う場合</li>
              <li>サーバーや通信サービスに障害が発生した場合</li>
              <li>災害その他の不可抗力が発生した場合</li>
              <li>その他、運営者が必要と判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              9. 免責事項
            </h2>
            <p>
              運営者は、本サービスに不具合がないこと、常に利用できること、投稿データが失われないことを保証しません。
            </p>
            <p className="mt-3">
              本サービスの利用によって利用者に生じた損害について、運営者の故意または重大な過失がある場合を除き、運営者は責任を負わないものとします。
            </p>
            <p className="mt-3">
              本サービスを通じて利用者同士または第三者との間に生じた問題については、当事者間で解決するものとします。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              10. 知的財産権
            </h2>
            <p>
              本サービスのプログラム、デザイン、文章、ロゴその他のコンテンツに関する権利は、運営者または正当な権利者に帰属します。
            </p>
            <p className="mt-3">
              利用者が投稿した画像、動画および文章の権利は、原則として投稿した利用者または元の権利者に帰属します。
            </p>
            <p className="mt-3">
              利用者は、本サービスの提供および表示に必要な範囲で、運営者が投稿内容を保存、複製、変換および表示することを許可するものとします。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              11. 本規約の変更
            </h2>
            <p>運営者は、必要に応じて本規約を変更する場合があります。</p>
            <p className="mt-3">
              重要な変更がある場合は、本サービス上で分かりやすい方法によりお知らせします。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              12. 準拠法および管轄
            </h2>
            <p>本規約は、日本法に準拠します。</p>
            <p className="mt-3">
              本サービスに関して紛争が生じた場合は、運営者の住所地を管轄する日本の裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              13. お問い合わせ
            </h2>
            <p>本規約に関するお問い合わせは、以下の連絡先までお願いします。</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>運営者名：nasubi（Animal Album 運営）</li>
              <li>連絡先： nasumasa.contact@gmail.com</li>
            </ul>
          </section>

          <p>制定日：2026年7月17日</p>
        </div>
      </article>
    </main>
  );
}

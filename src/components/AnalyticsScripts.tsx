import Script from 'next/script'

const gaId = 'G-KX712S1X44'
const clarityId = 'ylee9lzj5e'

export default function AnalyticsScripts() {
  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];

              window.gtag = function() {
                window.dataLayer.push(arguments);
              };

              window.gtag('js', new Date());

              window.gtag('config', '${gaId}', {
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };

              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;

              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);

            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  )
}
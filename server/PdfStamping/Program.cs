using iTextSharp.text.pdf;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.X509;
using iTextSharp.text.pdf.security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfStamping
{
    class Program
    {
        static void Main(string[] args)
        {
            Pkcs12Store pkcs12 = new Pkcs12Store(new FileStream(@"c:\Users\beeven\Desktop\ca.pfx", FileMode.Open, FileAccess.Read), "123456".ToArray());
            String keyAlias = null;
            
            foreach(string name in pkcs12.Aliases)
            {
                if (pkcs12.IsKeyEntry(name))
                {
                    keyAlias = name;
                    break;
                }
            }

            AsymmetricKeyParameter key = pkcs12.GetKey(keyAlias).Key;
            X509CertificateEntry[] ce = pkcs12.GetCertificateChain(keyAlias);
            List<X509Certificate> chain = new List<X509Certificate>(ce.Length);
            foreach(var c in ce)
            {
                chain.Add(c.Certificate);
            }

            PdfReader reader = new PdfReader(@"c:\Users\beeven\Desktop\test.pdf");
            PdfStamper st = PdfStamper.CreateSignature(reader, new FileStream(@"c:\Users\beeven\Desktop\signed.pdf", FileMode.Create, FileAccess.Write), '\0', null, true);

            PdfSignatureAppearance sap = st.SignatureAppearance;
            sap.Reason = "Test signing";
            sap.Location = "Guangzhou";
            sap.Image = iTextSharp.text.Image.GetInstance(@"c:\Users\beeven\Desktop\stamp.png");
            sap.SetVisibleSignature(new iTextSharp.text.Rectangle(36, 748,114, 780), 1, "sig");

            IExternalSignature signature = new PrivateKeySignature(key, "SHA-256");
            MakeSignature.SignDetached(sap, signature, chain, null, null, null, 0, CryptoStandard.CMS);
            
            
        }
    }
}

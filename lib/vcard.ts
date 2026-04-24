/**
 * Tujuan      : Menghasilkan dan mendownload file contact vCard (.vcf)
 * Caller      : components/ui/VCardButton.tsx
 */

export const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Bagus Priambudi
ORG:Vibe Studio
TITLE:IT Data Analyst | Web3 Programmer | Vibe AI | Trader
EMAIL:bagusnetagain@gmail.com
TEL:+6282282535841
URL:https://vibe-studio.com
ADR:;;Indonesia;;;;
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Bagus_Priambudi_Contact.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

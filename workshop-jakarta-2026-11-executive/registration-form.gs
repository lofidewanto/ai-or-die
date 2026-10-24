/**
 * Creates the registration Google Form for the AI or DIE Workshop Executive Jakarta
 * (19, 20 or 21 November 2026), links it to a response spreadsheet, and closes the
 * form automatically once 30 registrations have arrived.
 *
 * How to use:
 *   1. Open https://script.google.com and create a new project
 *      (a separate project from the other workshop forms).
 *   2. Replace the editor content with this file and click "Run" on createRegistrationForm.
 *   3. Allow the requested permissions (Forms, Sheets, triggers).
 *   4. Copy the "Form link" from the execution log into the workshop page.
 */

const MAX_PARTICIPANTS = 30;
const FORM_TITLE = 'Pendaftaran Workshop AI or DIE Executive — Jakarta, November 2026';
const DATE_LINE = 'Tanggal: 19, 20 atau 21 November 2026 (menyusul) · 09:30 – 14:30 WIB · Jakarta (lokasi menyusul)\n';
const WHATSAPP_MOVA = 'https://wa.me/6285121336927';
const CLOSED_MESSAGE =
  'Maaf, semua 30 kursi Workshop AI or DIE Executive Jakarta sudah terisi. ' +
  'Untuk daftar tunggu atau pertanyaan, hubungi WhatsApp Mova: ' + WHATSAPP_MOVA;

function createRegistrationForm() {
  const form = FormApp.create(FORM_TITLE);
  form
    .setDescription(
      'Workshop eksekutif 5 jam untuk pemimpin dan manajer: agen AI tanpa jargon, praktik untuk ' +
      'pekerjaan manajerial, tata kelola dan risiko, serta roadmap AI untuk organisasi Anda.\n\n' +
      DATE_LINE +
      'Biaya: IDR 1.500.000 (termasuk makan siang, rehat kopi, materi, AI roadmap canvas, sertifikat) · ' +
      'Kuota: 30 peserta · Bahasa: Indonesia\n\n' +
      'Prasyarat: laptop sendiri dengan OpenCode (model gratis OpenCode atau NVIDIA) ' +
      'atau Claude Code (model Claude seperti Opus) terinstal.\n\n' +
      'Setelah mendaftar, Anda akan menerima instruksi pembayaran (QRIS / transfer bank) ' +
      'dan, bila diperlukan, invoice atas nama perusahaan. ' +
      'Kursi Anda terkonfirmasi setelah pembayaran diterima.\n\n' +
      'Ada pertanyaan? Chat WhatsApp Mova: ' + WHATSAPP_MOVA)
    .setConfirmationMessage(
      'Terima kasih! Pendaftaran Anda sudah kami terima. Instruksi pembayaran akan dikirim ' +
      'melalui WhatsApp atau email. Kursi Anda terkonfirmasi setelah pembayaran diterima.\n\n' +
      'Pertanyaan: WhatsApp Mova ' + WHATSAPP_MOVA)
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(false)
    .setProgressBar(false)
    .setCustomClosedFormMessage(CLOSED_MESSAGE);

  // ── Data diri ──
  form.addSectionHeaderItem().setTitle('Data diri');

  form.addTextItem().setTitle('Nama lengkap').setRequired(true);

  form.addTextItem()
    .setTitle('Email')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .setHelpText('Mohon isi alamat email yang valid.')
      .build());

  form.addTextItem()
    .setTitle('Nomor WhatsApp')
    .setHelpText('Contoh: 0812 3456 7890 — untuk instruksi pembayaran dan info workshop.')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^[+0-9 ()-]{9,20}$')
      .setHelpText('Mohon isi nomor WhatsApp yang valid.')
      .build());

  form.addTextItem().setTitle('Jabatan').setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Peran Anda')
    .setChoiceValues([
      'CEO / direktur / direksi',
      'Kepala divisi (IT, digital, operasional, HR, keuangan, …)',
      'Manajer / team lead',
      'Pemilik UMKM / founder',
    ])
    .showOtherOption(true)
    .setRequired(true);

  // ── Organisasi ──
  form.addSectionHeaderItem().setTitle('Organisasi');

  form.addTextItem().setTitle('Perusahaan / organisasi').setRequired(true);

  form.addTextItem()
    .setTitle('Industri')
    .setHelpText('Contoh: ritel, kesehatan, keuangan, manufaktur, travel.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Jumlah karyawan')
    .setChoiceValues(['1–10', '11–50', '51–250', '251–1.000', 'Lebih dari 1.000'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Penggunaan AI di organisasi Anda saat ini')
    .setChoiceValues([
      'Belum ada',
      'Sebagian karyawan memakai ChatGPT / Copilot / Claude secara mandiri',
      'Ada beberapa proyek atau pilot AI',
      'AI sudah menjadi bagian dari strategi',
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Perlu invoice atas nama perusahaan?')
    .setChoiceValues(['Tidak', 'Ya'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Data invoice')
    .setHelpText('Hanya jika perlu invoice: nama perusahaan, alamat, NPWP dan kontak bagian keuangan.');

  // ── Laptop & prasyarat ──
  form.addSectionHeaderItem()
    .setTitle('Laptop & prasyarat')
    .setHelpText('Panduan instalasi langkah demi langkah akan dikirim setelah pendaftaran.');

  form.addMultipleChoiceItem()
    .setTitle('Agen AI di laptop Anda')
    .setChoiceValues([
      'OpenCode (model gratis OpenCode atau NVIDIA)',
      'Claude Code (model Claude, mis. Opus)',
      'Keduanya',
      'Belum — akan saya instal sebelum workshop',
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Sistem operasi laptop')
    .setChoiceValues(['Windows', 'macOS', 'Linux'])
    .setRequired(true);

  // ── Workshop ──
  form.addSectionHeaderItem().setTitle('Workshop');

  form.addCheckboxItem()
    .setTitle('Tantangan yang ingin Anda coba di Sesi 3')
    .setChoiceValues([
      'Presentasi direksi',
      'Analisis pasar & kompetitor',
      'Riset saham (hanya untuk pembelajaran)',
      'Laporan manajemen dari spreadsheet',
      'Memo keputusan',
    ])
    .showOtherOption(true);

  form.addParagraphTextItem()
    .setTitle('Proses atau tantangan di organisasi Anda yang ingin didukung AI')
    .setHelpText('Kami memakainya untuk menyiapkan sesi roadmap (Sesi 5).');

  form.addMultipleChoiceItem()
    .setTitle('Preferensi makanan')
    .setHelpText('Semua makanan halal.')
    .setChoiceValues(['Tidak ada', 'Vegetarian'])
    .showOtherOption(true)
    .setRequired(true);

  form.addParagraphTextItem().setTitle('Pertanyaan atau harapan untuk workshop');

  form.addCheckboxItem()
    .setTitle('Persetujuan data pribadi')
    .setHelpText('Data Anda hanya digunakan untuk keperluan workshop ini sesuai UU PDP dan tidak dibagikan kepada pihak lain.')
    .setChoiceValues(['Saya setuju data saya digunakan untuk keperluan Workshop AI or DIE Executive Jakarta.'])
    .setRequired(true);

  // ── Responses spreadsheet ──
  const sheet = SpreadsheetApp.create('Pendaftaran Workshop AI or DIE Executive Jakarta — Respons');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // ── Close automatically at MAX_PARTICIPANTS ──
  ScriptApp.newTrigger('closeWhenFull').forForm(form).onFormSubmit().create();

  Logger.log('Form link (share this): ' + form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('Form editor: ' + form.getEditUrl());
  Logger.log('Responses sheet: ' + sheet.getUrl());
}

function closeWhenFull(e) {
  const form = e.source;
  if (form.getResponses().length >= MAX_PARTICIPANTS) {
    form.setAcceptingResponses(false).setCustomClosedFormMessage(CLOSED_MESSAGE);
  }
}

/**
 * Updates the date in the already published form (title and description)
 * without changing its link or responses. The form is found through the
 * auto-close trigger created by createRegistrationForm.
 */
function updateFormDate() {
  const trigger = ScriptApp.getProjectTriggers()
    .find((t) => t.getHandlerFunction() === 'closeWhenFull');
  const form = FormApp.openById(trigger.getTriggerSourceId());
  const description = form.getDescription()
    .replace(/^.*– 14:30 WIB.*$/m, DATE_LINE.trim());
  form.setTitle(FORM_TITLE).setDescription(description);
  Logger.log('Updated: ' + form.getTitle());
  Logger.log(description);
}

/**
 * Creates the registration Google Form for the AI or DIE Workshop Academia Jakarta
 * (19, 20 or 21 November 2026), links it to a response spreadsheet, and closes the
 * form automatically once 100 registrations have arrived.
 *
 * How to use:
 *   1. Open https://script.google.com and create a new project
 *      (a separate project from the other workshop forms).
 *   2. Replace the editor content with this file and click "Run" on createRegistrationForm.
 *   3. Allow the requested permissions (Forms, Sheets, triggers).
 *   4. Copy the "Form link" from the execution log into the workshop page.
 */

const MAX_PARTICIPANTS = 100;
const FORM_TITLE = 'Pendaftaran Workshop AI or DIE Akademia — Jakarta, November 2026';
const DATE_LINE = 'Tanggal: 19, 20 atau 21 November 2026 (menyusul) · 09:30 – 12:30 WIB · Jakarta (lokasi menyusul)\n';
const WHATSAPP_MOVA = 'https://wa.me/6285121336927';
const CLOSED_MESSAGE =
  'Maaf, semua 100 kursi Workshop AI or DIE Akademia Jakarta sudah terisi. ' +
  'Untuk daftar tunggu atau pertanyaan, hubungi WhatsApp Mova: ' + WHATSAPP_MOVA;
const FORM_DESCRIPTION =
  'Workshop akademik 3 jam: teori LLM dan agen AI, contoh praktik dengan OpenCode / Claude Code ' +
  'dan Spring AI, keamanan, etika dan integritas akademik.\n\n' +
  DATE_LINE +
  'Biaya: IDR 100.000 (termasuk rehat kopi & snack, materi, sertifikat) · ' +
  'Kuota: 100 peserta · Bahasa: Indonesia\n\n' +
  'Prasyarat: laptop sendiri dengan OpenCode (model gratis OpenCode atau NVIDIA) ' +
  'atau Claude Code (model Claude seperti Opus) terinstal.\n\n' +
  'Setelah mendaftar, Anda akan menerima instruksi pembayaran (QRIS / transfer bank). ' +
  'Kursi Anda terkonfirmasi setelah pembayaran diterima.\n\n' +
  'Ada pertanyaan? Chat WhatsApp Mova: ' + WHATSAPP_MOVA;

function createRegistrationForm() {
  const form = FormApp.create(FORM_TITLE);
  form
    .setDescription(FORM_DESCRIPTION)
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

  form.addMultipleChoiceItem()
    .setTitle('Peran Anda')
    .setChoiceValues([
      'Mahasiswa',
      'Mahasiswa tingkat akhir',
      'Dosen / peneliti',
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addTextItem().setTitle('Kampus / institusi').setRequired(true);

  form.addTextItem()
    .setTitle('Program studi')
    .setHelpText('Contoh: Informatika, Sistem Informasi.');

  form.addMultipleChoiceItem()
    .setTitle('Pengalaman pemrograman')
    .setHelpText('Workshop ini berfokus pada teori; pemrograman tidak wajib.')
    .setChoiceValues(['Belum pernah', 'Dasar', 'Menengah', 'Mahir'])
    .setRequired(true);

  // ── Laptop & prasyarat ──
  form.addSectionHeaderItem()
    .setTitle('Laptop & prasyarat')
    .setHelpText('Panduan instalasi akan dikirim setelah pendaftaran.');

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

  form.addTextItem()
    .setTitle('Username GitHub')
    .setHelpText('Untuk contoh spec-driven development dan repository workshop. Belum punya? Boleh dikosongkan dan dibuat nanti.');

  // ── Workshop ──
  form.addSectionHeaderItem().setTitle('Workshop');

  form.addCheckboxItem()
    .setTitle('Topik yang paling menarik bagi Anda')
    .setChoiceValues([
      'Cara kerja LLM',
      'Anatomi agen AI (memori, RAG, tools, MCP)',
      'Spec-driven development dengan agen',
      'Keamanan, etika & integritas akademik',
      'Agen Java dengan Spring AI',
    ])
    .showOtherOption(true);

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
    .setChoiceValues(['Saya setuju data saya digunakan untuk keperluan Workshop AI or DIE Akademia Jakarta.'])
    .setRequired(true);

  // ── Responses spreadsheet ──
  const sheet = SpreadsheetApp.create('Pendaftaran Workshop AI or DIE Akademia Jakarta — Respons');
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
 * Applies FORM_TITLE and FORM_DESCRIPTION (date, price, …) to the already
 * published form without changing its link or responses. The form is found
 * through the auto-close trigger created by createRegistrationForm.
 */
function updateFormText() {
  const trigger = ScriptApp.getProjectTriggers()
    .find((t) => t.getHandlerFunction() === 'closeWhenFull');
  const form = FormApp.openById(trigger.getTriggerSourceId());
  form.setTitle(FORM_TITLE).setDescription(FORM_DESCRIPTION);
  Logger.log('Updated: ' + form.getTitle());
  Logger.log(FORM_DESCRIPTION);
}

module.exports = grammar({
  name: 'poweron',

  externals: $ => [
    $.comment,
    $.string_literal,
    $.col,
    $.datasize,
  ],

  extras: $ => [
    $.comment,
    /[\s\p{Zs}\ufeff\u2060\u200b]/,
  ],

  supertypes: $ => [
    $.expression,
    $.primary_expression,
    $.statement,
    $.define_statement,
  ],

  conflicts: $ => [
    [$.define_statement, $.expression],
  ],

  precedences: $ => [
    [
      'unary_void',
      'special',
      'member',
      'keyword',
      'binary_times',
      'binary_plus',
      'binary_relation',
      'binary_equality',
      'logical_and',
      'logical_or',
    ],
    ['define', $.define_statement],
    ['assign', $.primary_expression],
  ],


  rules: {
    source_file: $ =>
      choice(
        repeat($.define_statement),
        seq(
          repeat($.special_keywords),
          optional($.target_division),
          optional(
            repeat($._optional_divisions)
          ),
          optional(choice(
            $.print_division,
            $.letter_division,
          )),
          optional(
            $.total_division,
          ),
          repeat($.statement,),
        )),

    word: $ => choice(
      $.keyword,
      $._print_keywords,
      $.end_block,
      $.start_block,
    ),

    at_keywords: $ => seq(
      '@',
      $._identifier
    ),

    tran_code: $ => choice(
      'A',
      'C',
      'D',
      'N',
      'P',
      'W',
      'GL',
      'KS',
      'XF',
    ),

    source_code: $ => choice(
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'K',
      'N',
      'O',
      'P',
      'R',
      'S',
      'V',
      'X',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ),

    _print_keywords: $ => choice(
      caseInsensitive('reportcategory'),
      caseInsensitive('datafile'),
      caseInsensitive('recordsize'),
      caseInsensitive('blocksize'),
      caseInsensitive('labels'),
      caseInsensitive('width'),
      caseInsensitive('formlength'),
    ),

    keyword: $ => prec(-1, choice(
      $.at_keywords,
      $.tran_code,
      caseInsensitive('abs'),
      caseInsensitive('accountchange'),
      caseInsensitive('acs'),
      caseInsensitive('afterlast'),
      caseInsensitive('all'),
      caseInsensitive('and'),
      caseInsensitive('any'),
      caseInsensitive('anyservice'),
      caseInsensitive('anywarning'),
      caseInsensitive('application'),
      caseInsensitive('ascii'),
      caseInsensitive('beforefirst'),
      caseInsensitive('by'),
      caseInsensitive('call'),
      caseInsensitive('capitalize'),
      caseInsensitive('character'),
      caseInsensitive('characterread'),
      caseInsensitive('charactersearch'),
      caseInsensitive('chrvalue'),
      caseInsensitive('clearwarning'),
      caseInsensitive('coderead'),
      caseInsensitive('col'),
      caseInsensitive('copyapp'),
      caseInsensitive('create'),
      caseInsensitive('createfinancefromcredrep'),
      caseInsensitive('ctrlchr'),
      caseInsensitive('customforms'),
      caseInsensitive('customformswindows'),
      caseInsensitive('datasize'),
      caseInsensitive('date'),
      caseInsensitive('dateoffset'),
      caseInsensitive('dateread'),
      caseInsensitive('datevalue'),
      caseInsensitive('day'),
      caseInsensitive('dayofweek'),
      caseInsensitive('delete'),
      caseInsensitive('demand'),
      caseInsensitive('dialogclose'),
      caseInsensitive('dialogdisplay'),
      caseInsensitive('dialogpromptchar'),
      caseInsensitive('dialogpromptcode'),
      caseInsensitive('dialogpromptcomboend'),
      caseInsensitive('dialogpromptcombooption'),
      caseInsensitive('dialogpromptcombostart'),
      caseInsensitive('dialogpromptdate'),
      caseInsensitive('dialogpromptlistoption'),
      caseInsensitive('dialogpromptliststart'),
      caseInsensitive('dialogpromptmoney'),
      caseInsensitive('dialogpromptnumber'),
      caseInsensitive('dialogpromptpassowrd'),
      caseInsensitive('dialogpromptrate'),
      caseInsensitive('dialogpromptyesno'),
      caseInsensitive('dialogstart'),
      caseInsensitive('dialogstartgroupbox'),
      caseInsensitive('dialogtextlistoption'),
      caseInsensitive('dialogtextliststart'),
      caseInsensitive('dim'),
      caseInsensitive('divprojectinit'),
      caseInsensitive('do'),
      caseInsensitive('each'),
      caseInsensitive('else'),
      caseInsensitive('emailline'),
      caseInsensitive('emailsend'),
      caseInsensitive('emailstart'),
      caseInsensitive('end'),
      caseInsensitive('entercharacter'),
      caseInsensitive('entercode'),
      caseInsensitive('enterdate'),
      caseInsensitive('entermoney'),
      caseInsensitive('enternumber'),
      caseInsensitive('enterrate'),
      caseInsensitive('enteryesno'),
      caseInsensitive('excpitem'),
      caseInsensitive('execute'),
      caseInsensitive('exp'),
      caseInsensitive('filearchiveadd'),
      caseInsensitive('filearchiveextract'),
      caseInsensitive('fileclose'),
      caseInsensitive('filecreate'),
      caseInsensitive('filedecrypt'),
      caseInsensitive('filedelete'),
      caseInsensitive('fileencrypt'),
      caseInsensitive('filegetpos'),
      caseInsensitive('filelistclose'),
      caseInsensitive('filelistopen'),
      caseInsensitive('filelistread'),
      caseInsensitive('fileopen'),
      caseInsensitive('fileread'),
      caseInsensitive('filereadline'),
      caseInsensitive('filesetpos'),
      caseInsensitive('filewrite'),
      caseInsensitive('filewriteline'),
      caseInsensitive('float'),
      caseInsensitive('floatvalue'),
      caseInsensitive('floor'),
      caseInsensitive('fmperform'),
      caseInsensitive('for'),
      caseInsensitive('format'),
      caseInsensitive('from'),
      caseInsensitive('ftpclose'),
      caseInsensitive('ftpcmd'),
      caseInsensitive('ftpget'),
      caseInsensitive('ftplogin'),
      caseInsensitive('ftpopen'),
      caseInsensitive('ftpput'),
      caseInsensitive('fullyear'),
      caseInsensitive('getdatachar'),
      caseInsensitive('getdatadate'),
      caseInsensitive('getdatamoney'),
      caseInsensitive('getdatanumber'),
      caseInsensitive('getdatarate'),
      caseInsensitive('getfielddatamax'),
      caseInsensitive('getfielddatatype'),
      caseInsensitive('getfieldhelpfile'),
      caseInsensitive('getfieldmnemonic'),
      caseInsensitive('getfieldname'),
      caseInsensitive('getfieldnumber'),
      caseInsensitive('header'),
      caseInsensitive('headers'),
      caseInsensitive('homebanking'),
      caseInsensitive('hour'),
      caseInsensitive('hpboxdraw'),
      caseInsensitive('hpesc'),
      caseInsensitive('hpfont'),
      caseInsensitive('hplinedraw'),
      caseInsensitive('hplinesperinch'),
      caseInsensitive('hpreset'),
      caseInsensitive('hpsetup'),
      caseInsensitive('hpunderline'),
      caseInsensitive('hpxpos'),
      caseInsensitive('hpypos'),
      caseInsensitive('htmlviewdisplay'),
      caseInsensitive('htmlviewline'),
      caseInsensitive('htmlviewopen'),
      caseInsensitive('if'),
      caseInsensitive('initcreditreport'),
      caseInsensitive('initsubroutine'),
      caseInsensitive('insert'),
      caseInsensitive('int'),
      caseInsensitive('into'),
      caseInsensitive('length'),
      caseInsensitive('loanprojectinit'),
      caseInsensitive('loc'),
      caseInsensitive('log'),
      caseInsensitive('lowercase'),
      caseInsensitive('mcw'),
      caseInsensitive('mcwinteractive'),
      caseInsensitive('md5hash'),
      caseInsensitive('minute'),
      caseInsensitive('mod'),
      caseInsensitive('money'),
      caseInsensitive('moneyread'),
      caseInsensitive('month'),
      caseInsensitive('newline'),
      caseInsensitive('not'),
      caseInsensitive('not'),
      caseInsensitive('number'),
      caseInsensitive('numberread'),
      caseInsensitive('or'),
      caseInsensitive('outputclose'),
      caseInsensitive('outputopen'),
      caseInsensitive('outputswitch'),
      caseInsensitive('passwordhash'),
      caseInsensitive('popupmessage'),
      caseInsensitive('print title'),
      caseInsensitive('print'),
      caseInsensitive('priority'),
      caseInsensitive('pullcreditreport'),
      caseInsensitive('pwr'),
      caseInsensitive('queue'),
      caseInsensitive('queuecreditreport'),
      caseInsensitive('rate'),
      caseInsensitive('rateread'),
      caseInsensitive('remove'),
      caseInsensitive('repeatchr'),
      caseInsensitive('revise'),
      caseInsensitive('screenxypos'),
      caseInsensitive('segment'),
      caseInsensitive('select'),
      caseInsensitive('set'),
      caseInsensitive('setwarning'),
      caseInsensitive('sort'),
      caseInsensitive('stateless'),
      caseInsensitive('stopblink'),
      caseInsensitive('subroutine'),
      caseInsensitive('suppressnewline'),
      caseInsensitive('symconnect'),
      caseInsensitive('systemdate'),
      caseInsensitive('sysactualdate'),
      caseInsensitive('sysusername'),
      caseInsensitive('sysusernumber'),
      caseInsensitive('terminate'),
      caseInsensitive('then'),
      caseInsensitive('title'),
      caseInsensitive('to'),
      caseInsensitive('total'),
      caseInsensitive('trailers'),
      caseInsensitive('tranperform'),
      caseInsensitive('until'),
      caseInsensitive('uppercase'),
      caseInsensitive('validatefieldset'),
      caseInsensitive('validation'),
      caseInsensitive('value'),
      caseInsensitive('while'),
      caseInsensitive('whilelimit'),
      caseInsensitive('width'),
      caseInsensitive('winddeconnect'),
      caseInsensitive('winddeexecute'),
      caseInsensitive('winddepokedata'),
      caseInsensitive('windows'),
      caseInsensitive('windows'),
      caseInsensitive('windowsprint'),
      caseInsensitive('windowssend'),
      caseInsensitive('winmessagefield'),
      caseInsensitive('winmessagestart'),
      caseInsensitive('with'),
      caseInsensitive('year'),
      caseInsensitive('yesnoprompt'),
      caseInsensitive('yesnoread'),
    )),


    _optional_divisions: $ => choice(
      $.define_division,
      $.setup_division,
      $.select_division,
      $.sort_division,
    ),

    target_division: $ => prec.left(seq(
      caseInsensitive('target'),
      "=",
      $.record_type,
      optional($.record_type),
      optional($.record_type),
    )),

    define_division: $ => seq(
      caseInsensitive('define'),
      repeat($.define_statement),
      $.end_block
    ),

    start_block: $ => caseInsensitive('do'),
    end_block: $ => caseInsensitive('end'),

    define_statement: $ => prec.left('define', choice(
      $.include_statement,
      $.variable_declaration,
    )),

    setup_division: $ => seq(
      caseInsensitive('setup'),
      repeat($.statement),
      $.end_block,
    ),

    select_division: $ => seq(
      caseInsensitive('select'),
      repeat($.statement),
      $.end_block,
    ),

    sort_division: $ => seq(
      caseInsensitive('sort'),
      repeat($.statement),
      $.end_block,
    ),

    letter_division: $ => seq(
      caseInsensitive('letter title'),
      '=',
      $.expression,
      /\n/,
      repeat1($.expression),
      $.end_block,
    ),

    print_division: $ => prec.right(seq(
      caseInsensitive('print title'),
      '=',
      $.expression,
      repeat($.printkeywords),
      /\n/,
      repeat($.statement),
      $.end_block,
    )),

    total_division: $ => seq(
      caseInsensitive('total'),
      repeat($.statement),
      $.end_block,
    ),

    printkeywords: $ => (choice
      (
        $.reportcategory,
        $.datafile,
        $.recordsize,
        $.blocksize,
        $.labels,
        $.width,
        $.formlength,
        $.ascii,
      )
    ),

    ascii: $ => caseInsensitive('ascii'),

    reportcategory: $ => seq(
      caseInsensitive('reportcategory'),
      /[=]/,
      $.expression
    ),

    datafile: $ => seq(
      caseInsensitive('datafile'),
      optional(seq(
        /[=]/,
        $.expression
      ))
    ),

    recordsize: $ => seq(
      caseInsensitive('recordsize'),
      optional(seq(
        /[=]/,
        $.expression
      ))
    ),

    blocksize: $ => seq(
      caseInsensitive('blocksize'),
      optional(seq(
        /[=]/,
        $.expression
      ))
    ),

    labels: $ => seq(
      caseInsensitive('labels'),
      optional(seq(
        /[=]/,
        $.expression
      ))
    ),

    width: $ => seq(
      caseInsensitive('width'),
      optional(seq(
        /[=]/,
        $.expression
      ))
    ),

    formlength: $ => seq(
      caseInsensitive('formlength'),
      optional(seq(
        /[=]/,
        $.expression
      ))
    ),

    record_type: $ => token(choice(
      caseInsensitive('access'),
      caseInsensitive('account'),
      caseInsensitive('achaddenda'),
      caseInsensitive('achaddinfo'),
      caseInsensitive('achedit'),
      caseInsensitive('achitem'),
      caseInsensitive('activity'),
      caseInsensitive('agreement transaction'),
      caseInsensitive('agreement'),
      caseInsensitive('atmdialog'),
      caseInsensitive('audio'),
      caseInsensitive('cardcreationwizard'),
      caseInsensitive('certificate'),
      caseInsensitive('checkdisbursedwizard'),
      caseInsensitive('collection'),
      caseInsensitive('batchachorig'),
      caseInsensitive('bill'),
      caseInsensitive('card access'),
      caseInsensitive('card name'),
      caseInsensitive('card note'),
      caseInsensitive('card'),
      caseInsensitive('cashlettor'),
      caseInsensitive('cashorder'),
      caseInsensitive('cdmdialog'),
      caseInsensitive('check'),
      caseInsensitive('checkorder'),
      caseInsensitive('collateral collhold'),
      caseInsensitive('collateral document'),
      caseInsensitive('collateral'),
      caseInsensitive('comment'),
      caseInsensitive('corptransfer'),
      caseInsensitive('cpworkcard note'),
      caseInsensitive('cpworkcard tracking'),
      caseInsensitive('cpworkcard'),
      caseInsensitive('credrep item'),
      caseInsensitive('credrep'),
      caseInsensitive('ctr'),
      caseInsensitive('ctraccount'),
      caseInsensitive('ctrbranch'),
      caseInsensitive('ctrforeign'),
      caseInsensitive('ctrperson ctrtraninfo'),
      caseInsensitive('ctrperson'),
      caseInsensitive('dealer'),
      caseInsensitive('eft addendainfo'),
      caseInsensitive('eft name'),
      caseInsensitive('eft transfer'),
      caseInsensitive('eft'),
      caseInsensitive('escrow'),
      caseInsensitive('escrowanalysis'),
      caseInsensitive('excpaddenda'),
      caseInsensitive('excpaddinfo'),
      caseInsensitive('excpitem'),
      caseInsensitive('externalaccount'),
      caseInsensitive('externalloan name'),
      caseInsensitive('externalloan note'),
      caseInsensitive('externalloan tracking'),
      caseInsensitive('externalloan transfer'),
      caseInsensitive('externalloan'),
      caseInsensitive('finance'),
      caseInsensitive('fmhistory'),
      caseInsensitive('glaccount'),
      caseInsensitive('glsubaccount'),
      caseInsensitive('gltran'),
      caseInsensitive('hold'),
      caseInsensitive('household'),
      caseInsensitive('inventory'),
      caseInsensitive('invoice'),
      caseInsensitive('ira'),
      caseInsensitive('irs distribution'),
      caseInsensitive('irs name'),
      caseInsensitive('irs'),
      caseInsensitive('loan bankruptcy prepetitionbal'),
      caseInsensitive('loan bankruptcy'),
      caseInsensitive('loan checkorder'),
      caseInsensitive('loan escrow'),
      caseInsensitive('loan escrowanalysis'),
      caseInsensitive('loan hold'),
      caseInsensitive('loan lnsegment'),
      caseInsensitive('loan name'),
      caseInsensitive('loan note'),
      caseInsensitive('loan pledge name'),
      caseInsensitive('loan pledge'),
      caseInsensitive('loan ratechange'),
      caseInsensitive('loan schedule'),
      caseInsensitive('loan tracking'),
      caseInsensitive('loan transaction'),
      caseInsensitive('loan transfer'),
      caseInsensitive('loan'),
      caseInsensitive('loanapp escrow'),
      caseInsensitive('loanapp escrowanalysis'),
      caseInsensitive('loanapp finance'),
      caseInsensitive('loanapp lnsegment'),
      caseInsensitive('loanapp note'),
      caseInsensitive('loanapp person'),
      caseInsensitive('loanapp pledge'),
      caseInsensitive('loanapp schedule'),
      caseInsensitive('loanapp tracking'),
      caseInsensitive('loanapp'),
      caseInsensitive('lookup'),
      caseInsensitive('mbraddress'),
      caseInsensitive('memberrec'),
      caseInsensitive('name'),
      caseInsensitive('nonacctname'),
      caseInsensitive('note'),
      caseInsensitive('ofacdetails'),
      caseInsensitive('participant transaction'),
      caseInsensitive('participant'),
      caseInsensitive('participation'),
      caseInsensitive('participationloan'),
      caseInsensitive('payee'),
      caseInsensitive('payroll'),
      caseInsensitive('person'),
      caseInsensitive('pledge'),
      caseInsensitive('pool'),
      caseInsensitive('poolloan'),
      caseInsensitive('portfolio hold'),
      caseInsensitive('portfolio note'),
      caseInsensitive('portfolio tracking'),
      caseInsensitive('portfolio'),
      caseInsensitive('preference access'),
      caseInsensitive('preference'),
      caseInsensitive('receiveditem'),
      caseInsensitive('remittance'),
      caseInsensitive('reservedplan loan'),
      caseInsensitive('reservedplan transaction'),
      caseInsensitive('reservedplan'),
      caseInsensitive('savings'),
      caseInsensitive('share analysis'),
      caseInsensitive('share analysisgroup'),
      caseInsensitive('share analysisplan'),
      caseInsensitive('share checkorder'),
      caseInsensitive('share hold'),
      caseInsensitive('share name'),
      caseInsensitive('share note'),
      caseInsensitive('share tracking'),
      caseInsensitive('share transaction'),
      caseInsensitive('share transfer'),
      caseInsensitive('share'),
      caseInsensitive('site cashordertype'),
      caseInsensitive('site'),
      caseInsensitive('tracking'),
      caseInsensitive('transaction'),
      caseInsensitive('transfer'),
      caseInsensitive('user'),
      caseInsensitive('vendor'),
      caseInsensitive('westernunion'),
      caseInsensitive('wire beneficiaryadv'),
      caseInsensitive('wire beneficiaryfiadv'),
      caseInsensitive('wire beneficiaryfiinfo'),
      caseInsensitive('wire beneficiaryinfo'),
      caseInsensitive('wire drawdowndebitacctadv'),
      caseInsensitive('wire fitofiinfo'),
      caseInsensitive('wire intermedfiadv'),
      caseInsensitive('wire intermedfiinfo'),
      caseInsensitive('wire receiverfiinfo'),
      caseInsensitive('wire servicemessage'),
      caseInsensitive('wire uscauditinfo'),
      caseInsensitive('wire'),
      caseInsensitive('worklistedit worklistfield'),
      caseInsensitive('worklistedit'),
    )),

    data_type: $ => prec.right(seq(
      choice(
        caseInsensitive('character'),
        caseInsensitive('code'),
        caseInsensitive('date'),
        caseInsensitive('float'),
        caseInsensitive('money'),
        caseInsensitive('number'),
        caseInsensitive('rate'),
      ),
      optional(
        seq(
          '(',
          field("size", $.number),
          ')'
        )
      )
    )
    ),

    array_type: $ => seq(
      caseInsensitive('array'),
      '(',
      field("size", $.number),
      optional(
        repeat(
          seq(
            ',',
            field("size", $.number),
          )
        )
      ),
      ')'
    ),

    /* string_literal: $ => (seq(
      '"',
      token.immediate(repeat(prec(1, /[^"\[\]]+/))),
      '"'
  )), */

    _identifier: $ => {
      const alpha = /[^\x00-\x1F\s\p{Zs}0-9:;`"'@=#.),|^&<=>+\-*/\\%?!~()\[\]{}\uFEFF\u2060\u200B]|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/
      const alphanumeric = /[^\x00-\x1F\s\p{Zs}:;`"'@=#.,|^&<=>+\-*/\\%?!~()\[\]{}\uFEFF\u2060\u200B]|\\u[0-9a-fA-F]{4}|\\u\{[0-9a-fA-F]+\}/
      return prec(-1, token(seq(alpha, repeat(alphanumeric))))
    },

    identifier: $ => choice(
      $._identifier,
      $.array_identifier,
    ),

    array_identifier: $ => prec(10, seq(
      field("name", alias($._identifier, $.identifier)),
      field("index", $.subIndex)
    )),

    subIndex: $ => seq(
      '(',
      choice($.expression),
      repeat(seq(
        ',',
        choice($.expression),
      )),
      ')'
    ),

    number: $ => {
      const hex_literal = seq(
        choice('0x', '0X'),
        /[\da-fA-F](_?[\da-fA-F])*/
      )

      const decimal_digits = /\d(_?\d)*/
      const signed_integer = seq(optional(choice('-', '+')), decimal_digits)
      const exponent_part = seq(choice('e', 'E'), signed_integer)

      const binary_literal = seq(choice('0b', '0B'), /[0-1](_?[0-1])*/)

      const octal_literal = seq(choice('0o', '0O'), /[0-7](_?[0-7])*/)

      const bigint_literal = seq(choice(hex_literal, binary_literal, octal_literal, decimal_digits), 'n')

      const decimal_integer_literal = choice(
        '0',
        seq(optional('0'), /[1-9]/, optional(seq(optional('_'), decimal_digits)))
      )

      const decimal_literal = choice(
        seq(decimal_integer_literal, '.', optional(decimal_digits), optional(exponent_part)),
        seq('.', decimal_digits, optional(exponent_part)),
        seq(decimal_integer_literal, exponent_part),
        seq(decimal_digits),
      )

      return token(choice(
        hex_literal,
        decimal_literal,
        signed_integer,
        binary_literal,
        octal_literal,
        bigint_literal,
      ))
    },

    /* money: $ => {
      return token(seq(
          /[+-]?/,
          '$',
          /[0-9]{3},[0-9]{3},[0-9]{3}\.[0-9]{2}/
      ))
  }, */

    money: $ => {
      return token(seq(
        /[+-]?/,
        '$',
        /(([0-9]\d{0,2}(,\d{3})*))(\.\d{2})/,
      ))
    },

    date: $ => token(choice(
      "'--/--/----'",
      "'--/--/--'",
      "'-/-/-'",
      seq(
        "'",
        /[0-9]{2}/,
        "/",
        /[0-9]{2}/,
        "/",
        /(?:\d{4}|\d{2})/,
        "'"
      )
    )),

    rate: $ => token(seq(
      /(?:\d{3}|\d{2}|\d{1})/,
      optional('.'),
      optional(/(?:\d{3}|\d{2}|\d{1})/),
      '%'
    )),


    variable_declaration: $ => prec(10, seq(
      $.identifier,
      '=',
      choice(
        seq(
          $.data_type,
          optional($.array_type)),
        $.string_literal,
        $.poweron_function,
        $.number,
        $.identifier,
        $.date,
        $.money,
        $.rate,
        $.at_keywords
      ),
    )),

    include_statement: $ => seq(
      '#',
      caseInsensitive("include"),
      field("poweron", $.string_literal)
    ),

    database_field: $ => seq(
      repeat1($.record_type),
      /[:]{1}/,
      $.field_name
    ),

    field_name: $ => prec.left(seq(
      alias($.identifier, $.field_name),
      repeat(
        choice(
          seq(
            ':',
            field('index', $.number),
          ),
          seq(
            ':',
            seq(
              '(',
              $.expression,
              ')',
            )
          )
        )
      ),
    )),


    special_keywords: $ => choice(
      caseInsensitive('accountchange'),
      caseInsensitive('acs'),
      caseInsensitive('application'),
      caseInsensitive('atmdialog'),
      caseInsensitive('audio'),
      caseInsensitive('cardcreationwizard'),
      caseInsensitive('certificate'),
      caseInsensitive('checkdisbursedwizard'),
      caseInsensitive('collection'),
      caseInsensitive('customforms'),
      caseInsensitive('customformswindows'),
      caseInsensitive('demand'),
      caseInsensitive('excpitem'),
      caseInsensitive('homebanking'),
      caseInsensitive('mcw'),
      caseInsensitive('mcwinteractive'),
      caseInsensitive('stateless'),
      caseInsensitive('subroutine'),
      caseInsensitive('symconnect'),
      caseInsensitive('validation'),
      caseInsensitive('windows'),
      caseInsensitive('windowsprint'),
    ),

    poweron_function: $ => choice(
      $.abs,
      $.anyservice,
      $.anywarning,
      $.capitalize,
      $.characterread,
      $.charactersearch,
      $.chrvalue,
      $.coderead,
      $.col,
      $.copyapp,
      $.createfinancefromcredrep,
      $.ctrlchr,
      $.datasize,
      $.datefn,
      $.dateoffset,
      $.dateread,
      $.datevalue,
      $.day,
      $.dayofweek,
      $.dialogpromptchar,
      $.dialogpromptcode,
      $.dialogpromptcombooption,
      $.dialogpromptcombostart,
      $.dialogpromptcomboend,
      $.dialogclose,
      $.dialogdisplay,
      $.dialogpromptdate,
      $.dialogpromptlistoption,
      $.dialogpromptliststart,
      $.dialogpromptmoney,
      $.dialogpromptnumber,
      $.dialogpromptpassword,
      $.dialogpromptrate,
      $.dialogpromptyesno,
      $.dialogstart,
      $.dialogstartgroupbox,
      $.dialogtextlistoption,
      $.dialogtextliststart,
      $.dim,
      $.divprojectinit,
      $.emailline,
      $.emailsend,
      $.emailstart,
      $.entercharacter,
      $.entercode,
      $.enterdate,
      $.entermoney,
      $.enterrate,
      $.enteryesno,
      $.execute,
      $.exp,
      $.filearchiveadd,
      $.filearchiveextract,
      $.fileclose,
      $.filecreate,
      $.filedecrypt,
      $.filedelete,
      $.fileencrypt,
      $.filegetpos,
      $.filelistclose,
      $.filelistopen,
      $.filelistread,
      $.fileopen,
      $.fileread,
      $.filereadline,
      $.filesetpos,
      $.filewrite,
      $.filewriteline,
      $.floatfn,
      $.floatvalue,
      $.floor,
      $.fmperform,
      $.format,
      $.format,
      $.ftpclose,
      $.ftpcmd,
      $.ftpget,
      $.ftplogin,
      $.ftpopen,
      $.ftpput,
      $.fullyear,
      $.getdatachar,
      $.getdatadate,
      $.getdatamoney,
      $.getdatanumber,
      $.getdatarate,
      $.getfielddatamax,
      $.getfielddatatype,
      $.getfieldhelpfile,
      $.getfieldmnemonic,
      $.getfieldname,
      $.getfieldnumber,
      $.header,
      $.headers,
      $.hour,
      $.hpboxdraw,
      $.hpesc,
      $.hpfont,
      $.hplinedraw,
      $.hplinesperinch,
      $.hpreset,
      $.hpsetup,
      $.hpunderline,
      $.hpxpos,
      $.hpypos,
      $.htmlviewdisplay,
      $.htmlviewline,
      $.htmlviewopen,
      $.initcreditreport,
      $.initsubroutine,
      $.insertqueue,
      $.int,
      $.length,
      $.loanprojectinit,
      $.log,
      $.lowercase,
      $.md5hash,
      $.minute,
      $.mod,
      $.moneyfn,
      $.moneyread,
      $.month,
      $.newline,
      $.numberfn,
      $.numberread,
      $.outputclose,
      $.outputopen,
      $.outputswitch,
      $.overdrawavailableinit,
      $.overdrawavailablecalc,
      $.passwordhash,
      $.popupmessage,
      $.print,
      $.pullcreditreport,
      $.pwr,
      $.queuecreditreport,
      $.ratefn,
      $.rateread,
      $.removequeue,
      $.repeatchr,
      $.screenxypos,
      $.segment,
      $.stopblink,
      $.suppressnewline,
      $.systemdate,
      $.sysactualdate,
      $.sysusername,
      $.sysusernumber,
      $.terminate,
      $.totalfn,
      $.trailers,
      $.tranperform,
      $.uppercase,
      $.validatefieldset,
      $.value,
      $.whilelimit,
      $.width,
      $.winddeconnect,
      $.winddeexecute,
      $.winddepokedata,
      $.windowssend,
      $.winmessagefield,
      $.winmessagestart,
      $.year,
      $.yesnoprompt,
      $.yesnoread,
    ),

    hpypos: $ => seq(
      caseInsensitive('hpypos'),
      '(',
      $.expression,
      ')',
    ),

    hpxpos: $ => seq(
      caseInsensitive('hpxpos'),
      '(',
      $.expression,
      ')',
    ),

    overdrawavailableinit: $ => caseInsensitive('overdrawavailableinit'),

    overdrawavailablecalc: $ => caseInsensitive('overdrawavailablecalc'),

    systemdate: $ => caseInsensitive('systemdate'),
    sysactualdate: $ => caseInsensitive('sysactualdate'),

    hpunderline: $ => seq(
      caseInsensitive('hpunderline'),
      '(',
      $.expression,
      ')',
    ),

    hpsetup: $ => seq(
      caseInsensitive('hpsetup'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    hpreset: $ => caseInsensitive('hpreset'),

    hplinesperinch: $ => seq(
      caseInsensitive('hplinesperinch'),
      '(',
      $.expression,
      ')',
    ),

    hplinedraw: $ => seq(
      caseInsensitive('hplinedraw'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    hpfont: $ => seq(
      caseInsensitive('hpfont'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    hpesc: $ => prec.left(seq(
      caseInsensitive('hpesc'),
      $.expression,
    )),

    hpboxdraw: $ => seq(
      caseInsensitive('hpboxdraw'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    hour: $ => seq(
      caseInsensitive('hour'),
      '(',
      $.expression,
      ')',
    ),

    yesnoread: $ => seq(
      caseInsensitive('yesnoread'),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')',
    ),

    yesnoprompt: $ => seq(
      caseInsensitive('yesnoprompt'),
      '(',
      $.expression,
      ')',
    ),

    year: $ => seq(
      caseInsensitive('year'),
      '(',
      $.expression,
      ')',
    ),

    winmessagestart: $ => seq(
      caseInsensitive('winmessagestart'),
      '(',
      $.expression,
      ')',
    ),

    winmessagefield: $ => seq(
      caseInsensitive('winmessagefield'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    windowssend: $ => seq(
      caseInsensitive('windowssend'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    winddepokedata: $ => seq(
      caseInsensitive('winddepokedata'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    winddeexecute: $ => seq(
      caseInsensitive('winddeexecute'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    winddeconnect: $ => seq(
      caseInsensitive('winddeconnect'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    width: $ => prec.left(seq(
      caseInsensitive('width'),
      '=',
      $.expression,
    )),

    whilelimit: $ => prec.left(seq(
      caseInsensitive('whilelimit'),
      '=',
      $.expression,
    )),

    validatefieldset: $ => seq(
      caseInsensitive('validatefieldset'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    tranperform: $ => seq(
      caseInsensitive('tranperform'),
      $.tran_code,
      optional(
        $.source_code,
      ),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      ')',
      $.start_block,
      repeat($.setexp),
      $.end_block,
    ),

    trailers: $ => seq(
      caseInsensitive('trailers'),
      repeat($.expression),
      $.end_block,
    ),

    totalfn: $ => prec.left(seq(
      caseInsensitive('total'),
      '=',
      $.expression,
    )),

    sysusername: $ => seq(
      caseInsensitive('sysusername'),
      '(',
      $.expression,
      ')',
    ),

    sysusernumber: $ => caseInsensitive('sysusernumber'),

    suppressnewline: $ => caseInsensitive('suppressnewline'),

    newline: $ => caseInsensitive('newline'),

    stopblink: $ => caseInsensitive('stopblink'),

    screenxypos: $ => seq(
      caseInsensitive('screenxypos'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    repeatchr: $ => seq(
      caseInsensitive('repeatchr'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    removequeue: $ => prec.left(seq(
      caseInsensitive('remove'),
      optional(caseInsensitive('from')),
      caseInsensitive('queue'),
    )),

    rateread: $ => seq(
      caseInsensitive('rateread'),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')',
    ),

    queuecreditreport: $ => seq(
      caseInsensitive('queuecreditreport'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    pwr: $ => seq(
      caseInsensitive('pwr'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    pullcreditreport: $ => caseInsensitive('pullcreditreport'),

    print: $ => prec.left(seq(
      caseInsensitive('print'),
      $.expression,
    )),

    popupmessage: $ => seq(
      caseInsensitive('popupmessage'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    passwordhash: $ => seq(
      caseInsensitive('passwordhash'),
      '(',
      $.expression,
      ')',
    ),

    outputswitch: $ => seq(
      caseInsensitive('outputswitch'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    outputopen: $ => seq(
      caseInsensitive('outputopen'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    outputclose: $ => seq(
      caseInsensitive('outputclose'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    numberread: $ => seq(
      caseInsensitive('numberread'),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')',
    ),

    numberfn: $ => seq(
      caseInsensitive('number'),
      '(',
      $.expression,
      ')',
    ),

    month: $ => seq(
      caseInsensitive('month'),
      '(',
      $.expression,
      ')',
    ),

    moneyread: $ => seq(
      caseInsensitive('moneyread'),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')',
    ),

    moneyfn: $ => seq(
      caseInsensitive('money'),
      '(',
      $.expression,
      ')',
    ),

    mod: $ => seq(
      caseInsensitive('mod'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    minute: $ => seq(
      caseInsensitive('minute'),
      '(',
      $.expression,
      ')',
    ),

    md5hash: $ => seq(
      caseInsensitive('md5hash'),
      '(',
      $.expression,
      ')',
    ),

    lowercase: $ => seq(
      caseInsensitive('lowercase'),
      '(',
      $.expression,
      ')',
    ),

    log: $ => seq(
      caseInsensitive('log'),
      '(',
      $.expression,
      ')',
    ),

    loanprojectinit: $ => seq(
      caseInsensitive('loanprojectinit'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    int: $ => seq(
      caseInsensitive('int'),
      '(',
      $.expression,
      ')',
    ),

    insertqueue: $ => prec.left(seq(
      caseInsensitive('insert'),
      optional(caseInsensitive('into')),
      caseInsensitive('queue'),
      $.expression,
      caseInsensitive('priority'),
      $.expression
    )),

    initsubroutine: $ => seq(
      caseInsensitive('initsubroutine'),
      '(',
      $.expression,
      ')',
    ),

    initcreditreport: $ => seq(
      caseInsensitive('initcreditreport'),
      '(',
      $.expression,
      ')',
    ),

    headers: $ => seq(
      caseInsensitive('headers'),
      repeat($.expression),
      $.end_block,
    ),

    header: $ => prec.left(seq(
      caseInsensitive('header'),
      '=',
      $.expression
    )),

    getfielddatamax: $ => seq(
      caseInsensitive('getfielddatamax'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    getfielddatatype: $ => seq(
      caseInsensitive('getfielddatatype'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    getfieldhelpfile: $ => seq(
      caseInsensitive('getfieldhelpfile'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    getfieldmnemonic: $ => seq(
      caseInsensitive('getfieldmnemonic'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    getfieldname: $ => seq(
      caseInsensitive('getfieldname'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    getfieldnumber: $ => seq(
      caseInsensitive('getfieldnumber'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    getdatarate: $ => seq(
      caseInsensitive('getdatarate'),
      '(',
      $.expression,
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      ')',
    ),

    getdatanumber: $ => seq(
      caseInsensitive('getdatanumber'),
      '(',
      $.expression,
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      ')',
    ),

    getdatamoney: $ => seq(
      caseInsensitive('getdatamoney'),
      '(',
      $.expression,
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      ')',
    ),

    getdatadate: $ => seq(
      caseInsensitive('getdatadate'),
      '(',
      $.expression,
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      ')',
    ),

    getdatachar: $ => seq(
      caseInsensitive('getdatachar'),
      '(',
      $.expression,
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      optional(seq(',', $.expression)),
      ')',
    ),

    fullyear: $ => seq(
      caseInsensitive('fullyear'),
      '(',
      $.expression,
      ')',
    ),

    ftpput: $ => seq(
      caseInsensitive('ftpput'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    ftpopen: $ => seq(
      caseInsensitive('ftpopen'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    ftplogin: $ => seq(
      caseInsensitive('ftpget'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    ftpget: $ => seq(
      caseInsensitive('ftpget'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    ftpcmd: $ => seq(
      caseInsensitive('ftpcmd'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    ftpclose: $ => seq(
      caseInsensitive('ftpclose'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    forrecordwith: $ => seq(
      caseInsensitive('for'),
      $.record_type,
      caseInsensitive('with'),
      $.expression,
      $.expression,
      $.start_block,
      repeat($.statement),
      $.end_block,
    ),

    forrecord: $ => seq(
      caseInsensitive('for'),
      $.record_type,
      $.expression,
      $.start_block,
      repeat($.statement),
      $.end_block,
    ),

    format: $ => seq(
      caseInsensitive('format'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    until_expression: $ => seq(
      caseInsensitive('until'),
      $.expression,
    ),

    foreachdoend: $ => prec.right(seq(
      caseInsensitive('for'),
      caseInsensitive('each'),
      repeat1($.record_type),
      optional(
        seq(
          caseInsensitive('with'),
          $.expression
        )
      ),
      $.start_block,
      repeat($.statement),
      $.end_block,
      optional($.until_expression),
    )),

    uppercase: $ => seq(
      caseInsensitive('uppercase'),
      '(',
      $.expression,
      ')',
    ),

    fmperform: $ => prec.right(10, seq(
      caseInsensitive('fmperform'),
      $.fmtype,
      optional(caseInsensitive('targetfile')),
      $.recordPath,
      $.fmperformoptions,
      $.start_block,
      repeat(choice(
        $.setexp,
        $.include_statement,
        $.removequeue,
        $.setwarn,
        $.clearwarn,
        $.insertqueue,
      )),
      $.end_block,
    )),

    fmperformoptions: $ => seq(
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      optional(seq(
        ',',
        $.expression,
      )),
      ',',
      $.expression,
      ')',
    ),

    recordPath: $ => prec.left(10, repeat1(seq(
      seq(
        choice(
          $.record_type,
          caseInsensitive('loc'),
        ),
        optional(
          choice(
            alias($._identifier, $.identifier),
            $.string_literal,
            $.number,
            $.keyword,
            $.poweron_function,
          )
        )
      )
    ))),

    fmtype: $ => choice(
      caseInsensitive('create'),
      caseInsensitive('revise'),
      caseInsensitive('delete'),
    ),

    setwarn: $ => seq(
      caseInsensitive('setwarning'),
      $.expression,
      $.expression
    ),

    clearwarn: $ => seq(
      caseInsensitive('clearwarning'),
      $.expression,
    ),

    setexp: $ => seq(
      caseInsensitive('set'),
      $.field_name,
      caseInsensitive('to'),
      $.expression
    ),


    floor: $ => seq(
      caseInsensitive('floor'),
      '(',
      $.expression,
      ')',
    ),

    floatvalue: $ => seq(
      caseInsensitive('floatvalue'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    floatfn: $ => seq(
      caseInsensitive('float'),
      '(',
      $.expression,
      ')',
    ),

    filewriteline: $ => seq(
      caseInsensitive('filewriteline'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        )
      ),
      ')',
    ),

    filewrite: $ => seq(
      caseInsensitive('filewrite'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        )
      ),
      ')',
    ),

    filesetpos: $ => seq(
      caseInsensitive('filesetpos'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    terminate: $ => prec(1, caseInsensitive('terminate'),),

    htmlviewdisplay: $ => prec(1, caseInsensitive('htmlviewdisplay'),),

    htmlviewline: $ => seq(
      caseInsensitive('htmlviewline'),
      '(',
      $.expression,
      ')'
    ),

    htmlviewopen: $ => prec.left(1, seq(
      caseInsensitive('htmlviewopen'),
      optional(
        seq(
          '(',
          $.expression,
          ')',
        ),
      ),
    ),
    ),

    fileread: $ => seq(
      caseInsensitive('fileread'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filelistread: $ => seq(
      caseInsensitive('filelistread'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filelistopen: $ => seq(
      caseInsensitive('filelistopen'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filelistclose: $ => seq(
      caseInsensitive('filelistclose'),
      '(',
      $.expression,
      ')',
    ),

    filegetpos: $ => seq(
      caseInsensitive('filegetpos'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    fileencrypt: $ => seq(
      caseInsensitive('fileencrypt'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filedelete: $ => seq(
      caseInsensitive('filedelete'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filedecrypt: $ => seq(
      caseInsensitive('filedecrypt'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filecreate: $ => seq(
      caseInsensitive('filecreate'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    fileclose: $ => seq(
      caseInsensitive('fileclose'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filearchiveextract: $ => seq(
      caseInsensitive('filearchiveextract'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filearchiveadd: $ => seq(
      caseInsensitive('filearchiveadd'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    exp: $ => seq(
      caseInsensitive('exp'),
      '(',
      $.expression,
      ')',
    ),

    execute: $ => seq(
      caseInsensitive('execute'),
      '(',
      $.expression,
      ',',
      optional(
        seq(
          $.expression,
          ',',
        ),
      ),
      $.expression,
      ')',
    ),

    enteryesno: $ => seq(
      caseInsensitive('enteryesno'),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    enterrate: $ => seq(
      caseInsensitive('enterrate'),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    enternumber: $ => seq(
      caseInsensitive('enternumber'),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    entermoney: $ => seq(
      caseInsensitive('entermoney'),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    enterdate: $ => seq(
      caseInsensitive("enterdate"),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    entercode: $ => seq(
      caseInsensitive("entercode"),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    entercharacter: $ => seq(
      caseInsensitive("entercharacter"),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(seq(
        ',',
        $.expression,
      )),
      ')',
    ),

    emailstart: $ => seq(
      caseInsensitive("emailstart"),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    emailsend: $ => seq(
      caseInsensitive("emailsend"),
      '(',
      $.expression,
      ')',
    ),

    emailline: $ => seq(
      caseInsensitive("emailline"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    divprojectinit: $ => seq(
      caseInsensitive("divprojectinit"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    dim: $ => prec.left(seq(
      caseInsensitive("dim"),
      '=',
      choice(
        $.number,
        $.identifier
      ),
      /\s/,
      $.expression
    )),

    dialogtextliststart: $ => seq(
      caseInsensitive("dialogtextliststart"),
      '(',
      $.expression,
      ')',
    ),

    dialogtextlistoption: $ => seq(
      caseInsensitive("dialogtextlistoption"),
      '(',
      $.expression,
      ')',
    ),

    dialogstartgroupbox: $ => seq(
      caseInsensitive("dialogstartgroupbox"),
      '(',
      $.expression,
      ')',
    ),

    dialogstart: $ => seq(
      caseInsensitive("dialogstart"),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    dialogpromptyesno: $ => seq(
      caseInsensitive("dialogpromptyesno"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    dialogpromptpassword: $ => seq(
      caseInsensitive("dialogpromptpassword"),
      '(',
      $.expression,
      ',',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),

    dialogpromptmoney: $ => seq(
      caseInsensitive("dialogpromptmoney"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),


    dialogpromptnumber: $ => seq(
      caseInsensitive("dialogpromptnumber"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    dialogpromptrate: $ => seq(
      caseInsensitive("dialogpromptrate"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    dialogpromptliststart: $ => seq(
      caseInsensitive("dialogpromptliststart"),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),


    dialogpromptlistoption: $ => seq(
      caseInsensitive("dialogpromptlistoption"),
      '(',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),

    dialogpromptdate: $ => seq(
      caseInsensitive("dialogpromptdate"),
      '(',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),



    dialogpromptcombostart: $ => seq(
      caseInsensitive("dialogpromptcombostart"),
      '(',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),

    dialogpromptcomboend: $ => caseInsensitive("dialogpromptcomboend"),
    dialogclose: $ => caseInsensitive("dialogclose"),
    dialogdisplay: $ => caseInsensitive("dialogdisplay"),




    dialogpromptcombooption: $ => seq(
      caseInsensitive("dialogpromptcombooption"),
      '(',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),


    dialogpromptcode: $ => seq(
      caseInsensitive("dialogpromptcode"),
      '(',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),


    dialogpromptchar: $ => seq(
      caseInsensitive("dialogpromptchar"),
      '(',
      $.expression,
      optional(
        seq(
          ',',
          $.expression
        )
      ),
      optional(
        seq(
          ',',
          $.expression
        ),
      ),
      ')',
    ),

    dayofweek: $ => seq(
      caseInsensitive("dayofweek"),
      '(',
      $.expression,
      ')',
    ),


    day: $ => seq(
      caseInsensitive("day"),
      '(',
      $.expression,
      ')',
    ),

    dateread: $ => seq(
      caseInsensitive("dateread"),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')'
    ),

    dateoffset: $ => seq(
      caseInsensitive("dateoffset"),
      '(',
      $.expression,
      ',',
      optional('-'),
      $.expression,
      ',',
      $.expression,
      ')'
    ),

    datefn: $ => seq(
      caseInsensitive("date"),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')'
    ),

    /* datasize: $ => prec.left(seq(
      caseInsensitive("datasize"),
      '=',
      choice(
          $.number,
          $.identifier
      ),
      /\s/,
      $.expression
  )), */

    ctrlchr: $ => seq(
      caseInsensitive("ctrlchr"),
      '(',
      choice(
        $.number,
        $.identifier,
      ),
      ')'
    ),

    createfinancefromcredrep: $ => seq(
      caseInsensitive("createfinancefromcredrep"),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    coderead: $ => seq(
      caseInsensitive("coderead"),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')'
    ),

    /* col: $ => prec.right(seq(
    caseInsensitive("col"),
    /[=]{1}/,
    choice(
      $.number,
      $.identifier,
      $.expression,
      /[0-9]{3}/,
    ),
    /\s/,
    $.expression
  )), */

    copyapp: $ => seq(
      caseInsensitive("copyapp"),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.identifier,
      ')'
    ),

    chrvalue: $ => seq(
      caseInsensitive("chrvalue"),
      '(',
      $.expression,
      ')'
    ),

    characterread: $ => seq(
      caseInsensitive("characterread"),
      '(',
      $.expression,
      repeat(seq(
        ',',
        $.expression
      )),
      ')',
    ),

    capitalize: $ => seq(
      caseInsensitive("capitalize"),
      '(',
      $.expression,
      ')'
    ),

    anywarning: $ => seq(
      caseInsensitive("anywarning"),
      '(',
      $.record_type,
      ',',
      $.expression,
      ')'
    ),

    anyservice: $ => seq(
      caseInsensitive("anyservice"),
      '(',
      $.record_type,
      ',',
      $.number,
      ')'
    ),

    abs: $ => seq(
      caseInsensitive('abs'),
      '(',
      $.expression,
      ')',
    ),

    datevalue: $ => seq(
      caseInsensitive('datevalue'),
      '(',
      $.expression,
      ')',
    ),

    ratefn: $ => seq(
      caseInsensitive('rate'),
      '(',
      $.expression,
      ')',
    ),

    value: $ => seq(
      caseInsensitive('value'),
      '(',
      $.expression,
      ')',
    ),

    format: $ => seq(
      caseInsensitive('format'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    segment: $ => seq(
      caseInsensitive('segment'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')'
    ),

    charactersearch: $ => seq(
      caseInsensitive('charactersearch'),
      '(',
      $.expression,
      ',',
      $.expression,
      ')'
    ),

    length: $ => seq(
      caseInsensitive('length'),
      '(',
      $.expression,
      ')'
    ),

    fileopen: $ => seq(
      caseInsensitive('fileopen'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')',
    ),

    filereadline: $ => seq(
      caseInsensitive('filereadline'),
      '(',
      $.expression,
      ',',
      $.expression,
      ',',
      $.expression,
      ')'
    ),

    /* comment: $ => token(
      /[\[]{1}[\s\w:\.\{\}\-",\/=:\*#~\$\^\?\(\)"\\\|;!%<>@©�&'+]*[\]]{1}/gm
  ), */

    expression: $ => prec(10, choice(
      $.primary_expression,
      $.assignment_expression,
      $.binary_expression,
      $.include_statement,
      $.database_field,
      $.record_type,
      $.any_expression,
      $.any_with_expression,
      $.not_with_expression,
      $.not_expression,
      $.not_any_expression,
      $.not_any_with_expression,
    )),

    assignment_expression: $ => prec.left('assign', seq(
      choice(
        $._lhs_expression
      ),
      '=',
      $.expression
    )),

    _lhs_expression: $ => prec.left(5, choice(
      $.identifier
    )),

    parenthesized_expression: $ => seq(
      '(',
      $.expression,
      ')'
    ),


    binary_expression: $ => prec.right(choice(
      ...[
        ['AND', 'logical_and'],
        ['and', 'logical_and'],
        ['OR', 'logical_or'],
        ['or', 'logical_or'],
        ['+', 'binary_plus'],
        ['-', 'binary_plus'],
        ['*', 'binary_times'],
        ['/', 'binary_times'],
        ['=', 'binary_equality'],
        ['<>', 'binary_equality'],
        ['>', 'binary_relation'],
        ['>=', 'binary_relation'],
        ['<', 'binary_relation'],
        ['<=', 'binary_relation'],
      ].map(([operator, precedence]) =>
        prec.left(precedence, seq(
          field('left', $.expression),
          field('operator', operator),
          field('right', $.expression)
        ))
      )
    )),

    primary_expression: $ => prec.left(choice(
      $.poweron_function,
      $.parenthesized_expression,
      $.keyword,
      $.identifier,
      $.number,
      $.money,
      $.date,
      $.rate,
      $.string_literal,
    )),

    for_statement: $ => choice(
      $.for_loop,
      $.forrecord,
      $.forrecordwith,
      $.foreachdoend,
    ),

    for_loop: $ => seq(
      caseInsensitive('for'),
      $.identifier,
      '=',
      $.expression,
      caseInsensitive('to'),
      $.expression,
      optional(
        seq(
          caseInsensitive('by'),
          $.expression
        )
      ),
      seq(
        $.start_block,
        repeat($.statement),
        $.end_block,
      )
    ),

    while_statement: $ => seq(
      caseInsensitive('while'),
      field('condition', $.expression),
      $.start_block,
      repeat($.statement),
      $.end_block,
    ),

    if_statement: $ => choice(
      $.if_statement_no_block,
      $.if_statement_block,
      $.if_else_no_block,
      $.if_else_block,
      $.else_if,
    ),

    if_statement_no_block: $ => seq(
      caseInsensitive('if'),
      optional(
        caseInsensitive('not')
      ),
      $.statement,
      caseInsensitive('then'),
      $.statement
    ),

    if_statement_block: $ => seq(
      caseInsensitive('if'),
      optional(
        caseInsensitive('not')
      ),
      $.statement,
      caseInsensitive('then'),
      $.start_block,
      repeat($.statement),
      $.end_block,
    ),


    if_else_block: $ => prec(10, seq(
      choice(
        $.if_statement_block,
        $.if_statement_no_block,
      ),

      repeat1(prec.right(30, seq(
        caseInsensitive('else'),
        $.start_block,
        repeat($.statement),
        $.end_block,
      )))
    )),

    if_else_no_block: $ => prec.left(seq(
      choice(
        $.if_statement_block,
        $.if_statement_no_block,
      ),

      repeat1(prec.right(30, seq(
        caseInsensitive('else'),
        $.statement,
      )))
    )),

    else_if: $ => prec.left(10, seq(
      choice(
        $.if_statement_block,
        $.if_statement_no_block,
      ),
      repeat1(prec.left(20, seq(
        caseInsensitive('else'),
        $.statement
      ))))),

    statement: $ => choice(
      $.expression,
      $.setexp,
      $.for_statement,
      $.if_statement,
      $.procedure_call,
      $.procedure_definition,
      $.while_statement,
    ),

    any_with_expression: $ => prec.left(30, seq(
      caseInsensitive('any'),
      choice(
        $.poweron_function,
        $.record_type,
      ),
      caseInsensitive('with'),
      $.expression,
    )),

    any_expression: $ => prec.left(20, seq(
      caseInsensitive('any'),
      choice(
        $.poweron_function,
        $.record_type,
      ),
    )),

    not_with_expression: $ => prec.left(30, seq(
      caseInsensitive('not'),
      choice(
        $.poweron_function,
        $.record_type,
      ),
      caseInsensitive('with'),
      $.expression,
    )),

    not_expression: $ => prec.left(20, seq(
      caseInsensitive('not'),
      choice(
        $.poweron_function,
        $.record_type,
      ),
    )),

    not_any_with_expression: $ => prec.left(50, seq(
      caseInsensitive('not'),
      caseInsensitive('any'),
      choice(
        $.poweron_function,
        $.record_type,
      ),
      caseInsensitive('with'),
      $.expression,
    )),

    not_any_expression: $ => prec.left(40, seq(
      caseInsensitive('not'),
      caseInsensitive('any'),
      choice(
        $.poweron_function,
        $.record_type,
      ),
    )),

    procedure_definition: $ => seq(
      caseInsensitive('procedure '),
      $.identifier,
      repeat($.statement),
      $.end_block,
    ),

    procedure_call: $ => seq(
      caseInsensitive('call'),
      field("procedure_name", $.identifier)
    ),


  }
});

function caseInsensitive(keyword) {
  return new RegExp(keyword
    .split('')
    .map(letter => `[${letter}${letter.toUpperCase()}]`)
    .join('')
  )
}

"use strict";
(() => {
  window.tailwind = {};
  var NEWLINE_CHARCODE_btAXDi = 10;
  function parseCSS_iwVxBN(cssText_TPitHb) {
    "\ufeff" === cssText_TPitHb[0] && (cssText_TPitHb = cssText_TPitHb.slice(1)), cssText_TPitHb = cssText_TPitHb.replaceAll("\r\n", "\n");
    let charCode_OjgIzb,
      astNodes_ieYEip = [],
      astComments_iWQWnM = [],
      ruleStack_bvTCok = [],
      currentRule_UqnIzk = null,
      node_vgEdVm = null,
      currentBuffer_qqZqHB = "",
      nestedParensBraces_CfSdlv = "";
    for (let i_CYzMUZ = 0; i_CYzMUZ < cssText_TPitHb.length; i_CYzMUZ++) {
      let code_TzTLld = cssText_TPitHb.charCodeAt(i_CYzMUZ);
      if (92 === code_TzTLld) currentBuffer_qqZqHB += cssText_TPitHb.slice(i_CYzMUZ, i_CYzMUZ + 2), i_CYzMUZ += 1;else
      if (47 === code_TzTLld && 42 === cssText_TPitHb.charCodeAt(i_CYzMUZ + 1)) {
        let commentStart_ZLPxhh = i_CYzMUZ;
        for (let j_iuoToq = i_CYzMUZ + 2; j_iuoToq < cssText_TPitHb.length; j_iuoToq++)
        if (charCode_OjgIzb = cssText_TPitHb.charCodeAt(j_iuoToq), 92 === charCode_OjgIzb) j_iuoToq += 1;else
        if (42 === charCode_OjgIzb && 47 === cssText_TPitHb.charCodeAt(j_iuoToq + 1)) {
          i_CYzMUZ = j_iuoToq + 1;
          break;
        }
        let commentText_FPSDww = cssText_TPitHb.slice(commentStart_ZLPxhh, i_CYzMUZ + 1);
        33 === commentText_FPSDww.charCodeAt(2) && astComments_iWQWnM.push(processComment_NLgzxN(commentText_FPSDww.slice(2, -2)));
      } else if (39 === code_TzTLld || 34 === code_TzTLld) {
        let stringStart_LbWWmR = i_CYzMUZ;
        for (let j_juwlvG = i_CYzMUZ + 1; j_juwlvG < cssText_TPitHb.length; j_juwlvG++)
        if (charCode_OjgIzb = cssText_TPitHb.charCodeAt(j_juwlvG), 92 === charCode_OjgIzb) j_juwlvG += 1;else
        {
          if (charCode_OjgIzb === code_TzTLld) {
            i_CYzMUZ = j_juwlvG;
            break;
          }
          if (59 === charCode_OjgIzb && cssText_TPitHb.charCodeAt(j_juwlvG + 1) === NEWLINE_CHARCODE_btAXDi)
          throw new Error(
            `Unterminated string: ${cssText_TPitHb.slice(stringStart_LbWWmR, j_juwlvG + 1) + String.fromCharCode(code_TzTLld)}`
          );
          if (charCode_OjgIzb === NEWLINE_CHARCODE_btAXDi)
          throw new Error(
            `Unterminated string: ${cssText_TPitHb.slice(stringStart_LbWWmR, j_juwlvG) + String.fromCharCode(code_TzTLld)}`
          );
        }
        currentBuffer_qqZqHB += cssText_TPitHb.slice(stringStart_LbWWmR, i_CYzMUZ + 1);
      } else {
        if (
        (32 === code_TzTLld || code_TzTLld === NEWLINE_CHARCODE_btAXDi || 9 === code_TzTLld) && (
        charCode_OjgIzb = cssText_TPitHb.charCodeAt(i_CYzMUZ + 1)) && (
        32 === charCode_OjgIzb || charCode_OjgIzb === NEWLINE_CHARCODE_btAXDi || 9 === charCode_OjgIzb))

        continue;
        if (code_TzTLld === NEWLINE_CHARCODE_btAXDi) {
          if (0 === currentBuffer_qqZqHB.length) continue;
          charCode_OjgIzb = currentBuffer_qqZqHB.charCodeAt(currentBuffer_qqZqHB.length - 1),
          32 !== charCode_OjgIzb && charCode_OjgIzb !== NEWLINE_CHARCODE_btAXDi && 9 !== charCode_OjgIzb && (currentBuffer_qqZqHB += " ");
        } else if (45 === code_TzTLld && 45 === cssText_TPitHb.charCodeAt(i_CYzMUZ + 1) && 0 === currentBuffer_qqZqHB.length) {
          let closingBracketsNeeded_NUKlcY = "",
            customStart_vZiEFs = i_CYzMUZ,
            colonIndex_nYBxoj = -1;
          for (let j_CgyGrw = i_CYzMUZ + 2; j_CgyGrw < cssText_TPitHb.length; j_CgyGrw++)
          if (charCode_OjgIzb = cssText_TPitHb.charCodeAt(j_CgyGrw), 92 === charCode_OjgIzb) j_CgyGrw += 1;else
          if (47 === charCode_OjgIzb && 42 === cssText_TPitHb.charCodeAt(j_CgyGrw + 1)) {
            for (let k_mrCday = j_CgyGrw + 2; k_mrCday < cssText_TPitHb.length; k_mrCday++)
            if (charCode_OjgIzb = cssText_TPitHb.charCodeAt(k_mrCday), 92 === charCode_OjgIzb) k_mrCday += 1;else
            if (42 === charCode_OjgIzb && 47 === cssText_TPitHb.charCodeAt(k_mrCday + 1)) {
              j_CgyGrw = k_mrCday + 1;
              break;
            }
          } else if (-1 === colonIndex_nYBxoj && 58 === charCode_OjgIzb) colonIndex_nYBxoj = currentBuffer_qqZqHB.length + j_CgyGrw - customStart_vZiEFs;else
          {
            if (59 === charCode_OjgIzb && 0 === closingBracketsNeeded_NUKlcY.length) {
              currentBuffer_qqZqHB += cssText_TPitHb.slice(customStart_vZiEFs, j_CgyGrw), i_CYzMUZ = j_CgyGrw;
              break;
            }
            if (40 === charCode_OjgIzb) closingBracketsNeeded_NUKlcY += ")";else
            if (91 === charCode_OjgIzb) closingBracketsNeeded_NUKlcY += "]";else
            if (123 === charCode_OjgIzb) closingBracketsNeeded_NUKlcY += "}";else
            {
              if ((125 === charCode_OjgIzb || cssText_TPitHb.length - 1 === j_CgyGrw) && 0 === closingBracketsNeeded_NUKlcY.length) {
                i_CYzMUZ = j_CgyGrw - 1, currentBuffer_qqZqHB += cssText_TPitHb.slice(customStart_vZiEFs, j_CgyGrw);
                break;
              }
              (41 === charCode_OjgIzb || 93 === charCode_OjgIzb || 125 === charCode_OjgIzb) &&
              closingBracketsNeeded_NUKlcY.length > 0 &&
              cssText_TPitHb[j_CgyGrw] === closingBracketsNeeded_NUKlcY[closingBracketsNeeded_NUKlcY.length - 1] && (
              closingBracketsNeeded_NUKlcY = closingBracketsNeeded_NUKlcY.slice(0, -1));
            }
          }
          let customNode_RaFEIx = parseCSSDeclaration_usrKpx(currentBuffer_qqZqHB, colonIndex_nYBxoj);
          if (!customNode_RaFEIx) throw new Error("Invalid custom property, expected a value");
          currentRule_UqnIzk ? currentRule_UqnIzk.nodes.push(customNode_RaFEIx) : astNodes_ieYEip.push(customNode_RaFEIx), currentBuffer_qqZqHB = "";
        } else if (59 === code_TzTLld && 64 === currentBuffer_qqZqHB.charCodeAt(0))
        node_vgEdVm = parseCSSAtRule_GJCwde(currentBuffer_qqZqHB), currentRule_UqnIzk ? currentRule_UqnIzk.nodes.push(node_vgEdVm) : astNodes_ieYEip.push(node_vgEdVm), currentBuffer_qqZqHB = "", node_vgEdVm = null;else
        if (59 === code_TzTLld && ")" !== nestedParensBraces_CfSdlv[nestedParensBraces_CfSdlv.length - 1]) {
          let declarationNode_NGAtyZ = parseCSSDeclaration_usrKpx(currentBuffer_qqZqHB);
          if (!declarationNode_NGAtyZ)
          throw 0 === currentBuffer_qqZqHB.length ?
          new Error("Unexpected semicolon") :
          new Error(`Invalid declaration: \`${currentBuffer_qqZqHB.trim()}\``);
          currentRule_UqnIzk ? currentRule_UqnIzk.nodes.push(declarationNode_NGAtyZ) : astNodes_ieYEip.push(declarationNode_NGAtyZ), currentBuffer_qqZqHB = "";
        } else if (123 === code_TzTLld && ")" !== nestedParensBraces_CfSdlv[nestedParensBraces_CfSdlv.length - 1])
        nestedParensBraces_CfSdlv += "}",
        node_vgEdVm = parseCSSRule_QVgHxe(currentBuffer_qqZqHB.trim()),
        currentRule_UqnIzk && currentRule_UqnIzk.nodes.push(node_vgEdVm),
        ruleStack_bvTCok.push(currentRule_UqnIzk),
        currentRule_UqnIzk = node_vgEdVm,
        currentBuffer_qqZqHB = "",
        node_vgEdVm = null;else
        if (125 === code_TzTLld && ")" !== nestedParensBraces_CfSdlv[nestedParensBraces_CfSdlv.length - 1]) {
          if ("" === nestedParensBraces_CfSdlv) throw new Error("Missing opening {");
          if (nestedParensBraces_CfSdlv = nestedParensBraces_CfSdlv.slice(0, -1), currentBuffer_qqZqHB.length > 0)
          if (64 === currentBuffer_qqZqHB.charCodeAt(0))
          node_vgEdVm = parseCSSAtRule_GJCwde(currentBuffer_qqZqHB), currentRule_UqnIzk ? currentRule_UqnIzk.nodes.push(node_vgEdVm) : astNodes_ieYEip.push(node_vgEdVm), currentBuffer_qqZqHB = "", node_vgEdVm = null;else
          {
            let colonIndex_baAVPe = currentBuffer_qqZqHB.indexOf(":");
            if (currentRule_UqnIzk) {
              let declaration_BcKbNO = parseCSSDeclaration_usrKpx(currentBuffer_qqZqHB, colonIndex_baAVPe);
              if (!declaration_BcKbNO) throw new Error(`Invalid declaration: \`${currentBuffer_qqZqHB.trim()}\``);
              currentRule_UqnIzk.nodes.push(declaration_BcKbNO);
            }
          }
          let parentRule_ewhXKu = ruleStack_bvTCok.pop() ?? null;
          null === parentRule_ewhXKu && currentRule_UqnIzk && astNodes_ieYEip.push(currentRule_UqnIzk), currentRule_UqnIzk = parentRule_ewhXKu, currentBuffer_qqZqHB = "", node_vgEdVm = null;
        } else if (40 === code_TzTLld) nestedParensBraces_CfSdlv += ")", currentBuffer_qqZqHB += "(";else
        if (41 === code_TzTLld) {
          if (")" !== nestedParensBraces_CfSdlv[nestedParensBraces_CfSdlv.length - 1]) throw new Error("Missing opening (");
          nestedParensBraces_CfSdlv = nestedParensBraces_CfSdlv.slice(0, -1), currentBuffer_qqZqHB += ")";
        } else {
          if (0 === currentBuffer_qqZqHB.length && (32 === code_TzTLld || code_TzTLld === NEWLINE_CHARCODE_btAXDi || 9 === code_TzTLld)) continue;
          currentBuffer_qqZqHB += String.fromCharCode(code_TzTLld);
        }
      }
    }
    if (64 === currentBuffer_qqZqHB.charCodeAt(0) && astNodes_ieYEip.push(parseCSSAtRule_GJCwde(currentBuffer_qqZqHB)), nestedParensBraces_CfSdlv.length > 0 && currentRule_UqnIzk) {
      if ("rule" === currentRule_UqnIzk.kind)
      throw new Error(`Missing closing } at ${currentRule_UqnIzk.selector}`);
      if ("at-rule" === currentRule_UqnIzk.kind)
      throw new Error(`Missing closing } at ${currentRule_UqnIzk.name} ${currentRule_UqnIzk.params}`);
    }
    return astComments_iWQWnM.length > 0 ? astComments_iWQWnM.concat(astNodes_ieYEip) : astNodes_ieYEip;
  }
  function parseCSSAtRule_GJCwde(atRuleText_RHzmdO, paramList_xxsJth = []) {
    for (let i_nOCfnM = 5; i_nOCfnM < atRuleText_RHzmdO.length; i_nOCfnM++) {
      let code_PPepws = atRuleText_RHzmdO.charCodeAt(i_nOCfnM);
      if (32 === code_PPepws || 40 === code_PPepws) {
        return processAtRule_lWgxgY(atRuleText_RHzmdO.slice(0, i_nOCfnM).trim(), atRuleText_RHzmdO.slice(i_nOCfnM).trim(), paramList_xxsJth);
      }
    }
    return processAtRule_lWgxgY(atRuleText_RHzmdO.trim(), "", paramList_xxsJth);
  }
  function parseCSSDeclaration_usrKpx(declarationText_PqpZVx, colonIndex_pqMqjM = declarationText_PqpZVx.indexOf(":")) {
    if (-1 === colonIndex_pqMqjM) return null;
    let importantIndex_WvaARx = declarationText_PqpZVx.indexOf("!important", colonIndex_pqMqjM + 1);
    return makeDeclarationNode_xYlaTt(
      declarationText_PqpZVx.slice(0, colonIndex_pqMqjM).trim(),
      declarationText_PqpZVx.slice(colonIndex_pqMqjM + 1, -1 === importantIndex_WvaARx ? declarationText_PqpZVx.length : importantIndex_WvaARx).trim(),
      -1 !== importantIndex_WvaARx
    );
  }
  function cssEscape_aDBdYz(ident_JtmaOd) {
    if (0 === arguments.length)
    throw new TypeError("`CSS.escape` requires an argument.");
    let code_ATTjGW,
      value_NxnrzV = String(ident_JtmaOd),
      len_SFdDDp = value_NxnrzV.length,
      i_BKCjmd = -1,
      output_BbsBrI = "",
      firstCode_qNAYmf = value_NxnrzV.charCodeAt(0);
    if (1 === len_SFdDDp && 45 === firstCode_qNAYmf) return "\\" + value_NxnrzV;
    for (; ++i_BKCjmd < len_SFdDDp;)
    code_ATTjGW = value_NxnrzV.charCodeAt(i_BKCjmd),
    output_BbsBrI +=
    0 !== code_ATTjGW ?
    code_ATTjGW >= 1 && code_ATTjGW <= 31 ||
    127 === code_ATTjGW ||
    0 === i_BKCjmd && code_ATTjGW >= 48 && code_ATTjGW <= 57 ||
    1 === i_BKCjmd && code_ATTjGW >= 48 && code_ATTjGW <= 57 && 45 === firstCode_qNAYmf ?
    "\\" + code_ATTjGW.toString(16) + " " :
    code_ATTjGW >= 128 ||
    45 === code_ATTjGW ||
    95 === code_ATTjGW ||
    code_ATTjGW >= 48 && code_ATTjGW <= 57 ||
    code_ATTjGW >= 65 && code_ATTjGW <= 90 ||
    code_ATTjGW >= 97 && code_ATTjGW <= 122 ?
    value_NxnrzV.charAt(i_BKCjmd) :
    "\\" + value_NxnrzV.charAt(i_BKCjmd) :
    "�";
    return output_BbsBrI;
  }
  function cssUnescape_MNuHwL(ident_AWTuco) {
    return ident_AWTuco.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g, (m_mDPZaN) =>
    m_mDPZaN.length > 2 ?
    String.fromCodePoint(Number.parseInt(m_mDPZaN.slice(1).trim(), 16)) :
    m_mDPZaN[1]
    );
  }
  var themeNamespaces_pEUOUy = new Map([
  ["--font", ["--font-weight", "--font-size"]],
  ["--inset", ["--inset-shadow", "--inset-ring"]],
  [
  "--text",
  [
  "--text-color",
  "--text-decoration-color",
  "--text-decoration-thickness",
  "--text-indent",
  "--text-shadow",
  "--text-underline-offset"]]]


  );
  function isThemeShorthand_KUhwJq(prop_xgogww, namespace_ReNpDd) {
    return (themeNamespaces_pEUOUy.get(namespace_ReNpDd) ?? []).some((shorthand_pFtMVn) => prop_xgogww === shorthand_pFtMVn || prop_xgogww.startsWith(`${shorthand_pFtMVn}-`));
  }
  var ThemeVariableMap_aqKABy = class {
      constructor(initialValues_rqNlQt = new Map(), initialKeyframes_MwqzUN = new Set([])) {
        this.values = initialValues_rqNlQt, this.keyframes = initialKeyframes_MwqzUN;
      }
      prefix = null;
      add(key_REATeN, value_KfcmLC, options_cxCPXp = 0) {
        if (key_REATeN.endsWith("-*")) {
          if ("initial" !== value_KfcmLC)
          throw new Error(
            `Invalid theme value \`${value_KfcmLC}\` for namespace \`${key_REATeN}\``
          );
          "--*" === key_REATeN ?
          this.values.clear() :
          this.clearNamespace(key_REATeN.slice(0, -2), 0);
        }
        if (4 & options_cxCPXp) {
          let existing_bsAITa = this.values.get(key_REATeN);
          if (existing_bsAITa && !(4 & existing_bsAITa.options)) return;
        }
        "initial" === value_KfcmLC ?
        this.values.delete(key_REATeN) :
        this.values.set(key_REATeN, { value: value_KfcmLC, options: options_cxCPXp });
      }
      keysInNamespaces(namespaces_zeFawQ) {
        let resultKeys_axptUR = [];
        for (let ns_nMJjja of namespaces_zeFawQ) {
          let nsPrefix_aAoqLX = `${ns_nMJjja}-`;
          for (let k_hJeFSE of this.values.keys())
          k_hJeFSE.startsWith(nsPrefix_aAoqLX) &&
          -1 === k_hJeFSE.indexOf("--", 2) && (
          isThemeShorthand_KUhwJq(k_hJeFSE, ns_nMJjja) || resultKeys_axptUR.push(k_hJeFSE.slice(nsPrefix_aAoqLX.length)));
        }
        return resultKeys_axptUR;
      }
      get(keys_nCAVxi) {
        for (let k_agtpcY of keys_nCAVxi) {
          let va_AsrziB = this.values.get(k_agtpcY);
          if (va_AsrziB) return va_AsrziB.value;
        }
        return null;
      }
      hasDefault(key_mBCLBN) {
        return !(4 & ~this.getOptions(key_mBCLBN));
      }
      getOptions(key_LXOEau) {
        return key_LXOEau = cssUnescape_MNuHwL(this.#unprefixKey_DdzOrh(key_LXOEau)), this.values.get(key_LXOEau)?.options ?? 0;
      }
      entries() {
        return this.prefix ?
        Array.from(this.values, (entry_ypleFI) => (entry_ypleFI[0] = this.prefixKey(entry_ypleFI[0]), entry_ypleFI)) :
        this.values.entries();
      }
      prefixKey(key_MYzhtq) {
        return this.prefix ? `--${this.prefix}-${key_MYzhtq.slice(2)}` : key_MYzhtq;
      }
      #unprefixKey_DdzOrh(keyWithoutPrefix_DVUYMG) {
        return this.prefix ? `--${keyWithoutPrefix_DVUYMG.slice(3 + this.prefix.length)}` : keyWithoutPrefix_DVUYMG;
      }
      clearNamespace(ns_smrupj, options_ObCFDA) {
        let excludes_XcIHyB = themeNamespaces_pEUOUy.get(ns_smrupj) ?? [];
        e: for (let k_sfpBzj of this.values.keys())
        if (k_sfpBzj.startsWith(ns_smrupj)) {
          if (0 !== options_ObCFDA && (this.getOptions(k_sfpBzj) & options_ObCFDA) !== options_ObCFDA) continue;
          for (let exclude_lJmSVv of excludes_XcIHyB) if (k_sfpBzj.startsWith(exclude_lJmSVv)) continue e;
          this.values.delete(k_sfpBzj);
        }
      }
      #findVariableKey_pnKLhz(variant_TEtHML, pns_JCRIOz) {
        for (let ns_SMRsky of pns_JCRIOz) {
          let fullKey_GpThEm = null !== variant_TEtHML ? `${ns_SMRsky}-${variant_TEtHML}` : ns_SMRsky;
          if (!this.values.has(fullKey_GpThEm)) {
            if (null === variant_TEtHML || !variant_TEtHML.includes(".")) continue;
            if (fullKey_GpThEm = `${ns_SMRsky}-${variant_TEtHML.replaceAll(".", "_")}`, !this.values.has(fullKey_GpThEm))
            continue;
          }
          if (!isThemeShorthand_KUhwJq(fullKey_GpThEm, ns_SMRsky)) return fullKey_GpThEm;
        }
        return null;
      }
      #getVariableReference_fAXQgY(key_yaLzIK) {
        let item_KRCZHN = this.values.get(key_yaLzIK);
        if (!item_KRCZHN) return null;
        let fallback_LTLLUh = null;
        return (
          2 & item_KRCZHN.options && (fallback_LTLLUh = item_KRCZHN.value),
          `var(${cssEscape_aDBdYz(this.prefixKey(key_yaLzIK))}${fallback_LTLLUh ? `, ${fallback_LTLLUh}` : ""})`);

      }
      markUsedVariable(k_EOrsoj) {
        let unprefixedKey_APcfmC = cssUnescape_MNuHwL(this.#unprefixKey_DdzOrh(k_EOrsoj)),
          item_uXesVt = this.values.get(unprefixedKey_APcfmC);
        if (!item_uXesVt) return !1;
        let wasMarkedUsed_NzWAHF = 16 & item_uXesVt.options;
        return item_uXesVt.options |= 16, !wasMarkedUsed_NzWAHF;
      }
      resolve(variant_dILLrP, namespaces_PkdxDw, flags_IMBYrL = 0) {
        let key_uUNOwU = this.#findVariableKey_pnKLhz(variant_dILLrP, namespaces_PkdxDw);
        if (!key_uUNOwU) return null;
        let item_jMFEda = this.values.get(key_uUNOwU);
        return 1 & (flags_IMBYrL | item_jMFEda.options) ? item_jMFEda.value : this.#getVariableReference_fAXQgY(key_uUNOwU);
      }
      resolveValue(variant_YVvOSs, namespaces_noUzPT) {
        let key_RFowHV = this.#findVariableKey_pnKLhz(variant_YVvOSs, namespaces_noUzPT);
        return key_RFowHV ? this.values.get(key_RFowHV).value : null;
      }
      resolveWith(variant_IPllCS, namespaces_LqcaAQ, suffixes_ICFgFf = []) {
        let resolvedKey_LNVbAV = this.#findVariableKey_pnKLhz(variant_IPllCS, namespaces_LqcaAQ);
        if (!resolvedKey_LNVbAV) return null;
        let suffixMap_oUOwIx = {};
        for (let suffix_poexqg of suffixes_ICFgFf) {
          let candidateKey_VrmuRU = `${resolvedKey_LNVbAV}${suffix_poexqg}`,
            suffixVariable_poFcBw = this.values.get(candidateKey_VrmuRU);
          suffixVariable_poFcBw && (1 & suffixVariable_poFcBw.options ? suffixMap_oUOwIx[suffix_poexqg] = suffixVariable_poFcBw.value : suffixMap_oUOwIx[suffix_poexqg] = this.#getVariableReference_fAXQgY(candidateKey_VrmuRU));
        }
        let variableEntry_RFpKqL = this.values.get(resolvedKey_LNVbAV);
        return 1 & variableEntry_RFpKqL.options ? [variableEntry_RFpKqL.value, suffixMap_oUOwIx] : [this.#getVariableReference_fAXQgY(resolvedKey_LNVbAV), suffixMap_oUOwIx];
      }
      namespace(namespaceName_vKAZWB) {
        let namespaceMap_vpMCqs = new Map(),
          namespacePrefix_wpURcP = `${namespaceName_vKAZWB}-`;
        for (let [fullKey_sfOTeL, entry_ifrgkT] of this.values)
        fullKey_sfOTeL === namespaceName_vKAZWB ?
        namespaceMap_vpMCqs.set(null, entry_ifrgkT.value) :
        fullKey_sfOTeL.startsWith(`${namespacePrefix_wpURcP}-`) ?
        namespaceMap_vpMCqs.set(fullKey_sfOTeL.slice(namespaceName_vKAZWB.length), entry_ifrgkT.value) :
        fullKey_sfOTeL.startsWith(namespacePrefix_wpURcP) && namespaceMap_vpMCqs.set(fullKey_sfOTeL.slice(namespacePrefix_wpURcP.length), entry_ifrgkT.value);
        return namespaceMap_vpMCqs;
      }
      addKeyframes(keyframeName_qPZjdc) {
        this.keyframes.add(keyframeName_qPZjdc);
      }
      getKeyframes() {
        return Array.from(this.keyframes);
      }
    },
    DefaultMap_bDuRsR = class extends Map {
      constructor(factoryFunction_hHnbPT) {
        super(), this.factory = factoryFunction_hHnbPT;
      }
      get(key_RAwkSi) {
        let value_TLzjbL = super.get(key_RAwkSi);
        return void 0 === value_TLzjbL && (value_TLzjbL = this.factory(key_RAwkSi, this), this.set(key_RAwkSi, value_TLzjbL)), value_TLzjbL;
      }
    };
  function makeWordNode_RTNhjY(value_eLGYBV) {
    return { kind: "word", value: value_eLGYBV };
  }
  function makeFunctionNode_nuZeFw(funcName_RAGTPo, nodes_HleIxV) {
    return { kind: "function", value: funcName_RAGTPo, nodes: nodes_HleIxV };
  }
  function makeSeparatorNode_vTNgdT(value_EnWxGz) {
    return { kind: "separator", value: value_EnWxGz };
  }
  function walkAST_roCHga(nodes_dnslHH, visitor_ABEDaN, parent_ykmQRr = null) {
    for (let i_wHFhpj = 0; i_wHFhpj < nodes_dnslHH.length; i_wHFhpj++) {
      let node_PqXVQg = nodes_dnslHH[i_wHFhpj],
        didReplace_lGGDAT = !1,
        addedCount_iMRyoW = 0,
        result_eTutOC =
        visitor_ABEDaN(node_PqXVQg, {
          parent: parent_ykmQRr,
          replaceWith(replacement_loNVIv) {
            didReplace_lGGDAT || (
            didReplace_lGGDAT = !0,
            Array.isArray(replacement_loNVIv) ?
            0 === replacement_loNVIv.length ? (
            nodes_dnslHH.splice(i_wHFhpj, 1), addedCount_iMRyoW = 0) :
            1 === replacement_loNVIv.length ? (
            nodes_dnslHH[i_wHFhpj] = replacement_loNVIv[0], addedCount_iMRyoW = 1) : (
            nodes_dnslHH.splice(i_wHFhpj, 1, ...replacement_loNVIv), addedCount_iMRyoW = replacement_loNVIv.length) :
            nodes_dnslHH[i_wHFhpj] = replacement_loNVIv);
          }
        }) ?? 0;
      if (didReplace_lGGDAT) 0 === result_eTutOC ? i_wHFhpj-- : i_wHFhpj += addedCount_iMRyoW - 1;else
      {
        if (2 === result_eTutOC) return 2;
        if (1 !== result_eTutOC && "function" === node_PqXVQg.kind && 2 === walkAST_roCHga(node_PqXVQg.nodes, visitor_ABEDaN, node_PqXVQg))
        return 2;
      }
    }
  }
  function stringifyAST_tQRzQG(nodes_AcCxGz) {
    let result_AWaBEN = "";
    for (let node_fvrnyO of nodes_AcCxGz)
    switch (node_fvrnyO.kind) {
      case "word":
      case "separator":
        result_AWaBEN += node_fvrnyO.value;
        break;
      case "function":
        result_AWaBEN += node_fvrnyO.value + "(" + stringifyAST_tQRzQG(node_fvrnyO.nodes) + ")";
    }
    return result_AWaBEN;
  }
  function parseAST_Gsbeng(input_XNKoSQ) {
    input_XNKoSQ = input_XNKoSQ.replaceAll("\r\n", "\n");
    let code_LOzBmW,
      astNodes_DEOQfn = [],
      parenStack_FEhneE = [],
      currentFunction_nISYvv = null,
      currentBuffer_rRosWE = "";
    for (let i_puXpQf = 0; i_puXpQf < input_XNKoSQ.length; i_puXpQf++) {
      let code_qPHiHR = input_XNKoSQ.charCodeAt(i_puXpQf);
      switch (code_qPHiHR) {
        case 92:
          currentBuffer_rRosWE += input_XNKoSQ[i_puXpQf] + input_XNKoSQ[i_puXpQf + 1], i_puXpQf++;
          break;
        case 58:
        case 44:
        case 61:
        case 62:
        case 60:
        case 10:
        case 47:
        case 32:
        case 9:{
            if (currentBuffer_rRosWE.length > 0) {
              let wordNode_GcbfLt = makeWordNode_RTNhjY(currentBuffer_rRosWE);
              currentFunction_nISYvv ? currentFunction_nISYvv.nodes.push(wordNode_GcbfLt) : astNodes_DEOQfn.push(wordNode_GcbfLt), currentBuffer_rRosWE = "";
            }
            let sepStart_nvnAXr = i_puXpQf,
              j_nMBRru = i_puXpQf + 1;
            for (;

            j_nMBRru < input_XNKoSQ.length && (
            code_LOzBmW = input_XNKoSQ.charCodeAt(j_nMBRru),
            58 === code_LOzBmW ||
            44 === code_LOzBmW ||
            61 === code_LOzBmW ||
            62 === code_LOzBmW ||
            60 === code_LOzBmW ||
            10 === code_LOzBmW ||
            47 === code_LOzBmW ||
            32 === code_LOzBmW ||
            9 === code_LOzBmW);
            j_nMBRru++)
            ;
            i_puXpQf = j_nMBRru - 1;
            let separatorNode_clwhSK = makeSeparatorNode_vTNgdT(input_XNKoSQ.slice(sepStart_nvnAXr, j_nMBRru));
            currentFunction_nISYvv ? currentFunction_nISYvv.nodes.push(separatorNode_clwhSK) : astNodes_DEOQfn.push(separatorNode_clwhSK);
            break;
          }
        case 39:
        case 34:{
            let stringStart_GCrURe = i_puXpQf;
            for (let j_VjFjYG = i_puXpQf + 1; j_VjFjYG < input_XNKoSQ.length; j_VjFjYG++)
            if (code_LOzBmW = input_XNKoSQ.charCodeAt(j_VjFjYG), 92 === code_LOzBmW) j_VjFjYG += 1;else
            if (code_LOzBmW === code_qPHiHR) {
              i_puXpQf = j_VjFjYG;
              break;
            }
            currentBuffer_rRosWE += input_XNKoSQ.slice(stringStart_GCrURe, i_puXpQf + 1);
            break;
          }
        case 40:{
            let funcNode_SbBbbw = makeFunctionNode_nuZeFw(currentBuffer_rRosWE, []);
            currentBuffer_rRosWE = "", currentFunction_nISYvv ? currentFunction_nISYvv.nodes.push(funcNode_SbBbbw) : astNodes_DEOQfn.push(funcNode_SbBbbw), parenStack_FEhneE.push(funcNode_SbBbbw), currentFunction_nISYvv = funcNode_SbBbbw;
            break;
          }
        case 41:{
            let funcNode_HnpvPH = parenStack_FEhneE.pop();
            if (currentBuffer_rRosWE.length > 0) {
              let wordNode_KUXTOz = makeWordNode_RTNhjY(currentBuffer_rRosWE);
              funcNode_HnpvPH.nodes.push(wordNode_KUXTOz), currentBuffer_rRosWE = "";
            }
            currentFunction_nISYvv = parenStack_FEhneE.length > 0 ? parenStack_FEhneE[parenStack_FEhneE.length - 1] : null;
            break;
          }
        default:
          currentBuffer_rRosWE += String.fromCharCode(code_qPHiHR);
      }
    }
    return currentBuffer_rRosWE.length > 0 && astNodes_DEOQfn.push(makeWordNode_RTNhjY(currentBuffer_rRosWE)), astNodes_DEOQfn;
  }
  function extractVarFunctions_UtccmO(input_xFFgqg) {
    let collectedVariables_svkmev = [];
    return (
      walkAST_roCHga(parseAST_Gsbeng(input_xFFgqg), (node_snLvsn) => {
        if ("function" === node_snLvsn.kind && "var" === node_snLvsn.value)
        return (
          walkAST_roCHga(node_snLvsn.nodes, (varNode_NbiVeF) => {
            "word" !== varNode_NbiVeF.kind ||
            "-" !== varNode_NbiVeF.value[0] ||
            "-" !== varNode_NbiVeF.value[1] ||
            collectedVariables_svkmev.push(varNode_NbiVeF.value);
          }),
          1);

      }),
      collectedVariables_svkmev);

  }
  var AT_CHARCODE_EkiEkg = 64;
  function makeRuleNode_PDClCj(selector_TPtqZf, nodes_cYzwpm = []) {
    return { kind: "rule", selector: selector_TPtqZf, nodes: nodes_cYzwpm };
  }
  function processAtRule_lWgxgY(name_nKvZja, params_MXotXL = "", nodes_BhWTLC = []) {
    return { kind: "at-rule", name: name_nKvZja, params: params_MXotXL, nodes: nodes_BhWTLC };
  }
  function parseCSSRule_QVgHxe(raw_cwIdsQ, nodes_aESpFj = []) {
    return raw_cwIdsQ.charCodeAt(0) === AT_CHARCODE_EkiEkg ? parseCSSAtRule_GJCwde(raw_cwIdsQ, nodes_aESpFj) : makeRuleNode_PDClCj(raw_cwIdsQ, nodes_aESpFj);
  }
  function makeDeclarationNode_xYlaTt(property_OHbYmb, value_WKYGRZ, important_HfVORP = !1) {
    return { kind: "declaration", property: property_OHbYmb, value: value_WKYGRZ, important: important_HfVORP };
  }
  function processComment_NLgzxN(comment_SPuwgh) {
    return { kind: "comment", value: comment_SPuwgh };
  }
  function makeContextNode_dEmkmt(contextObj_vjvjBl, nodes_EmTOaQ) {
    return { kind: "context", context: contextObj_vjvjBl, nodes: nodes_EmTOaQ };
  }
  function makeAtRootNode_uVreCe(nodes_IbVpvQ) {
    return { kind: "at-root", nodes: nodes_IbVpvQ };
  }
  function walkASTRecursive_YoBVFs(nodes_FwpKDO, visitor_nICnAE, path_sCxKvq = [], context_qzumre = {}) {
    for (let i_izrnMH = 0; i_izrnMH < nodes_FwpKDO.length; i_izrnMH++) {
      let node_fiGwce = nodes_FwpKDO[i_izrnMH],
        parentNode_gJMSxu = path_sCxKvq[path_sCxKvq.length - 1] ?? null;
      if ("context" === node_fiGwce.kind) {
        if (2 === walkASTRecursive_YoBVFs(node_fiGwce.nodes, visitor_nICnAE, path_sCxKvq, { ...context_qzumre, ...node_fiGwce.context })) return 2;
        continue;
      }
      path_sCxKvq.push(node_fiGwce);
      let didReplace_HpUNLT = !1,
        addedCount_bzeoaH = 0,
        result_jtcHXZ =
        visitor_nICnAE(node_fiGwce, {
          parent: parentNode_gJMSxu,
          context: context_qzumre,
          path: path_sCxKvq,
          replaceWith(replacement_MdlFsc) {
            didReplace_HpUNLT || (
            didReplace_HpUNLT = !0,
            Array.isArray(replacement_MdlFsc) ?
            0 === replacement_MdlFsc.length ? (
            nodes_FwpKDO.splice(i_izrnMH, 1), addedCount_bzeoaH = 0) :
            1 === replacement_MdlFsc.length ? (
            nodes_FwpKDO[i_izrnMH] = replacement_MdlFsc[0], addedCount_bzeoaH = 1) : (
            nodes_FwpKDO.splice(i_izrnMH, 1, ...replacement_MdlFsc), addedCount_bzeoaH = replacement_MdlFsc.length) : (
            nodes_FwpKDO[i_izrnMH] = replacement_MdlFsc, addedCount_bzeoaH = 1));
          }
        }) ?? 0;
      if (path_sCxKvq.pop(), didReplace_HpUNLT) 0 === result_jtcHXZ ? i_izrnMH-- : i_izrnMH += addedCount_bzeoaH - 1;else
      {
        if (2 === result_jtcHXZ) return 2;
        if (1 !== result_jtcHXZ && "nodes" in node_fiGwce) {
          path_sCxKvq.push(node_fiGwce);
          let childResult_PwtAxW = walkASTRecursive_YoBVFs(node_fiGwce.nodes, visitor_nICnAE, path_sCxKvq, context_qzumre);
          if (path_sCxKvq.pop(), 2 === childResult_PwtAxW) return 2;
        }
      }
    }
  }
  function walkFlatAST_ZsjfLR(nodes_DjjiKV, visitor_KsolDb, path_mCackx = [], context_XXsNdg = {}) {
    for (let i_hdhiTW = 0; i_hdhiTW < nodes_DjjiKV.length; i_hdhiTW++) {
      let node_xFIQJD = nodes_DjjiKV[i_hdhiTW],
        parent_ckNZcj = path_mCackx[path_mCackx.length - 1] ?? null;
      if ("rule" === node_xFIQJD.kind || "at-rule" === node_xFIQJD.kind)
      path_mCackx.push(node_xFIQJD), walkFlatAST_ZsjfLR(node_xFIQJD.nodes, visitor_KsolDb, path_mCackx, context_XXsNdg), path_mCackx.pop();else
      if ("context" === node_xFIQJD.kind) {
        walkFlatAST_ZsjfLR(node_xFIQJD.nodes, visitor_KsolDb, path_mCackx, { ...context_XXsNdg, ...node_xFIQJD.context });
        continue;
      }
      path_mCackx.push(node_xFIQJD),
      visitor_KsolDb(node_xFIQJD, {
        parent: parent_ckNZcj,
        context: context_XXsNdg,
        path: path_mCackx,
        replaceWith(replacement_mEUqSv) {
          Array.isArray(replacement_mEUqSv) ?
          0 === replacement_mEUqSv.length ?
          nodes_DjjiKV.splice(i_hdhiTW, 1) :
          1 === replacement_mEUqSv.length ?
          nodes_DjjiKV[i_hdhiTW] = replacement_mEUqSv[0] :
          nodes_DjjiKV.splice(i_hdhiTW, 1, ...replacement_mEUqSv) :
          nodes_DjjiKV[i_hdhiTW] = replacement_mEUqSv,
          i_hdhiTW += replacement_mEUqSv.length - 1;
        }
      }),
      path_mCackx.pop();
    }
  }
  function collectStyleData_TDFsgx(ast_sEvRhQ, theme_tnEOwH, flags_lfnVzD = 3) {
    let entries_VcZENN = [],
      seenProperties_sJnRdn = new Set(),
      themeDeclarationMap_Ckrpml = new DefaultMap_bDuRsR(() => new Set()),
      colorMixMap_ahtfza = new DefaultMap_bDuRsR(() => new Set()),
      seenKeyframes_OLaKyh = new Set(),
      usedKeyframes_NuPqCL = new Set(),
      keyframesDefs_MWXfOC = [],
      otherData_FCHZFF = [],
      varToPropertyMap_QQDMiu = new DefaultMap_bDuRsR(() => new Set());
    function collectWalker_hnHHYc(node_KUmcJf, resultArr_Zxruuz, context_JoFRXG = {}, depth_LczxPv = 0) {
      if ("declaration" === node_KUmcJf.kind) {
        if (
        "--tw-sort" === node_KUmcJf.property ||
        void 0 === node_KUmcJf.value ||
        null === node_KUmcJf.value)

        return;
        if (context_JoFRXG.theme && "-" === node_KUmcJf.property[0] && "-" === node_KUmcJf.property[1]) {
          if ("initial" === node_KUmcJf.value) return void (node_KUmcJf.value = void 0);
          context_JoFRXG.keyframes || themeDeclarationMap_Ckrpml.get(resultArr_Zxruuz).add(node_KUmcJf);
        }
        if (node_KUmcJf.value.includes("var("))
        if (context_JoFRXG.theme && "-" === node_KUmcJf.property[0] && "-" === node_KUmcJf.property[1])
        for (let depVar_asatrJ of extractVarFunctions_UtccmO(node_KUmcJf.value)) varToPropertyMap_QQDMiu.get(depVar_asatrJ).add(node_KUmcJf.property);else
        theme_tnEOwH.trackUsedVariables(node_KUmcJf.value);
        if ("animation" === node_KUmcJf.property) for (let animationName_jLZNex of parseAnimationNames_rtMhcS(node_KUmcJf.value)) usedKeyframes_NuPqCL.add(animationName_jLZNex);
        2 & flags_lfnVzD && node_KUmcJf.value.includes("color-mix(") && colorMixMap_ahtfza.get(resultArr_Zxruuz).add(node_KUmcJf), resultArr_Zxruuz.push(node_KUmcJf);
      } else if ("rule" === node_KUmcJf.kind) {
        if ("&" === node_KUmcJf.selector)
        for (let inlineRuleNode_oQVZgE of node_KUmcJf.nodes) {
          let inlineResults_LunhQw = [];
          collectWalker_hnHHYc(inlineRuleNode_oQVZgE, inlineResults_LunhQw, context_JoFRXG, depth_LczxPv + 1), inlineResults_LunhQw.length > 0 && resultArr_Zxruuz.push(...inlineResults_LunhQw);
        } else
        {
          let clonedRule_xoMQkS = { ...node_KUmcJf, nodes: [] };
          for (let subNode_dkkLcR of node_KUmcJf.nodes) collectWalker_hnHHYc(subNode_dkkLcR, clonedRule_xoMQkS.nodes, context_JoFRXG, depth_LczxPv + 1);
          clonedRule_xoMQkS.nodes.length > 0 && resultArr_Zxruuz.push(clonedRule_xoMQkS);
        }} else
      if ("at-rule" === node_KUmcJf.kind && "@property" === node_KUmcJf.name && 0 === depth_LczxPv) {
        if (seenProperties_sJnRdn.has(node_KUmcJf.params)) return;
        if (1 & flags_lfnVzD) {
          let propName_xNTrNW = node_KUmcJf.params,
            initialValue_SbtSrU = null,
            inheritsFlag_yonfcS = !1;
          for (let childNode_ZTLxjJ of node_KUmcJf.nodes)
          "declaration" === childNode_ZTLxjJ.kind && (
          "initial-value" === childNode_ZTLxjJ.property ?
          initialValue_SbtSrU = childNode_ZTLxjJ.value :
          "inherits" === childNode_ZTLxjJ.property && (inheritsFlag_yonfcS = "true" === childNode_ZTLxjJ.value));
          inheritsFlag_yonfcS ? keyframesDefs_MWXfOC.push(makeDeclarationNode_xYlaTt(propName_xNTrNW, initialValue_SbtSrU ?? "initial")) : otherData_FCHZFF.push(makeDeclarationNode_xYlaTt(propName_xNTrNW, initialValue_SbtSrU ?? "initial"));
        }
        seenProperties_sJnRdn.add(node_KUmcJf.params);
        let clonedAtProperty_lFHsDC = { ...node_KUmcJf, nodes: [] };
        for (let childNode_qlVmNo of node_KUmcJf.nodes) collectWalker_hnHHYc(childNode_qlVmNo, clonedAtProperty_lFHsDC.nodes, context_JoFRXG, depth_LczxPv + 1);
        resultArr_Zxruuz.push(clonedAtProperty_lFHsDC);
      } else if ("at-rule" === node_KUmcJf.kind) {
        "@keyframes" === node_KUmcJf.name && (context_JoFRXG = { ...context_JoFRXG, keyframes: !0 });
        let clonedAtRule_PUfydj = { ...node_KUmcJf, nodes: [] };
        for (let childNode_McniDF of node_KUmcJf.nodes) collectWalker_hnHHYc(childNode_McniDF, clonedAtRule_PUfydj.nodes, context_JoFRXG, depth_LczxPv + 1);
        "@keyframes" === node_KUmcJf.name && context_JoFRXG.theme && seenKeyframes_OLaKyh.add(clonedAtRule_PUfydj),
        (clonedAtRule_PUfydj.nodes.length > 0 ||
        "@layer" === clonedAtRule_PUfydj.name ||
        "@charset" === clonedAtRule_PUfydj.name ||
        "@custom-media" === clonedAtRule_PUfydj.name ||
        "@namespace" === clonedAtRule_PUfydj.name ||
        "@import" === clonedAtRule_PUfydj.name) &&
        resultArr_Zxruuz.push(clonedAtRule_PUfydj);
      } else if ("at-root" === node_KUmcJf.kind)
      for (let childNode_VtJOwr of node_KUmcJf.nodes) {
        let results_vnUoVt = [];
        collectWalker_hnHHYc(childNode_VtJOwr, results_vnUoVt, context_JoFRXG, 0);
        for (let item_KeepWy of results_vnUoVt) entries_VcZENN.push(item_KeepWy);
      } else
      if ("context" === node_KUmcJf.kind) {
        if (node_KUmcJf.context.reference) return;
        for (let childNode_khoUyd of node_KUmcJf.nodes) collectWalker_hnHHYc(childNode_khoUyd, resultArr_Zxruuz, { ...context_JoFRXG, ...node_KUmcJf.context }, depth_LczxPv);
      } else "comment" === node_KUmcJf.kind && resultArr_Zxruuz.push(node_KUmcJf);
    }
    let mainNodes_McWhwS = [];
    for (let astNode_dGDusf of ast_sEvRhQ) collectWalker_hnHHYc(astNode_dGDusf, mainNodes_McWhwS, {}, 0);
    e: for (let [ruleNodes_KpuIFJ, declarationsSet_UrpaqC] of themeDeclarationMap_Ckrpml)
    for (let declNode_bLDIVB of declarationsSet_UrpaqC) {
      if (isThemeCascadeResolved_FkFdlS(declNode_bLDIVB.property, theme_tnEOwH.theme, varToPropertyMap_QQDMiu)) {
        if (declNode_bLDIVB.property.startsWith(theme_tnEOwH.theme.prefixKey("--animate-")))
        for (let animName_BZxhfO of parseAnimationNames_rtMhcS(declNode_bLDIVB.value)) usedKeyframes_NuPqCL.add(animName_BZxhfO);
        continue;
      }
      let declIdx_BlfnWV = ruleNodes_KpuIFJ.indexOf(declNode_bLDIVB);
      if (ruleNodes_KpuIFJ.splice(declIdx_BlfnWV, 1), 0 === ruleNodes_KpuIFJ.length) {
        let foundPath_CANDnU = findAstPath_suxZAh(mainNodes_McWhwS, (node_rrtbxp) => "rule" === node_rrtbxp.kind && node_rrtbxp.nodes === ruleNodes_KpuIFJ);
        if (!foundPath_CANDnU || 0 === foundPath_CANDnU.length) continue e;
        for (foundPath_CANDnU.unshift({ kind: "at-root", nodes: mainNodes_McWhwS });;) {
          let poppedNode_laADoH = foundPath_CANDnU.pop();
          if (!poppedNode_laADoH) break;
          let parentNode_ahUUQM = foundPath_CANDnU[foundPath_CANDnU.length - 1];
          if (!parentNode_ahUUQM || "at-root" !== parentNode_ahUUQM.kind && "at-rule" !== parentNode_ahUUQM.kind) break;
          let childIdx_Rtlvml = parentNode_ahUUQM.nodes.indexOf(poppedNode_laADoH);
          if (-1 === childIdx_Rtlvml) break;
          parentNode_ahUUQM.nodes.splice(childIdx_Rtlvml, 1);
        }
        continue e;
      }
    }
    for (let keyframeNode_npkakl of seenKeyframes_OLaKyh)
    if (!usedKeyframes_NuPqCL.has(keyframeNode_npkakl.params)) {
      let kfIdx_xHFXaI = entries_VcZENN.indexOf(keyframeNode_npkakl);
      entries_VcZENN.splice(kfIdx_xHFXaI, 1);
    }
    if (mainNodes_McWhwS = mainNodes_McWhwS.concat(entries_VcZENN), 2 & flags_lfnVzD)
    for (let [group_hByJXT, colorMixSet_CPDQji] of colorMixMap_ahtfza)
    for (let colorMixDecl_fexVdZ of colorMixSet_CPDQji) {
      let declIdx_TTWSWl = group_hByJXT.indexOf(colorMixDecl_fexVdZ);
      if (-1 === declIdx_TTWSWl || null == colorMixDecl_fexVdZ.value) continue;
      let ast_DKoagm = parseAST_Gsbeng(colorMixDecl_fexVdZ.value),
        needsTransform_OcMjHR = !1;
      if (
      walkAST_roCHga(ast_DKoagm, (astNode_gjayFh, { replaceWith: replaceWith_ekayRN }) => {
        if ("function" !== astNode_gjayFh.kind || "color-mix" !== astNode_gjayFh.value) return;
        let unresolvedVar_GXnRIz = !1,
          isCurrentColor_tOnSsH = !1;
        if (
        walkAST_roCHga(astNode_gjayFh.nodes, (child_ubpzTT, { replaceWith: replaceWith_HrMDqv }) => {
          if (
          "word" == child_ubpzTT.kind &&
          "currentcolor" === child_ubpzTT.value.toLowerCase())

          return isCurrentColor_tOnSsH = !0, void (needsTransform_OcMjHR = !0);
          let varFuncNode_bfggqv = child_ubpzTT,
            resolvedValue_FkKQCh = null,
            seenVarsSet_JLLwgh = new Set();
          do {
            if ("function" !== varFuncNode_bfggqv.kind || "var" !== varFuncNode_bfggqv.value) return;
            let firstNode_RPPmWa = varFuncNode_bfggqv.nodes[0];
            if (!firstNode_RPPmWa || "word" !== firstNode_RPPmWa.kind) return;
            let varName_XRZVjr = firstNode_RPPmWa.value;
            if (seenVarsSet_JLLwgh.has(varName_XRZVjr)) return void (unresolvedVar_GXnRIz = !0);
            if (
            seenVarsSet_JLLwgh.add(varName_XRZVjr),
            needsTransform_OcMjHR = !0,
            resolvedValue_FkKQCh = theme_tnEOwH.theme.resolveValue(null, [firstNode_RPPmWa.value]),
            !resolvedValue_FkKQCh)

            return void (unresolvedVar_GXnRIz = !0);
            if ("currentcolor" === resolvedValue_FkKQCh.toLowerCase())
            return void (isCurrentColor_tOnSsH = !0);
            varFuncNode_bfggqv = resolvedValue_FkKQCh.startsWith("var(") ? parseAST_Gsbeng(resolvedValue_FkKQCh)[0] : null;
          } while (varFuncNode_bfggqv);
          replaceWith_HrMDqv({ kind: "word", value: resolvedValue_FkKQCh });
        }),
        unresolvedVar_GXnRIz || isCurrentColor_tOnSsH)
        {
          let sepIdx_KgCPft = astNode_gjayFh.nodes.findIndex(
            (n_uEjuWn) => "separator" === n_uEjuWn.kind && n_uEjuWn.value.trim().includes(",")
          );
          if (-1 === sepIdx_KgCPft) return;
          let rightSide_bZhtBZ = astNode_gjayFh.nodes.length > sepIdx_KgCPft ? astNode_gjayFh.nodes[sepIdx_KgCPft + 1] : null;
          if (!rightSide_bZhtBZ) return;
          replaceWith_ekayRN(rightSide_bZhtBZ);
        } else if (needsTransform_OcMjHR) {
          let colorspaceNode_BTKQZP = astNode_gjayFh.nodes[2];
          "word" === colorspaceNode_BTKQZP.kind && (
          "oklab" === colorspaceNode_BTKQZP.value ||
          "oklch" === colorspaceNode_BTKQZP.value ||
          "lab" === colorspaceNode_BTKQZP.value ||
          "lch" === colorspaceNode_BTKQZP.value) && (
          colorspaceNode_BTKQZP.value = "srgb");
        }
      }),
      !needsTransform_OcMjHR)

      continue;
      let newDecl_RhMcha = { ...colorMixDecl_fexVdZ, value: stringifyAST_tQRzQG(ast_DKoagm) },
        supportsNode_YvZHtB = parseCSSRule_QVgHxe("@supports (color: color-mix(in lab, red, red))", [colorMixDecl_fexVdZ]);
      group_hByJXT.splice(declIdx_TTWSWl, 1, newDecl_RhMcha, supportsNode_YvZHtB);
    }
    if (1 & flags_lfnVzD) {
      let varPropsNodes_dqPBBE = [];
      if (
      keyframesDefs_MWXfOC.length > 0 && varPropsNodes_dqPBBE.push(parseCSSRule_QVgHxe(":root, :host", keyframesDefs_MWXfOC)),
      otherData_FCHZFF.length > 0 && varPropsNodes_dqPBBE.push(parseCSSRule_QVgHxe("*, ::before, ::after, ::backdrop", otherData_FCHZFF)),
      varPropsNodes_dqPBBE.length > 0)
      {
        let insertIndex_ByUVgl = mainNodes_McWhwS.findIndex(
          (node_BwoYGm) =>
          !(
          "comment" === node_BwoYGm.kind ||
          "at-rule" === node_BwoYGm.kind && (
          "@charset" === node_BwoYGm.name || "@import" === node_BwoYGm.name))

        );
        mainNodes_McWhwS.splice(insertIndex_ByUVgl < 0 ? mainNodes_McWhwS.length : insertIndex_ByUVgl, 0, processAtRule_lWgxgY("@layer", "properties", [])),
        mainNodes_McWhwS.push(
          parseCSSRule_QVgHxe("@layer properties", [
          processAtRule_lWgxgY(
            "@supports",
            "((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))",
            varPropsNodes_dqPBBE
          )]
          )
        );
      }
    }
    return mainNodes_McWhwS;
  }
  function astNodesToCss_kEgwyH(astNodes_EQjVgJ) {
    function astNodeToCss_PbpHVN(astNode_qDTOzq, indentLevel_OSnoQl = 0) {
      let cssResult_wlcxlo = "",
        currentIndent_zvqQxe = "  ".repeat(indentLevel_OSnoQl);
      if ("declaration" === astNode_qDTOzq.kind)
      cssResult_wlcxlo += `${currentIndent_zvqQxe}${astNode_qDTOzq.property}: ${astNode_qDTOzq.value}${astNode_qDTOzq.important ? " !important" : ""};\n`;else
      if ("rule" === astNode_qDTOzq.kind) {
        cssResult_wlcxlo += `${currentIndent_zvqQxe}${astNode_qDTOzq.selector} {\n`;
        for (let childNode_fGvLeJ of astNode_qDTOzq.nodes) cssResult_wlcxlo += astNodeToCss_PbpHVN(childNode_fGvLeJ, indentLevel_OSnoQl + 1);
        cssResult_wlcxlo += `${currentIndent_zvqQxe}}\n`;
      } else if ("at-rule" === astNode_qDTOzq.kind) {
        if (0 === astNode_qDTOzq.nodes.length) return `${currentIndent_zvqQxe}${astNode_qDTOzq.name} ${astNode_qDTOzq.params};\n`;
        cssResult_wlcxlo += `${currentIndent_zvqQxe}${astNode_qDTOzq.name}${astNode_qDTOzq.params ? ` ${astNode_qDTOzq.params} ` : " "}{\n`;
        for (let atRuleChild_NMDdvz of astNode_qDTOzq.nodes) cssResult_wlcxlo += astNodeToCss_PbpHVN(atRuleChild_NMDdvz, indentLevel_OSnoQl + 1);
        cssResult_wlcxlo += `${currentIndent_zvqQxe}}\n`;
      } else if ("comment" === astNode_qDTOzq.kind) cssResult_wlcxlo += `${currentIndent_zvqQxe}/*${astNode_qDTOzq.value}*/\n`;else
      if ("context" === astNode_qDTOzq.kind || "at-root" === astNode_qDTOzq.kind) return "";
      return cssResult_wlcxlo;
    }
    let finalCss_slEupx = "";
    for (let topLevelNode_glCNJg of astNodes_EQjVgJ) {
      let cssChunk_obWEgM = astNodeToCss_PbpHVN(topLevelNode_glCNJg);
      "" !== cssChunk_obWEgM && (finalCss_slEupx += cssChunk_obWEgM);
    }
    return finalCss_slEupx;
  }
  function findAstPath_suxZAh(nodeList_FJCwst, predicate_dcjEfV) {
    let foundPath_XOlCth = [];
    return (
      walkASTRecursive_YoBVFs(nodeList_FJCwst, (currentNode_BiSsUE, { path: path_VYPgIo }) => {
        if (predicate_dcjEfV(currentNode_BiSsUE)) return foundPath_XOlCth = [...path_VYPgIo], 2;
      }),
      foundPath_XOlCth);

  }
  function isThemeCascadeResolved_FkFdlS(property_gwZBOr, theme_crTZHZ, varToPropertyMap_tZPpKe, visited_qhqhrg = new Set()) {
    if (visited_qhqhrg.has(property_gwZBOr) || (visited_qhqhrg.add(property_gwZBOr), 24 & theme_crTZHZ.getOptions(property_gwZBOr))) return !0;
    {
      let dependentVars_OVVlHL = varToPropertyMap_tZPpKe.get(property_gwZBOr) ?? [];
      for (let dependentVar_shGfhb of dependentVars_OVVlHL) if (isThemeCascadeResolved_FkFdlS(dependentVar_shGfhb, theme_crTZHZ, varToPropertyMap_tZPpKe, visited_qhqhrg)) return !0;
    }
    return !1;
  }
  function parseAnimationNames_rtMhcS(animationString_KJQmcM) {
    return animationString_KJQmcM.split(/[\s,]+/);
  }
  var cssMathFunctions_sCsYXr = [
    "calc",
    "min",
    "max",
    "clamp",
    "mod",
    "rem",
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
    "atan2",
    "pow",
    "sqrt",
    "hypot",
    "log",
    "exp",
    "round"],

    specialFunctionNames_FSfjkZ = ["anchor-size"],
    specialFunctionRegexp_WCRMHU = new RegExp(`(${specialFunctionNames_FSfjkZ.join("|")})\\(`, "g");
  function containsMathFunction_mItKgu(input_EEUbwI) {
    return -1 !== input_EEUbwI.indexOf("(") && cssMathFunctions_sCsYXr.some((mathFuncName_DLsrVc) => input_EEUbwI.includes(`${mathFuncName_DLsrVc}(`));
  }
  function fixFunctionSpacing_FixkVT(expr_NceZOM) {
    if (-1 === expr_NceZOM.indexOf("(")) return replaceEscapedUnderscores_hNpNFS(expr_NceZOM);
    let ast_OKcYjT = parseAST_Gsbeng(expr_NceZOM);
    return (
      fixFunctionNames_nCCiYh(ast_OKcYjT),
      expr_NceZOM = function (exprString_tLoPoK) {
        if (!cssMathFunctions_sCsYXr.some((mathFunc_ALhGCJ) => exprString_tLoPoK.includes(mathFunc_ALhGCJ))) return exprString_tLoPoK;
        let hasSpecialFunction_dkAWTw = !1;
        specialFunctionNames_FSfjkZ.some((specialFunc_mciYBP) => exprString_tLoPoK.includes(specialFunc_mciYBP)) && (
        specialFunctionRegexp_WCRMHU.lastIndex = 0,
        exprString_tLoPoK = exprString_tLoPoK.replace(specialFunctionRegexp_WCRMHU, (matched_yhZLbR, funcName_YbzqJb) => (hasSpecialFunction_dkAWTw = !0, `$${specialFunctionNames_FSfjkZ.indexOf(funcName_YbzqJb)}$(`)));
        let fixed_jrSSCr = "",
          parenStack_wUMGHT = [];
        for (let i_RuBoTR = 0; i_RuBoTR < exprString_tLoPoK.length; i_RuBoTR++) {
          let char_xPfXZl = exprString_tLoPoK[i_RuBoTR];
          if ("(" !== char_xPfXZl) {
            if (")" === char_xPfXZl) fixed_jrSSCr += char_xPfXZl, parenStack_wUMGHT.shift();else
            {
              if ("," === char_xPfXZl && parenStack_wUMGHT[0]) {
                fixed_jrSSCr += ", ";
                continue;
              }
              if (" " === char_xPfXZl && parenStack_wUMGHT[0] && " " === fixed_jrSSCr[fixed_jrSSCr.length - 1]) continue;
              if ("+" !== char_xPfXZl && "*" !== char_xPfXZl && "/" !== char_xPfXZl && "-" !== char_xPfXZl || !parenStack_wUMGHT[0]) {
                if (parenStack_wUMGHT[0] && exprString_tLoPoK.startsWith("to-zero", i_RuBoTR)) {
                  let startIndex_BZSeef = i_RuBoTR;
                  i_RuBoTR += 7, fixed_jrSSCr += exprString_tLoPoK.slice(startIndex_BZSeef, i_RuBoTR + 1);
                } else fixed_jrSSCr += char_xPfXZl;} else
              {
                let fixedBeforeOp_PoKChe = fixed_jrSSCr.trimEnd(),
                  lastChar_tQhhuo = fixedBeforeOp_PoKChe[fixedBeforeOp_PoKChe.length - 1];
                if ("+" === lastChar_tQhhuo || "*" === lastChar_tQhhuo || "/" === lastChar_tQhhuo || "-" === lastChar_tQhhuo) {
                  fixed_jrSSCr += char_xPfXZl;
                  continue;
                }
                if ("(" === lastChar_tQhhuo || "," === lastChar_tQhhuo) {
                  fixed_jrSSCr += char_xPfXZl;
                  continue;
                }
                " " === exprString_tLoPoK[i_RuBoTR - 1] ? fixed_jrSSCr += `${char_xPfXZl} ` : fixed_jrSSCr += ` ${char_xPfXZl} `;
              }
            }} else
          {
            fixed_jrSSCr += char_xPfXZl;
            let funcBegin_zuxvUX = i_RuBoTR;
            for (let j_zesUlB = i_RuBoTR - 1; j_zesUlB >= 0; j_zesUlB--) {
              let charCode_eREbTv = exprString_tLoPoK.charCodeAt(j_zesUlB);
              if (charCode_eREbTv >= 48 && charCode_eREbTv <= 57) funcBegin_zuxvUX = j_zesUlB;else
              {
                if (!(charCode_eREbTv >= 97 && charCode_eREbTv <= 122)) break;
                funcBegin_zuxvUX = j_zesUlB;
              }
            }
            let funcMatch_mYnkdg = exprString_tLoPoK.slice(funcBegin_zuxvUX, i_RuBoTR);
            if (cssMathFunctions_sCsYXr.includes(funcMatch_mYnkdg)) {
              parenStack_wUMGHT.unshift(!0);
              continue;
            }
            if (parenStack_wUMGHT[0] && "" === funcMatch_mYnkdg) {
              parenStack_wUMGHT.unshift(!0);
              continue;
            }
            parenStack_wUMGHT.unshift(!1);
          }
        }
        return hasSpecialFunction_dkAWTw ? fixed_jrSSCr.replace(/\$(\d+)\$/g, (dollarMatch_KKTjRw, index_YhjCMm) => specialFunctionNames_FSfjkZ[index_YhjCMm] ?? dollarMatch_KKTjRw) : fixed_jrSSCr;
      }(expr_NceZOM = stringifyAST_tQRzQG(ast_OKcYjT)),
      expr_NceZOM);

  }
  function replaceEscapedUnderscores_hNpNFS(inputString_viNKNk, replaceAll_buTiPI = !1) {
    let result_ajJIwc = "";
    for (let i_qNbuNj = 0; i_qNbuNj < inputString_viNKNk.length; i_qNbuNj++) {
      let c_UTbhnH = inputString_viNKNk[i_qNbuNj];
      "\\" === c_UTbhnH && "_" === inputString_viNKNk[i_qNbuNj + 1] ? (
      result_ajJIwc += "_", i_qNbuNj += 1) :
      result_ajJIwc += "_" !== c_UTbhnH || replaceAll_buTiPI ? c_UTbhnH : " ";
    }
    return result_ajJIwc;
  }
  function fixFunctionNames_nCCiYh(nodeList_UizwCp) {
    for (let node_jpitWQ of nodeList_UizwCp)
    switch (node_jpitWQ.kind) {
      case "function":
        if ("url" === node_jpitWQ.value || node_jpitWQ.value.endsWith("_url")) {
          node_jpitWQ.value = replaceEscapedUnderscores_hNpNFS(node_jpitWQ.value);
          break;
        }
        if (
        "var" === node_jpitWQ.value ||
        node_jpitWQ.value.endsWith("_var") ||
        "theme" === node_jpitWQ.value ||
        node_jpitWQ.value.endsWith("_theme"))
        {
          node_jpitWQ.value = replaceEscapedUnderscores_hNpNFS(node_jpitWQ.value);
          for (let i_XpdJaK = 0; i_XpdJaK < node_jpitWQ.nodes.length; i_XpdJaK++)
          0 != i_XpdJaK || "word" !== node_jpitWQ.nodes[i_XpdJaK].kind ?
          fixFunctionNames_nCCiYh([node_jpitWQ.nodes[i_XpdJaK]]) :
          node_jpitWQ.nodes[i_XpdJaK].value = replaceEscapedUnderscores_hNpNFS(node_jpitWQ.nodes[i_XpdJaK].value, !0);
          break;
        }
        node_jpitWQ.value = replaceEscapedUnderscores_hNpNFS(node_jpitWQ.value), fixFunctionNames_nCCiYh(node_jpitWQ.nodes);
        break;
      case "separator":
      case "word":
        node_jpitWQ.value = replaceEscapedUnderscores_hNpNFS(node_jpitWQ.value);
        break;
      default:
        throwUnexpectedNode_oIFBEP(node_jpitWQ);
    }
  }
  function throwUnexpectedNode_oIFBEP(node_ccfhRj) {
    throw new Error(`Unexpected value: ${node_ccfhRj}`);
  }
  var parenStack_XAKgDM = new Uint8Array(256);
  function checkBracketsBalanced_ewuhFR(str_rFHlZm) {
    let parenCount_eiMtng = 0,
      len_JQttBF = str_rFHlZm.length;
    for (let i_AKJDOV = 0; i_AKJDOV < len_JQttBF; i_AKJDOV++) {
      let ch_msmZzX = str_rFHlZm.charCodeAt(i_AKJDOV);
      switch (ch_msmZzX) {
        case 92:
          i_AKJDOV += 1;
          break;
        case 39:
        case 34:
          for (; ++i_AKJDOV < len_JQttBF;) {
            let qch_JIadeo = str_rFHlZm.charCodeAt(i_AKJDOV);
            if (92 !== qch_JIadeo) {
              if (qch_JIadeo === ch_msmZzX) break;
            } else i_AKJDOV += 1;
          }
          break;
        case 40:
          parenStack_XAKgDM[parenCount_eiMtng] = 41, parenCount_eiMtng++;
          break;
        case 91:
          parenStack_XAKgDM[parenCount_eiMtng] = 93, parenCount_eiMtng++;
          break;
        case 123:
          break;
        case 93:
        case 125:
        case 41:
          if (0 === parenCount_eiMtng) return !1;
          parenCount_eiMtng > 0 && ch_msmZzX === parenStack_XAKgDM[parenCount_eiMtng - 1] && parenCount_eiMtng--;
          break;
        case 59:
          if (0 === parenCount_eiMtng) return !1;
      }
    }
    return !0;
  }
  var bracketStack_ahIfJA = new Uint8Array(256);
  function splitOnTopLevel_EfBwUv(input_sDRmPc, sep_FQhMeR) {
    let stackIdx_HZOlWw = 0,
      result_JCnryM = [],
      lastPos_WLJOWt = 0,
      len_LzlwDH = input_sDRmPc.length,
      sepCode_dexwvj = sep_FQhMeR.charCodeAt(0);
    for (let i_acABhO = 0; i_acABhO < len_LzlwDH; i_acABhO++) {
      let ch_xnBvOc = input_sDRmPc.charCodeAt(i_acABhO);
      if (0 !== stackIdx_HZOlWw || ch_xnBvOc !== sepCode_dexwvj)
      switch (ch_xnBvOc) {
        case 92:
          i_acABhO += 1;
          break;
        case 39:
        case 34:
          for (; ++i_acABhO < len_LzlwDH;) {
            let qch_qOJNMo = input_sDRmPc.charCodeAt(i_acABhO);
            if (92 !== qch_qOJNMo) {
              if (qch_qOJNMo === ch_xnBvOc) break;
            } else i_acABhO += 1;
          }
          break;
        case 40:
          bracketStack_ahIfJA[stackIdx_HZOlWw] = 41, stackIdx_HZOlWw++;
          break;
        case 91:
          bracketStack_ahIfJA[stackIdx_HZOlWw] = 93, stackIdx_HZOlWw++;
          break;
        case 123:
          bracketStack_ahIfJA[stackIdx_HZOlWw] = 125, stackIdx_HZOlWw++;
          break;
        case 93:
        case 125:
        case 41:
          stackIdx_HZOlWw > 0 && ch_xnBvOc === bracketStack_ahIfJA[stackIdx_HZOlWw - 1] && stackIdx_HZOlWw--;
      } else
      result_JCnryM.push(input_sDRmPc.slice(lastPos_WLJOWt, i_acABhO)), lastPos_WLJOWt = i_acABhO + 1;
    }
    return result_JCnryM.push(input_sDRmPc.slice(lastPos_WLJOWt)), result_JCnryM;
  }
  function parseArbitraryValue_XsMbou(s_zGFdGD) {
    if ("[" === s_zGFdGD[0] && "]" === s_zGFdGD[s_zGFdGD.length - 1]) {
      let fixedContent_diLBRP = fixFunctionSpacing_FixkVT(s_zGFdGD.slice(1, -1));
      return checkBracketsBalanced_ewuhFR(fixedContent_diLBRP) && 0 !== fixedContent_diLBRP.length && 0 !== fixedContent_diLBRP.trim().length ?
      { kind: "arbitrary", value: fixedContent_diLBRP } :
      null;
    }
    if ("(" === s_zGFdGD[0] && ")" === s_zGFdGD[s_zGFdGD.length - 1]) {
      let fixedVar_KTRnaO = fixFunctionSpacing_FixkVT(s_zGFdGD.slice(1, -1));
      return !checkBracketsBalanced_ewuhFR(fixedVar_KTRnaO) ||
      0 === fixedVar_KTRnaO.length ||
      0 === fixedVar_KTRnaO.trim().length ||
      "-" !== fixedVar_KTRnaO[0] && "-" !== fixedVar_KTRnaO[1] ?
      null :
      { kind: "arbitrary", value: `var(${fixedVar_KTRnaO})` };
    }
    return { kind: "named", value: s_zGFdGD };
  }
  function* yieldDashSplits_LQETCA(name_UopZPS, testFn_LHjaUP) {
    testFn_LHjaUP(name_UopZPS) && (yield [name_UopZPS, null]);
    let dashIdx_BkcgHU = name_UopZPS.lastIndexOf("-");
    for (; dashIdx_BkcgHU > 0;) {
      let prefix_ILZOiO = name_UopZPS.slice(0, dashIdx_BkcgHU);
      if (testFn_LHjaUP(prefix_ILZOiO)) {
        let pair_cqHCBp = [prefix_ILZOiO, name_UopZPS.slice(dashIdx_BkcgHU + 1)];
        if ("" === pair_cqHCBp[1]) break;
        yield pair_cqHCBp;
      }
      dashIdx_BkcgHU = name_UopZPS.lastIndexOf("-", dashIdx_BkcgHU - 1);
    }
    "@" === name_UopZPS[0] && testFn_LHjaUP("@") && (yield ["@", name_UopZPS.slice(1)]);
  }
  function compareWithOrder_AnSyON(a_cfqLbG, b_dZcpNU, order_BcmlQD) {
    if (a_cfqLbG === b_dZcpNU) return 0;
    let aParenIdx_xsTfkd = a_cfqLbG.indexOf("("),
      bParenIdx_sKflFw = b_dZcpNU.indexOf("("),
      aNoNum_FlDtll = -1 === aParenIdx_xsTfkd ? a_cfqLbG.replace(/[\d.]+/g, "") : a_cfqLbG.slice(0, aParenIdx_xsTfkd),
      bNoNum_JiUNnR = -1 === bParenIdx_sKflFw ? b_dZcpNU.replace(/[\d.]+/g, "") : b_dZcpNU.slice(0, bParenIdx_sKflFw),
      cmp_YppryJ =
      (aNoNum_FlDtll === bNoNum_JiUNnR ? 0 : aNoNum_FlDtll < bNoNum_JiUNnR ? -1 : 1) || (
      "asc" === order_BcmlQD ? parseInt(a_cfqLbG) - parseInt(b_dZcpNU) : parseInt(b_dZcpNU) - parseInt(a_cfqLbG));
    return Number.isNaN(cmp_YppryJ) ? a_cfqLbG < b_dZcpNU ? -1 : 1 : cmp_YppryJ;
  }
  var KNOWN_CSS_COLORS_WFiuVs = new Set([
    "black",
    "silver",
    "gray",
    "white",
    "maroon",
    "red",
    "purple",
    "fuchsia",
    "green",
    "lime",
    "olive",
    "yellow",
    "navy",
    "blue",
    "teal",
    "aqua",
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
    "transparent",
    "currentcolor",
    "canvas",
    "canvastext",
    "linktext",
    "visitedtext",
    "activetext",
    "buttonface",
    "buttontext",
    "buttonborder",
    "field",
    "fieldtext",
    "highlight",
    "highlighttext",
    "selecteditem",
    "selecteditemtext",
    "mark",
    "marktext",
    "graytext",
    "accentcolor",
    "accentcolortext"]
    ),
    colorFunctionRegex_KboqUv = /^(rgba?|hsla?|hwb|color|(ok)?(lab|lch)|light-dark|color-mix)\(/i;
  var cssValueTypeChecks_ZxgZzV = {
    color: function (colorValue_ITIkKK) {
      return 35 === colorValue_ITIkKK.charCodeAt(0) || colorFunctionRegex_KboqUv.test(colorValue_ITIkKK) || KNOWN_CSS_COLORS_WFiuVs.has(colorValue_ITIkKK.toLowerCase());
    },
    length: isLengthValue_FOrvlg,
    percentage: isPercentageValue_hUDcPy,
    ratio: function (ratioValue_nzuaIh) {
      return ratioRegex_AmqrkT.test(ratioValue_nzuaIh) || containsMathFunction_mItKgu(ratioValue_nzuaIh);
    },
    number: isNumberValue_rSzOld,
    integer: isNonNegativeInteger_QISFSJ,
    url: isURLValue_tgHTTq,
    position: function (positionValue_xSYLKt) {
      let count_eKHAtX = 0;
      for (let part_MAElfm of splitOnTopLevel_EfBwUv(positionValue_xSYLKt, " "))
      if (
      "center" !== part_MAElfm &&
      "top" !== part_MAElfm &&
      "right" !== part_MAElfm &&
      "bottom" !== part_MAElfm &&
      "left" !== part_MAElfm)
      {
        if (!part_MAElfm.startsWith("var(")) {
          if (isLengthValue_FOrvlg(part_MAElfm) || isPercentageValue_hUDcPy(part_MAElfm)) {
            count_eKHAtX += 1;
            continue;
          }
          return !1;
        }
      } else count_eKHAtX += 1;
      return count_eKHAtX > 0;
    },
    "bg-size": function (bgSizeValue_FbnWDH) {
      let count_qBIWlf = 0;
      for (let item_YqizwZ of splitOnTopLevel_EfBwUv(bgSizeValue_FbnWDH, ",")) {
        if ("cover" === item_YqizwZ || "contain" === item_YqizwZ) {
          count_qBIWlf += 1;
          continue;
        }
        let parts_yDgCXq = splitOnTopLevel_EfBwUv(item_YqizwZ, " ");
        if (1 !== parts_yDgCXq.length && 2 !== parts_yDgCXq.length) return !1;
        parts_yDgCXq.every((part_jPRRTy) => "auto" === part_jPRRTy || isLengthValue_FOrvlg(part_jPRRTy) || isPercentageValue_hUDcPy(part_jPRRTy)) && (count_qBIWlf += 1);
      }
      return count_qBIWlf > 0;
    },
    "line-width": function (lineWidthValue_DZYDkX) {
      return splitOnTopLevel_EfBwUv(lineWidthValue_DZYDkX, " ").every(
        (part_aKyKPX) =>
        isLengthValue_FOrvlg(part_aKyKPX) || isNumberValue_rSzOld(part_aKyKPX) || "thin" === part_aKyKPX || "medium" === part_aKyKPX || "thick" === part_aKyKPX
      );
    },
    image: function (imageList_fIDwJP) {
      let count_ITcwoR = 0;
      for (let imgPart_NsIVGv of splitOnTopLevel_EfBwUv(imageList_fIDwJP, ","))
      if (!imgPart_NsIVGv.startsWith("var(")) {
        if (isURLValue_tgHTTq(imgPart_NsIVGv)) {
          count_ITcwoR += 1;
          continue;
        }
        if (gradientRegex_qoiSpR.test(imgPart_NsIVGv)) {
          count_ITcwoR += 1;
          continue;
        }
        if (imageFunctionRegex_kUtiCs.test(imgPart_NsIVGv)) {
          count_ITcwoR += 1;
          continue;
        }
        return !1;
      }
      return count_ITcwoR > 0;
    },
    "family-name": function (fontFamilyValue_pdljVK) {
      let count_peIuhu = 0;
      for (let familyName_GFQPoz of splitOnTopLevel_EfBwUv(fontFamilyValue_pdljVK, ",")) {
        let charCode_kZhgsg = familyName_GFQPoz.charCodeAt(0);
        if (charCode_kZhgsg >= 48 && charCode_kZhgsg <= 57) return !1;
        familyName_GFQPoz.startsWith("var(") || (count_peIuhu += 1);
      }
      return count_peIuhu > 0;
    },
    "generic-name": function (genericName_LOsNMF) {
      return (
        "serif" === genericName_LOsNMF ||
        "sans-serif" === genericName_LOsNMF ||
        "monospace" === genericName_LOsNMF ||
        "cursive" === genericName_LOsNMF ||
        "fantasy" === genericName_LOsNMF ||
        "system-ui" === genericName_LOsNMF ||
        "ui-serif" === genericName_LOsNMF ||
        "ui-sans-serif" === genericName_LOsNMF ||
        "ui-monospace" === genericName_LOsNMF ||
        "ui-rounded" === genericName_LOsNMF ||
        "math" === genericName_LOsNMF ||
        "emoji" === genericName_LOsNMF ||
        "fangsong" === genericName_LOsNMF);

    },
    "absolute-size": function (absSizeValue_SGyAmK) {
      return (
        "xx-small" === absSizeValue_SGyAmK ||
        "x-small" === absSizeValue_SGyAmK ||
        "small" === absSizeValue_SGyAmK ||
        "medium" === absSizeValue_SGyAmK ||
        "large" === absSizeValue_SGyAmK ||
        "x-large" === absSizeValue_SGyAmK ||
        "xx-large" === absSizeValue_SGyAmK ||
        "xxx-large" === absSizeValue_SGyAmK);

    },
    "relative-size": function (relSizeValue_rBnOvc) {
      return "larger" === relSizeValue_rBnOvc || "smaller" === relSizeValue_rBnOvc;
    },
    angle: function (angleValue_bqcGCP) {
      return angleRegex_UPzfiX.test(angleValue_bqcGCP);
    },
    vector: function (vectorValue_YCpHnX) {
      return vectorRegex_fTKfQh.test(vectorValue_YCpHnX);
    }
  };
  function resolveCssType_DhcVtf(value_dOEkvh, types_gfBgTw) {
    if (value_dOEkvh.startsWith("var(")) return null;
    for (let typeName_xMPEJv of types_gfBgTw) if (cssValueTypeChecks_ZxgZzV[typeName_xMPEJv]?.(value_dOEkvh)) return typeName_xMPEJv;
    return null;
  }
  var urlFunctionRegex_SbERyG = /^url\(.*\)$/;
  function isURLValue_tgHTTq(str_WnJtdc) {
    return urlFunctionRegex_SbERyG.test(str_WnJtdc);
  }
  var imageFunctionRegex_kUtiCs = /^(?:element|image|cross-fade|image-set)\(/,
    gradientRegex_qoiSpR = /^(repeating-)?(conic|linear|radial)-gradient\(/;
  var numberRegexStr_qChkSo = /[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/,
    numberRegex_rPncVV = new RegExp(`^${numberRegexStr_qChkSo.source}$`);
  function isNumberValue_rSzOld(val_qDUFDh) {
    return numberRegex_rPncVV.test(val_qDUFDh) || containsMathFunction_mItKgu(val_qDUFDh);
  }
  var percentageRegex_ORAXId = new RegExp(`^${numberRegexStr_qChkSo.source}%$`);
  function isPercentageValue_hUDcPy(val_ZWblBk) {
    return percentageRegex_ORAXId.test(val_ZWblBk) || containsMathFunction_mItKgu(val_ZWblBk);
  }
  var ratioRegex_AmqrkT = new RegExp(`^${numberRegexStr_qChkSo.source}s*/s*${numberRegexStr_qChkSo.source}$`);
  var lengthRegex_FIMxKZ = new RegExp(
    `^${numberRegexStr_qChkSo.source}(${["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "rlh", "vw", "vh", "vmin", "vmax", "vb", "vi", "svw", "svh", "lvw", "lvh", "dvw", "dvh", "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax"].join("|")})$`
  );
  function isLengthValue_FOrvlg(str_okNFQO) {
    return lengthRegex_FIMxKZ.test(str_okNFQO) || containsMathFunction_mItKgu(str_okNFQO);
  }
  var angleRegex_UPzfiX = new RegExp(
    `^${numberRegexStr_qChkSo.source}(${["deg", "rad", "grad", "turn"].join("|")})$`
  );
  var vectorRegex_fTKfQh = new RegExp(`^${numberRegexStr_qChkSo.source} +${numberRegexStr_qChkSo.source} +${numberRegexStr_qChkSo.source}$`);
  function isNonNegativeInteger_QISFSJ(str_mRXjFr) {
    let num_rfZaZa = Number(str_mRXjFr);
    return Number.isInteger(num_rfZaZa) && num_rfZaZa >= 0 && String(num_rfZaZa) === String(str_mRXjFr);
  }
  function isPositiveInteger_IonhVo(str_XDfrXQ) {
    let num_upIpIt = Number(str_XDfrXQ);
    return Number.isInteger(num_upIpIt) && num_upIpIt > 0 && String(num_upIpIt) === String(str_XDfrXQ);
  }
  function isQuarterStep_WkCuTa(value_KgasuL) {
    return isModStep_TVXuxL(value_KgasuL, 0.25);
  }
  function isQuarterStepAlt_ypENnF(value_LGTJaS) {
    return isModStep_TVXuxL(value_LGTJaS, 0.25);
  }
  function isModStep_TVXuxL(val_YmRazq, mod_PBIqqD) {
    let num_FQByae = Number(val_YmRazq);
    return num_FQByae >= 0 && num_FQByae % mod_PBIqqD == 0 && String(num_FQByae) === String(val_YmRazq);
  }
  var boxShadowIgnoredSet_CZLAdj = new Set(["inset", "inherit", "initial", "revert", "unset"]),
    boxShadowRegex_VTPZQc = /^-?(\d+|\.\d+)(.*?)$/g;
  function mapBoxShadowColors_WwIpip(input_mhCltl, getColorReplacement_SduseB) {
    return splitOnTopLevel_EfBwUv(input_mhCltl, ",").
    map((shadowStr_ozrIGk) => {
      let parts_dRpjDO = splitOnTopLevel_EfBwUv(shadowStr_ozrIGk = shadowStr_ozrIGk.trim(), " ").filter((part_BOUWzr) => "" !== part_BOUWzr.trim()),
        colorStr_NjrOXa = null,
        firstLen_NPfZvO = null,
        secondLen_kGOiak = null;
      for (let part_rORSID of parts_dRpjDO)
      boxShadowIgnoredSet_CZLAdj.has(part_rORSID) || (
      boxShadowRegex_VTPZQc.test(part_rORSID) ? (
      null === firstLen_NPfZvO ? firstLen_NPfZvO = part_rORSID : null === secondLen_kGOiak && (secondLen_kGOiak = part_rORSID),
      boxShadowRegex_VTPZQc.lastIndex = 0) :
      null === colorStr_NjrOXa && (colorStr_NjrOXa = part_rORSID));
      if (null === firstLen_NPfZvO || null === secondLen_kGOiak) return shadowStr_ozrIGk;
      let colorReplaced_vzFORf = getColorReplacement_SduseB(colorStr_NjrOXa ?? "currentcolor");
      return null !== colorStr_NjrOXa ? shadowStr_ozrIGk.replace(colorStr_NjrOXa, colorReplaced_vzFORf) : `${shadowStr_ozrIGk} ${colorReplaced_vzFORf}`;
    }).
    join(", ");
  }
  var themeKeyRegex_fJbAEU = /^-?[a-z][a-zA-Z0-9/%._-]*$/,
    themeKeyWildcardRegex_hVtlzz = /^-?[a-z][a-zA-Z0-9/%._-]*-\*$/,
    spacingSteps_NjsqjM = [
    "0",
    "0.5",
    "1",
    "1.5",
    "2",
    "2.5",
    "3",
    "3.5",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "20",
    "24",
    "28",
    "32",
    "36",
    "40",
    "44",
    "48",
    "52",
    "56",
    "60",
    "64",
    "72",
    "80",
    "96"],

    UtilityRegistry_yCSNLo = class {
      utilities = new DefaultMap_bDuRsR(() => []);
      completions = new Map();
      static(utilityName_QOhPpU, compileFn_uYrSJR) {
        this.utilities.get(utilityName_QOhPpU).push({ kind: "static", compileFn: compileFn_uYrSJR });
      }
      functional(utilityName_fccwzi, compileFn_Mnhqxu, options_Bvgfbh) {
        this.utilities.
        get(utilityName_fccwzi).
        push({ kind: "functional", compileFn: compileFn_Mnhqxu, options: options_Bvgfbh });
      }
      has(utilityName_cPwLTg, kind_egUCUq) {
        return (
          this.utilities.has(utilityName_cPwLTg) &&
          this.utilities.get(utilityName_cPwLTg).some((item_wMkLLM) => item_wMkLLM.kind === kind_egUCUq));

      }
      get(utilityName_antlit) {
        return this.utilities.has(utilityName_antlit) ? this.utilities.get(utilityName_antlit) : [];
      }
      getCompletions(name_tUYnpf) {
        return this.completions.get(name_tUYnpf)?.() ?? [];
      }
      suggest(name_teicER, completionFn_JHExYk) {
        this.completions.set(name_teicER, completionFn_JHExYk);
      }
      keys(kind_kBybPO) {
        let result_NKpygk = [];
        for (let [utilityName_YPRJry, items_jSusna] of this.utilities.entries())
        for (let item_mDrAkB of items_jSusna)
        if (item_mDrAkB.kind === kind_kBybPO) {
          result_NKpygk.push(utilityName_YPRJry);
          break;
        }
        return result_NKpygk;
      }
    };
  function makeAtPropertyNode_DIaSSt(prop_TiMhup, initialValue_ITrBUT, syntax_LMdUsz) {
    return processAtRule_lWgxgY("@property", prop_TiMhup, [
    makeDeclarationNode_xYlaTt("syntax", syntax_LMdUsz ? `"${syntax_LMdUsz}"` : '"*"'),
    makeDeclarationNode_xYlaTt("inherits", "false"),
    ...(initialValue_ITrBUT ? [makeDeclarationNode_xYlaTt("initial-value", initialValue_ITrBUT)] : [])]
    );
  }
  function colorWithOpacityValue_xdDGmk(color_NmGJxg, opacity_rzERin) {
    if (null === opacity_rzERin) return color_NmGJxg;
    let opacityNum_TCfPoO = Number(opacity_rzERin);
    return (
      Number.isNaN(opacityNum_TCfPoO) || (opacity_rzERin = 100 * opacityNum_TCfPoO + "%"),
      "100%" === opacity_rzERin ? color_NmGJxg : `color-mix(in oklab, ${color_NmGJxg} ${opacity_rzERin}, transparent)`);

  }
  function makeOklabWithAlpha_QHXkjT(oklabColor_lnbAWu, alphaValue_MwVDgx) {
    let alphaNum_PFAZOw = Number(alphaValue_MwVDgx);
    return (
      Number.isNaN(alphaNum_PFAZOw) || (alphaValue_MwVDgx = 100 * alphaNum_PFAZOw + "%"), `oklab(from ${oklabColor_lnbAWu} l a b / ${alphaValue_MwVDgx})`);

  }
  function applyOpacityToColor_qFFjzR(color_PhsQWM, opacityArg_xeYwfD, themeData_cEVaaw) {
    if (!opacityArg_xeYwfD) return color_PhsQWM;
    if ("arbitrary" === opacityArg_xeYwfD.kind) return colorWithOpacityValue_xdDGmk(color_PhsQWM, opacityArg_xeYwfD.value);
    let resolved_inUoyp = themeData_cEVaaw.resolve(opacityArg_xeYwfD.value, ["--opacity"]);
    return resolved_inUoyp ? colorWithOpacityValue_xdDGmk(color_PhsQWM, resolved_inUoyp) : isQuarterStepAlt_ypENnF(opacityArg_xeYwfD.value) ? colorWithOpacityValue_xdDGmk(color_PhsQWM, `${opacityArg_xeYwfD.value}%`) : null;
  }
  function mapStaticThemeColor_GNTWCf(colorNameArg_bFYIok, opacityArg_yZEUHz, theme_hBsZHB) {
    let resolvedColor_IQxnZU = null;
    switch (colorNameArg_bFYIok.value.value) {
      case "inherit":
        resolvedColor_IQxnZU = "inherit";
        break;
      case "transparent":
        resolvedColor_IQxnZU = "transparent";
        break;
      case "current":
        resolvedColor_IQxnZU = "currentcolor";
        break;
      default:
        resolvedColor_IQxnZU = opacityArg_yZEUHz.resolve(colorNameArg_bFYIok.value.value, theme_hBsZHB);
    }
    return resolvedColor_IQxnZU ? applyOpacityToColor_qFFjzR(resolvedColor_IQxnZU, colorNameArg_bFYIok.modifier, opacityArg_yZEUHz) : null;
  }
  var fractionUnderscoreRegex_NMQBjU = /(\d+)_(\d+)/g;
  var numberTypeList_YGTROd = ["number", "integer", "ratio", "percentage"];
  function resolveThemeArgument_NocrVW(argNode_wKSEsu, functionNode_zeUjCN, context_XOyoxs) {
    for (let node_WTtEBi of functionNode_zeUjCN.nodes) {
      if (
      "named" === argNode_wKSEsu.kind &&
      "word" === node_WTtEBi.kind && (
      "'" === node_WTtEBi.value[0] || '"' === node_WTtEBi.value[0]) &&
      node_WTtEBi.value[node_WTtEBi.value.length - 1] === node_WTtEBi.value[0] &&
      node_WTtEBi.value.slice(1, -1) === argNode_wKSEsu.value)

      return { nodes: parseAST_Gsbeng(argNode_wKSEsu.value) };
      if (
      "named" === argNode_wKSEsu.kind &&
      "word" === node_WTtEBi.kind &&
      "-" === node_WTtEBi.value[0] &&
      "-" === node_WTtEBi.value[1])
      {
        let candidateNs_taeNPW = node_WTtEBi.value;
        if (candidateNs_taeNPW.endsWith("-*")) {
          candidateNs_taeNPW = candidateNs_taeNPW.slice(0, -2);
          let resolvedThemeValue_VAPTPH = context_XOyoxs.theme.resolve(argNode_wKSEsu.value, [candidateNs_taeNPW]);
          if (resolvedThemeValue_VAPTPH) return { nodes: parseAST_Gsbeng(resolvedThemeValue_VAPTPH) };
        } else {
          let splitNames_vlKWdM = candidateNs_taeNPW.split("-*");
          if (splitNames_vlKWdM.length <= 1) continue;
          let ns_nueccV = [splitNames_vlKWdM.shift()],
            resolvedWith_HFmGcw = context_XOyoxs.theme.resolveWith(argNode_wKSEsu.value, ns_nueccV, splitNames_vlKWdM);
          if (resolvedWith_HFmGcw) {
            let [, suffixedMap_KOxfsJ = {}] = resolvedWith_HFmGcw;
            {
              let suffixValue_hKpsxv = suffixedMap_KOxfsJ[splitNames_vlKWdM.pop()];
              if (suffixValue_hKpsxv) return { nodes: parseAST_Gsbeng(suffixValue_hKpsxv) };
            }
          }
        }
      } else {
        if ("named" === argNode_wKSEsu.kind && "word" === node_WTtEBi.kind) {
          if (!numberTypeList_YGTROd.includes(node_WTtEBi.value)) continue;
          let rawValue_yFaLKK = "ratio" === node_WTtEBi.value && "fraction" in argNode_wKSEsu ? argNode_wKSEsu.fraction : argNode_wKSEsu.value;
          if (!rawValue_yFaLKK) continue;
          let inferredType_MCHxjc = resolveCssType_DhcVtf(rawValue_yFaLKK, [node_WTtEBi.value]);
          if (null === inferredType_MCHxjc) continue;
          if ("ratio" === inferredType_MCHxjc) {
            let [num1_JaujWU, num2_TwhWqV] = splitOnTopLevel_EfBwUv(rawValue_yFaLKK, "/");
            if (!isNonNegativeInteger_QISFSJ(num1_JaujWU) || !isNonNegativeInteger_QISFSJ(num2_TwhWqV)) continue;
          } else {
            if ("number" === inferredType_MCHxjc && !isQuarterStep_WkCuTa(rawValue_yFaLKK)) continue;
            if ("percentage" === inferredType_MCHxjc && !isNonNegativeInteger_QISFSJ(rawValue_yFaLKK.slice(0, -1))) continue;
          }
          return { nodes: parseAST_Gsbeng(rawValue_yFaLKK), ratio: "ratio" === inferredType_MCHxjc };
        }
        if (
        "arbitrary" === argNode_wKSEsu.kind &&
        "word" === node_WTtEBi.kind &&
        "[" === node_WTtEBi.value[0] &&
        "]" === node_WTtEBi.value[node_WTtEBi.value.length - 1])
        {
          let stripped_oHQjiK = node_WTtEBi.value.slice(1, -1);
          if ("*" === stripped_oHQjiK) return { nodes: parseAST_Gsbeng(argNode_wKSEsu.value) };
          if ("dataType" in argNode_wKSEsu && argNode_wKSEsu.dataType && argNode_wKSEsu.dataType !== stripped_oHQjiK) continue;
          if ("dataType" in argNode_wKSEsu && argNode_wKSEsu.dataType) return { nodes: parseAST_Gsbeng(argNode_wKSEsu.value) };
          if (null !== resolveCssType_DhcVtf(argNode_wKSEsu.value, [stripped_oHQjiK])) return { nodes: parseAST_Gsbeng(argNode_wKSEsu.value) };
        }
      }
    }
  }
  function propertyValueWithOpacity_yhXIiM(property_lQKExk, input_QBxljP, opacityValue_VfaygA, mapFn_ktfHmN, prefix_KoJnbC = "") {
    let needsSupports_zhOQUu = !1,
      withOpacity_fJhikQ = mapBoxShadowColors_WwIpip(input_QBxljP, (shadowPart_JJIapt) =>
      null == opacityValue_VfaygA ?
      mapFn_ktfHmN(shadowPart_JJIapt) :
      shadowPart_JJIapt.startsWith("current") ?
      mapFn_ktfHmN(colorWithOpacityValue_xdDGmk(shadowPart_JJIapt, opacityValue_VfaygA)) : (
      (shadowPart_JJIapt.startsWith("var(") || opacityValue_VfaygA.startsWith("var(")) && (needsSupports_zhOQUu = !0),
      mapFn_ktfHmN(makeOklabWithAlpha_QHXkjT(shadowPart_JJIapt, opacityValue_VfaygA)))
      );
    function addPrefix_XZKOxo(boxShadowString_pFmshq) {
      return prefix_KoJnbC ?
      splitOnTopLevel_EfBwUv(boxShadowString_pFmshq, ",").
      map((shadowSeg_yESjWj) => prefix_KoJnbC + shadowSeg_yESjWj).
      join(",") :
      boxShadowString_pFmshq;
    }
    return needsSupports_zhOQUu ?
    [
    makeDeclarationNode_xYlaTt(property_lQKExk, addPrefix_XZKOxo(mapBoxShadowColors_WwIpip(input_QBxljP, mapFn_ktfHmN))),
    parseCSSRule_QVgHxe("@supports (color: lab(from red l a b))", [makeDeclarationNode_xYlaTt(property_lQKExk, addPrefix_XZKOxo(withOpacity_fJhikQ))])] :

    [makeDeclarationNode_xYlaTt(property_lQKExk, addPrefix_XZKOxo(withOpacity_fJhikQ))];
  }
  function dropShadowWithOpacity_aQNJTQ(property_cvPxiW, input_vIfLUF, opacityValue_FZUJMT, mapFn_Mhgvqd, prefix_JXtLnL = "") {
    let needsSupports_SHQPcB = !1,
      withOpacity_hyWjZA = splitOnTopLevel_EfBwUv(input_vIfLUF, ",").
      map((shadowGroup_VdqkgM) =>
      mapBoxShadowColors_WwIpip(shadowGroup_VdqkgM, (shadowPart_pquLxY) =>
      null == opacityValue_FZUJMT ?
      mapFn_Mhgvqd(shadowPart_pquLxY) :
      shadowPart_pquLxY.startsWith("current") ?
      mapFn_Mhgvqd(colorWithOpacityValue_xdDGmk(shadowPart_pquLxY, opacityValue_FZUJMT)) : (
      (shadowPart_pquLxY.startsWith("var(") || opacityValue_FZUJMT.startsWith("var(")) && (needsSupports_SHQPcB = !0),
      mapFn_Mhgvqd(makeOklabWithAlpha_QHXkjT(shadowPart_pquLxY, opacityValue_FZUJMT)))
      )
      ).
      map((dropShadowResult_FvrUpI) => `drop-shadow(${dropShadowResult_FvrUpI})`).
      join(" ");
    return needsSupports_SHQPcB ?
    [
    makeDeclarationNode_xYlaTt(
      property_cvPxiW,
      prefix_JXtLnL +
      splitOnTopLevel_EfBwUv(input_vIfLUF, ",").
      map((shadowGroup_jcecFF) => `drop-shadow(${mapBoxShadowColors_WwIpip(shadowGroup_jcecFF, mapFn_Mhgvqd)})`).
      join(" ")
    ),
    parseCSSRule_QVgHxe("@supports (color: lab(from red l a b))", [makeDeclarationNode_xYlaTt(property_cvPxiW, prefix_JXtLnL + withOpacity_hyWjZA)])] :

    [makeDeclarationNode_xYlaTt(property_cvPxiW, prefix_JXtLnL + withOpacity_hyWjZA)];
  }
  var functionRegistry_clbDDM = {
    "--alpha": function (themeData_pEAacc, astNode_IWAPHp, arg_WYjCjn, ...restArgs_mGnAWp) {
      let [color_ZCbkHM, alpha_ckAsHH] = splitOnTopLevel_EfBwUv(arg_WYjCjn, "/").map((item_GfeBaI) => item_GfeBaI.trim());
      if (!color_ZCbkHM || !alpha_ckAsHH)
      throw new Error(
        `The --alpha(…) function requires a color and an alpha value, e.g.: \`--alpha(${color_ZCbkHM || "var(--my-color)"} / ${alpha_ckAsHH || "50%"})\``
      );
      if (restArgs_mGnAWp.length > 0)
      throw new Error(
        `The --alpha(…) function only accepts one argument, e.g.: \`--alpha(${color_ZCbkHM || "var(--my-color)"} / ${alpha_ckAsHH || "50%"})\``
      );
      return colorWithOpacityValue_xdDGmk(color_ZCbkHM, alpha_ckAsHH);
    },
    "--spacing": function (ctx_hGCzWo, astNode_kkpGis, factorVal_pUEIZC, ...restArgs_pxJQtL) {
      if (!factorVal_pUEIZC)
      throw new Error(
        "The --spacing(…) function requires an argument, but received none."
      );
      if (restArgs_pxJQtL.length > 0)
      throw new Error(
        `The --spacing(…) function only accepts a single argument, but received ${restArgs_pxJQtL.length + 1}.`
      );
      let spacingVar_bQfRrj = ctx_hGCzWo.theme.resolve(null, ["--spacing"]);
      if (!spacingVar_bQfRrj)
      throw new Error(
        "The --spacing(…) function requires that the `--spacing` theme variable exists, but it was not found."
      );
      return `calc(${spacingVar_bQfRrj} * ${factorVal_pUEIZC})`;
    },
    "--theme": function (theme_pILkFg, contextNode_fIKzuN, variable_ukZIpm, ...fallbacks_hdbHNi) {
      if (!variable_ukZIpm.startsWith("--"))
      throw new Error(
        "The --theme(…) function can only be used with CSS variables from your theme."
      );
      let forceInline_lFdFXh = !1;
      variable_ukZIpm.endsWith(" inline") && (forceInline_lFdFXh = !0, variable_ukZIpm = variable_ukZIpm.slice(0, -7)),
      "at-rule" === contextNode_fIKzuN.kind && (forceInline_lFdFXh = !0);
      let value_AvTUkO = theme_pILkFg.resolveThemeValue(variable_ukZIpm, forceInline_lFdFXh);
      if (!value_AvTUkO) {
        if (fallbacks_hdbHNi.length > 0) return fallbacks_hdbHNi.join(", ");
        throw new Error(
          `Could not resolve value for theme function: \`theme(${variable_ukZIpm})\`. Consider checking if the variable name is correct or provide a fallback value to silence this error.`
        );
      }
      if (0 === fallbacks_hdbHNi.length) return value_AvTUkO;
      let fallbackStr_zwofmB = fallbacks_hdbHNi.join(", ");
      if ("initial" === fallbackStr_zwofmB) return value_AvTUkO;
      if ("initial" === value_AvTUkO) return fallbackStr_zwofmB;
      if (
      value_AvTUkO.startsWith("var(") ||
      value_AvTUkO.startsWith("theme(") ||
      value_AvTUkO.startsWith("--theme("))
      {
        let ast_vFvVyF = parseAST_Gsbeng(value_AvTUkO);
        return (
          function (ast_HrhPWc, fallbackValue_fMiCEi) {
            walkAST_roCHga(ast_HrhPWc, (node_nZrcLQ) => {
              if (
              "function" === node_nZrcLQ.kind && (
              "var" === node_nZrcLQ.value ||
              "theme" === node_nZrcLQ.value ||
              "--theme" === node_nZrcLQ.value))

              if (1 === node_nZrcLQ.nodes.length)
              node_nZrcLQ.nodes.push({ kind: "word", value: `, ${fallbackValue_fMiCEi}` });else
              {
                let lastNode_wavXYL = node_nZrcLQ.nodes[node_nZrcLQ.nodes.length - 1];
                "word" === lastNode_wavXYL.kind && "initial" === lastNode_wavXYL.value && (lastNode_wavXYL.value = fallbackValue_fMiCEi);
              }
            });
          }(ast_vFvVyF, fallbackStr_zwofmB),
          stringifyAST_tQRzQG(ast_vFvVyF));

      }
      return value_AvTUkO;
    },
    theme: function (theme_AxlGxy, contextNode_FLwzPT, path_dEqvQL, ...fallbacks_YbVvWK) {
      path_dEqvQL = function (val_SttXNv) {
        if ("'" !== val_SttXNv[0] && '"' !== val_SttXNv[0]) return val_SttXNv;
        let result_bjwiBE = "",
          quoteChar_LOHluT = val_SttXNv[0];
        for (let i_uEvcFe = 1; i_uEvcFe < val_SttXNv.length - 1; i_uEvcFe++) {
          let c_UMyVGZ = val_SttXNv[i_uEvcFe],
            nextC_IYzfQT = val_SttXNv[i_uEvcFe + 1];
          "\\" !== c_UMyVGZ || nextC_IYzfQT !== quoteChar_LOHluT && "\\" !== nextC_IYzfQT ? result_bjwiBE += c_UMyVGZ : (result_bjwiBE += nextC_IYzfQT, i_uEvcFe++);
        }
        return result_bjwiBE;
      }(path_dEqvQL);
      let value_qIhasT = theme_AxlGxy.resolveThemeValue(path_dEqvQL);
      if (!value_qIhasT && fallbacks_YbVvWK.length > 0) return fallbacks_YbVvWK.join(", ");
      if (!value_qIhasT)
      throw new Error(
        `Could not resolve value for theme function: \`theme(${path_dEqvQL})\`. Consider checking if the path is correct or provide a fallback value to silence this error.`
      );
      return value_qIhasT;
    }
  };
  var fnPatternRegex_hGnJRf = new RegExp(
    Object.keys(functionRegistry_clbDDM).
    map((name_PMrjDC) => `${name_PMrjDC}\\(`).
    join("|")
  );
  function evaluateThemeFunctions_XAqelQ(rootAst_ordlyK, theme_LvmlSC) {
    let flags_IqvLBa = 0;
    return (
      walkASTRecursive_YoBVFs(rootAst_ordlyK, (node_qGBLRr) => {
        if ("declaration" === node_qGBLRr.kind && node_qGBLRr.value && fnPatternRegex_hGnJRf.test(node_qGBLRr.value))
        return flags_IqvLBa |= 8, void (node_qGBLRr.value = evaluateThemeFunctionsInString_NAkNPX(node_qGBLRr.value, node_qGBLRr, theme_LvmlSC));
        "at-rule" === node_qGBLRr.kind && (
        "@media" === node_qGBLRr.name ||
        "@custom-media" === node_qGBLRr.name ||
        "@container" === node_qGBLRr.name ||
        "@supports" === node_qGBLRr.name) &&
        fnPatternRegex_hGnJRf.test(node_qGBLRr.params) && (
        flags_IqvLBa |= 8, node_qGBLRr.params = evaluateThemeFunctionsInString_NAkNPX(node_qGBLRr.params, node_qGBLRr, theme_LvmlSC));
      }),
      flags_IqvLBa);

  }
  function evaluateThemeFunctionsInString_NAkNPX(input_iLjKHO, contextNode_BXjrpa, theme_IthdYd) {
    let ast_pgVaOr = parseAST_Gsbeng(input_iLjKHO);
    return (
      walkAST_roCHga(ast_pgVaOr, (node_TjNgif, { replaceWith: replaceWith_RbLaZv }) => {
        if ("function" === node_TjNgif.kind && node_TjNgif.value in functionRegistry_clbDDM) {
          let args_zphyeu = splitOnTopLevel_EfBwUv(stringifyAST_tQRzQG(node_TjNgif.nodes).trim(), ",").map((x_xYCNCp) => x_xYCNCp.trim());
          return replaceWith_RbLaZv(parseAST_Gsbeng(functionRegistry_clbDDM[node_TjNgif.value](theme_IthdYd, contextNode_BXjrpa, ...args_zphyeu)));
        }
      }),
      stringifyAST_tQRzQG(ast_pgVaOr));

  }
  function stringCompareWithNumbers_ZFbkaY(a_PHCnEC, b_vsoXDb) {
    let aLen_iiSWVj = a_PHCnEC.length,
      bLen_hrrrnR = b_vsoXDb.length,
      minLen_fdOCht = aLen_iiSWVj < bLen_hrrrnR ? aLen_iiSWVj : bLen_hrrrnR;
    for (let i_rvhepS = 0; i_rvhepS < minLen_fdOCht; i_rvhepS++) {
      let ach_XgUZxG = a_PHCnEC.charCodeAt(i_rvhepS),
        bch_GBaaHN = b_vsoXDb.charCodeAt(i_rvhepS);
      if (ach_XgUZxG >= 48 && ach_XgUZxG <= 57 && bch_GBaaHN >= 48 && bch_GBaaHN <= 57) {
        let ai_iCBcab = i_rvhepS,
          aj_FEMWBJ = i_rvhepS + 1,
          bi_tQFtCO = i_rvhepS,
          bj_SQZSGe = i_rvhepS + 1;
        for (ach_XgUZxG = a_PHCnEC.charCodeAt(aj_FEMWBJ); ach_XgUZxG >= 48 && ach_XgUZxG <= 57;) ach_XgUZxG = a_PHCnEC.charCodeAt(++aj_FEMWBJ);
        for (bch_GBaaHN = b_vsoXDb.charCodeAt(bj_SQZSGe); bch_GBaaHN >= 48 && bch_GBaaHN <= 57;) bch_GBaaHN = b_vsoXDb.charCodeAt(++bj_SQZSGe);
        let anum_gOHyhs = a_PHCnEC.slice(ai_iCBcab, aj_FEMWBJ),
          bnum_SdvcPu = b_vsoXDb.slice(bi_tQFtCO, bj_SQZSGe),
          compNum_fOMqnd = Number(anum_gOHyhs) - Number(bnum_SdvcPu);
        if (compNum_fOMqnd) return compNum_fOMqnd;
        if (anum_gOHyhs < bnum_SdvcPu) return -1;
        if (anum_gOHyhs > bnum_SdvcPu) return 1;
      } else if (ach_XgUZxG !== bch_GBaaHN) return ach_XgUZxG - bch_GBaaHN;
    }
    return a_PHCnEC.length - b_vsoXDb.length;
  }
  var fractionMatcherRegex_ovTtDz = /^\d+\/\d+$/;
  function generateUtilityGroups_MKErBh(registry_ZCfJdg) {
    let allItems_tMmrfo = [];
    for (let name_jvpAQA of registry_ZCfJdg.utilities.keys("static"))
    allItems_tMmrfo.push({ name: name_jvpAQA, utility: name_jvpAQA, fraction: !1, modifiers: [] });
    for (let name_tQfzWS of registry_ZCfJdg.utilities.keys("functional")) {
      let completionVariants_PotMcQ = registry_ZCfJdg.utilities.getCompletions(name_tQfzWS);
      for (let completionGroup_fJyObc of completionVariants_PotMcQ)
      for (let value_ZjhjWh of completionGroup_fJyObc.values) {
        let isFraction_KiHnga = null !== value_ZjhjWh && fractionMatcherRegex_ovTtDz.test(value_ZjhjWh),
          utilityString_OinbVv = null === value_ZjhjWh ? name_tQfzWS : `${name_tQfzWS}-${value_ZjhjWh}`;
        allItems_tMmrfo.push({ name: utilityString_OinbVv, utility: name_tQfzWS, fraction: isFraction_KiHnga, modifiers: completionGroup_fJyObc.modifiers }),
        completionGroup_fJyObc.supportsNegative &&
        allItems_tMmrfo.push({
          name: `-${utilityString_OinbVv}`,
          utility: `-${name_tQfzWS}`,
          fraction: isFraction_KiHnga,
          modifiers: completionGroup_fJyObc.modifiers
        });
      }
    }
    return 0 === allItems_tMmrfo.length ?
    [] : (
    allItems_tMmrfo.sort((aItem_NmSjJC, bItem_ZXqftY) => stringCompareWithNumbers_ZFbkaY(aItem_NmSjJC.name, bItem_ZXqftY.name)),
    function (allItemsList_VIJycF) {
      let utilityGroups_tWyetG = [],
        currentGroup_ZIEmps = null,
        groupByUtility_HZBbJh = new Map(),
        pendingFractionGroups_SnAFBV = new DefaultMap_bDuRsR(() => []);
      for (let item_cHfnCq of allItemsList_VIJycF) {
        let { utility: utilityName_wNroGe, fraction: isFraction_drSrJV } = item_cHfnCq;
        currentGroup_ZIEmps || (currentGroup_ZIEmps = { utility: utilityName_wNroGe, items: [] }, groupByUtility_HZBbJh.set(utilityName_wNroGe, currentGroup_ZIEmps)),
        utilityName_wNroGe !== currentGroup_ZIEmps.utility && (
        utilityGroups_tWyetG.push(currentGroup_ZIEmps), currentGroup_ZIEmps = { utility: utilityName_wNroGe, items: [] }, groupByUtility_HZBbJh.set(utilityName_wNroGe, currentGroup_ZIEmps)),
        isFraction_drSrJV ? pendingFractionGroups_SnAFBV.get(utilityName_wNroGe).push(item_cHfnCq) : currentGroup_ZIEmps.items.push(item_cHfnCq);
      }
      currentGroup_ZIEmps && utilityGroups_tWyetG[utilityGroups_tWyetG.length - 1] !== currentGroup_ZIEmps && utilityGroups_tWyetG.push(currentGroup_ZIEmps);
      for (let [util_aPAPJZ, fractionItems_WeKbyy] of pendingFractionGroups_SnAFBV) {
        let group_ZFKsBv = groupByUtility_HZBbJh.get(util_aPAPJZ);
        group_ZFKsBv && group_ZFKsBv.items.push(...fractionItems_WeKbyy);
      }
      let outputList_XNVKPG = [];
      for (let group_dsZTLF of utilityGroups_tWyetG)
      for (let item_ZImGBH of group_dsZTLF.items) outputList_XNVKPG.push([item_ZImGBH.name, { modifiers: item_ZImGBH.modifiers }]);
      return outputList_XNVKPG;
    }(allItems_tMmrfo));
  }
  var variantGroupRegex_aHueMa = /^@?[a-zA-Z0-9_-]*$/,
    VariantRegistry_aSbSqe = class {
      compareFns = new Map();
      variants = new Map();
      completions = new Map();
      groupOrder = null;
      lastOrder = 0;
      static(name_nsXXqp, applyFn_wxhNft, { compounds: compounds_kEEBRu, order: order_vMjXCn } = {}) {
        this.set(name_nsXXqp, {
          kind: "static",
          applyFn: applyFn_wxhNft,
          compoundsWith: 0,
          compounds: compounds_kEEBRu ?? 2,
          order: order_vMjXCn
        });
      }
      fromAst(name_FrUtta, ast_riVSPV) {
        let selectors_IqIelf = [];
        walkASTRecursive_YoBVFs(ast_riVSPV, (node_ZIoXRk) => {
          "rule" === node_ZIoXRk.kind ?
          selectors_IqIelf.push(node_ZIoXRk.selector) :
          "at-rule" === node_ZIoXRk.kind &&
          "@slot" !== node_ZIoXRk.name &&
          selectors_IqIelf.push(`${node_ZIoXRk.name} ${node_ZIoXRk.params}`);
        }),
        this.static(
          name_FrUtta,
          (params_JJHims) => {
            let clonedAst_nQKRQD = structuredClone(ast_riVSPV);
            replaceSlotNodes_qXXmre(clonedAst_nQKRQD, params_JJHims.nodes), params_JJHims.nodes = clonedAst_nQKRQD;
          },
          { compounds: getCompoundsNumber_NglmcN(selectors_IqIelf) }
        );
      }
      functional(variantName_YqTSkQ, applyFunction_PqOSMt, { compounds: compoundsCount_iDRfjk, order: variantOrder_OrchKn } = {}) {
        this.set(variantName_YqTSkQ, {
          kind: "functional",
          applyFn: applyFunction_PqOSMt,
          compoundsWith: 0,
          compounds: compoundsCount_iDRfjk ?? 2,
          order: variantOrder_OrchKn
        });
      }
      compound(compoundName_JfGmLS, compoundsWithValue_hHpuQN, compoundApplyFunction_tUOgzQ, { compounds: compoundCount_nzNquw, order: compoundOrder_DbHcDK } = {}) {
        this.set(compoundName_JfGmLS, {
          kind: "compound",
          applyFn: compoundApplyFunction_tUOgzQ,
          compoundsWith: compoundsWithValue_hHpuQN,
          compounds: compoundCount_nzNquw ?? 2,
          order: compoundOrder_DbHcDK
        });
      }
      group(registerVariantsFunction_aZFTkb, customCompareFunction_hpJvTI) {
        this.groupOrder = this.nextOrder(),
        customCompareFunction_hpJvTI && this.compareFns.set(this.groupOrder, customCompareFunction_hpJvTI),
        registerVariantsFunction_aZFTkb(),
        this.groupOrder = null;
      }
      has(variantIdentifier_tYmVmx) {
        return this.variants.has(variantIdentifier_tYmVmx);
      }
      get(variantKey_OjQLzI) {
        return this.variants.get(variantKey_OjQLzI);
      }
      kind(name_HyQMQg) {
        return this.variants.get(name_HyQMQg)?.kind;
      }
      compoundsWith(variantA_EqVDjB, variantB_iXCWpf) {
        let varAObj_ijCtRI = this.variants.get(variantA_EqVDjB),
          varBObj_UuUsMC =
          "string" == typeof variantB_iXCWpf ?
          this.variants.get(variantB_iXCWpf) :
          "arbitrary" === variantB_iXCWpf.kind ?
          { compounds: getCompoundsNumber_NglmcN([variantB_iXCWpf.selector]) } :
          this.variants.get(variantB_iXCWpf.root);
        return !!(
        varAObj_ijCtRI &&
        varBObj_UuUsMC &&
        "compound" === varAObj_ijCtRI.kind &&
        0 !== varBObj_UuUsMC.compounds &&
        0 !== varAObj_ijCtRI.compoundsWith &&
        varAObj_ijCtRI.compoundsWith & varBObj_UuUsMC.compounds);

      }
      suggest(name_enjWRh, completionFn_PfPhOK) {
        this.completions.set(name_enjWRh, completionFn_PfPhOK);
      }
      getCompletions(name_GvNqeN) {
        return this.completions.get(name_GvNqeN)?.() ?? [];
      }
      compare(a_HwcmDa, b_DpXgNS) {
        if (a_HwcmDa === b_DpXgNS) return 0;
        if (null === a_HwcmDa) return -1;
        if (null === b_DpXgNS) return 1;
        if ("arbitrary" === a_HwcmDa.kind && "arbitrary" === b_DpXgNS.kind)
        return a_HwcmDa.selector < b_DpXgNS.selector ? -1 : 1;
        if ("arbitrary" === a_HwcmDa.kind) return 1;
        if ("arbitrary" === b_DpXgNS.kind) return -1;
        let aOrder_IyvjvT = this.variants.get(a_HwcmDa.root).order,
          orderCmp_vXpXFB = aOrder_IyvjvT - this.variants.get(b_DpXgNS.root).order;
        if (0 !== orderCmp_vXpXFB) return orderCmp_vXpXFB;
        if ("compound" === a_HwcmDa.kind && "compound" === b_DpXgNS.kind) {
          let cmpRes_bJizbQ = this.compare(a_HwcmDa.variant, b_DpXgNS.variant);
          return 0 !== cmpRes_bJizbQ ?
          cmpRes_bJizbQ :
          a_HwcmDa.modifier && b_DpXgNS.modifier ?
          a_HwcmDa.modifier.value < b_DpXgNS.modifier.value ?
          -1 :
          1 :
          a_HwcmDa.modifier ?
          1 :
          b_DpXgNS.modifier ?
          -1 :
          0;
        }
        let customCmpFn_TzLNSD = this.compareFns.get(aOrder_IyvjvT);
        if (void 0 !== customCmpFn_TzLNSD) return customCmpFn_TzLNSD(a_HwcmDa, b_DpXgNS);
        if (a_HwcmDa.root !== b_DpXgNS.root) return a_HwcmDa.root < b_DpXgNS.root ? -1 : 1;
        let aVal_lEMHab = a_HwcmDa.value,
          bVal_JmSqTr = b_DpXgNS.value;
        return null === aVal_lEMHab ?
        -1 :
        null === bVal_JmSqTr || "arbitrary" === aVal_lEMHab.kind && "arbitrary" !== bVal_JmSqTr.kind ?
        1 :
        "arbitrary" !== aVal_lEMHab.kind && "arbitrary" === bVal_JmSqTr.kind ||
        aVal_lEMHab.value < bVal_JmSqTr.value ?
        -1 :
        1;
      }
      keys() {
        return this.variants.keys();
      }
      entries() {
        return this.variants.entries();
      }
      set(
      name_mJenKs,
      { kind: kind_qvEXbz, applyFn: applyFn_NFgfDj, compounds: compounds_mhNnXG, compoundsWith: compoundsWith_VowKRY, order: order_GGkpMD })
      {
        let existing_pmQaNK = this.variants.get(name_mJenKs);
        existing_pmQaNK ?
        Object.assign(existing_pmQaNK, { kind: kind_qvEXbz, applyFn: applyFn_NFgfDj, compounds: compounds_mhNnXG }) : (
        void 0 === order_GGkpMD && (
        this.lastOrder = this.nextOrder(), order_GGkpMD = this.lastOrder),
        this.variants.set(name_mJenKs, {
          kind: kind_qvEXbz,
          applyFn: applyFn_NFgfDj,
          order: order_GGkpMD,
          compoundsWith: compoundsWith_VowKRY,
          compounds: compounds_mhNnXG
        }));
      }
      nextOrder() {
        return this.groupOrder ?? this.lastOrder + 1;
      }
    };
  function getCompoundsNumber_NglmcN(selectorsOrAts_ZAbKwG) {
    let compounds_zgZFhG = 0;
    for (let name_TJYAGh of selectorsOrAts_ZAbKwG)
    if ("@" !== name_TJYAGh[0]) {
      if (name_TJYAGh.includes("::")) return 0;
      compounds_zgZFhG |= 2;
    } else {
      if (
      !name_TJYAGh.startsWith("@media") &&
      !name_TJYAGh.startsWith("@supports") &&
      !name_TJYAGh.startsWith("@container"))

      return 0;
      compounds_zgZFhG |= 1;
    }
    return compounds_zgZFhG;
  }
  function quoteIfNeeded_KWDqOx(s_feeaEJ) {
    if (s_feeaEJ.includes("=")) {
      let [key_qOQUIW, ...afterEqList_UZlxay] = splitOnTopLevel_EfBwUv(s_feeaEJ, "="),
        rhsVal_TtOFNo = afterEqList_UZlxay.join("=").trim();
      if ("'" === rhsVal_TtOFNo[0] || '"' === rhsVal_TtOFNo[0]) return s_feeaEJ;
      if (rhsVal_TtOFNo.length > 1) {
        let lastChar_spmvfo = rhsVal_TtOFNo[rhsVal_TtOFNo.length - 1];
        if (
        " " === rhsVal_TtOFNo[rhsVal_TtOFNo.length - 2] && (
        "i" === lastChar_spmvfo || "I" === lastChar_spmvfo || "s" === lastChar_spmvfo || "S" === lastChar_spmvfo))

        return `${key_qOQUIW}="${rhsVal_TtOFNo.slice(0, -2)}" ${lastChar_spmvfo}`;
      }
      return `${key_qOQUIW}="${rhsVal_TtOFNo}"`;
    }
    return s_feeaEJ;
  }
  function replaceSlotNodes_qXXmre(ast_GCDAmP, replacementNodes_itMdpR) {
    walkASTRecursive_YoBVFs(ast_GCDAmP, (node_FgeCUs, { replaceWith: replaceWith_FltcKw }) => {
      if ("at-rule" === node_FgeCUs.kind && "@slot" === node_FgeCUs.name) replaceWith_FltcKw(replacementNodes_itMdpR);else
      if (
      "at-rule" === node_FgeCUs.kind && (
      "@keyframes" === node_FgeCUs.name || "@property" === node_FgeCUs.name))

      return Object.assign(node_FgeCUs, makeAtRootNode_uVreCe([processAtRule_lWgxgY(node_FgeCUs.name, node_FgeCUs.params, node_FgeCUs.nodes)])), 1;
    });
  }
  function makeUtilityRegistryFromTheme_cPLaiR(themeData_dCZPaX) {
    let registerCoreUtilities_tgdQGQ = function (themeVarMap_nHCGUd) {
        let utilityRegistry_fatAmE = new UtilityRegistry_yCSNLo();
        function registerCompletions_VddGyH(utilityKey_YkAiTl, valuesFn_UtvenT) {
          function* generateFractionValues_tGbhGa(ns_zHKrmX) {
            for (let k_UGFlvl of themeVarMap_nHCGUd.keysInNamespaces(ns_zHKrmX))
            yield k_UGFlvl.replace(fractionUnderscoreRegex_NMQBjU, (match_gGdjxp, num_nwjfPs, denom_SjLSLu) => `${num_nwjfPs}.${denom_SjLSLu}`);
          }
          let fractionVariants_zuPWYK = [
          "1/2",
          "1/3",
          "2/3",
          "1/4",
          "2/4",
          "3/4",
          "1/5",
          "2/5",
          "3/5",
          "4/5",
          "1/6",
          "2/6",
          "3/6",
          "4/6",
          "5/6",
          "1/12",
          "2/12",
          "3/12",
          "4/12",
          "5/12",
          "6/12",
          "7/12",
          "8/12",
          "9/12",
          "10/12",
          "11/12"];

          utilityRegistry_fatAmE.suggest(utilityKey_YkAiTl, () => {
            let result_QhnOFz = [];
            for (let val_wEvmhz of valuesFn_UtvenT()) {
              if ("string" == typeof val_wEvmhz) {
                result_QhnOFz.push({ values: [val_wEvmhz], modifiers: [] });
                continue;
              }
              let values_LMpJpU = [...(val_wEvmhz.values ?? []), ...generateFractionValues_tGbhGa(val_wEvmhz.valueThemeKeys ?? [])],
                modifiers_zznFBh = [...(val_wEvmhz.modifiers ?? []), ...generateFractionValues_tGbhGa(val_wEvmhz.modifierThemeKeys ?? [])];
              val_wEvmhz.supportsFractions && values_LMpJpU.push(...fractionVariants_zuPWYK),
              val_wEvmhz.hasDefaultValue && values_LMpJpU.unshift(null),
              result_QhnOFz.push({
                supportsNegative: val_wEvmhz.supportsNegative,
                values: values_LMpJpU,
                modifiers: modifiers_zznFBh
              });
            }
            return result_QhnOFz;
          });
        }
        function registerStaticUtility_zeqrZG(utilityKey_TEaITP, stuff_NFOjub) {
          utilityRegistry_fatAmE.static(utilityKey_TEaITP, () =>
          stuff_NFOjub.map((entry_NFMKPn) => "function" == typeof entry_NFMKPn ? entry_NFMKPn() : makeDeclarationNode_xYlaTt(entry_NFMKPn[0], entry_NFMKPn[1]))
          );
        }
        function registerFunctionalHandler_VuzNfs(utilityKey_pZCfyG, optsObj_aFdCvc) {
          function makeHandler_mkLQez({ negative: negative_FQMmjR }) {
            return (arg_BoaCaO) => {
              let resolvedValue_vhYtxv = null,
                dataType_hErKXN = null;
              if (arg_BoaCaO.value) {
                if ("arbitrary" === arg_BoaCaO.value.kind) {
                  if (arg_BoaCaO.modifier) return;
                  resolvedValue_vhYtxv = arg_BoaCaO.value.value, dataType_hErKXN = arg_BoaCaO.value.dataType;
                } else {
                  if (
                  resolvedValue_vhYtxv = themeVarMap_nHCGUd.resolve(
                    arg_BoaCaO.value.fraction ?? arg_BoaCaO.value.value,
                    optsObj_aFdCvc.themeKeys ?? []
                  ),
                  null === resolvedValue_vhYtxv && optsObj_aFdCvc.supportsFractions && arg_BoaCaO.value.fraction)
                  {
                    let [num_JkKDXv, denom_mXXcXq] = splitOnTopLevel_EfBwUv(arg_BoaCaO.value.fraction, "/");
                    if (!isNonNegativeInteger_QISFSJ(num_JkKDXv) || !isNonNegativeInteger_QISFSJ(denom_mXXcXq)) return;
                    resolvedValue_vhYtxv = `calc(${arg_BoaCaO.value.fraction} * 100%)`;
                  }
                  if (null === resolvedValue_vhYtxv && negative_FQMmjR && optsObj_aFdCvc.handleNegativeBareValue) {
                    if (
                    resolvedValue_vhYtxv = optsObj_aFdCvc.handleNegativeBareValue(arg_BoaCaO.value),
                    !resolvedValue_vhYtxv?.includes("/") && arg_BoaCaO.modifier)

                    return;
                    if (null !== resolvedValue_vhYtxv) return optsObj_aFdCvc.handle(resolvedValue_vhYtxv, null);
                  }
                  if (
                  null === resolvedValue_vhYtxv &&
                  optsObj_aFdCvc.handleBareValue && (
                  resolvedValue_vhYtxv = optsObj_aFdCvc.handleBareValue(arg_BoaCaO.value),
                  !resolvedValue_vhYtxv?.includes("/") && arg_BoaCaO.modifier))

                  return;
                }} else
              {
                if (arg_BoaCaO.modifier) return;
                resolvedValue_vhYtxv =
                void 0 !== optsObj_aFdCvc.defaultValue ?
                optsObj_aFdCvc.defaultValue :
                themeVarMap_nHCGUd.resolve(null, optsObj_aFdCvc.themeKeys ?? []);
              }
              if (null !== resolvedValue_vhYtxv) return optsObj_aFdCvc.handle(negative_FQMmjR ? `calc(${resolvedValue_vhYtxv} * -1)` : resolvedValue_vhYtxv, dataType_hErKXN);
            };
          }
          optsObj_aFdCvc.supportsNegative && utilityRegistry_fatAmE.functional(`-${utilityKey_pZCfyG}`, makeHandler_mkLQez({ negative: !0 })),
          utilityRegistry_fatAmE.functional(utilityKey_pZCfyG, makeHandler_mkLQez({ negative: !1 })),
          registerCompletions_VddGyH(utilityKey_pZCfyG, () => [
          {
            supportsNegative: optsObj_aFdCvc.supportsNegative,
            valueThemeKeys: optsObj_aFdCvc.themeKeys ?? [],
            hasDefaultValue:
            void 0 !== optsObj_aFdCvc.defaultValue && null !== optsObj_aFdCvc.defaultValue,
            supportsFractions: optsObj_aFdCvc.supportsFractions
          }]
          );
        }
        function registerColorUtility_uMaiuB(utilityKey_mxCAMl, colorOptions_LNnFAV) {
          utilityRegistry_fatAmE.functional(utilityKey_mxCAMl, (arg_HcaYcC) => {
            if (!arg_HcaYcC.value) return;
            let resolvedColor_KiBBaz = null;
            return (
              "arbitrary" === arg_HcaYcC.value.kind ? (
              resolvedColor_KiBBaz = arg_HcaYcC.value.value, resolvedColor_KiBBaz = applyOpacityToColor_qFFjzR(resolvedColor_KiBBaz, arg_HcaYcC.modifier, themeVarMap_nHCGUd)) :
              resolvedColor_KiBBaz = mapStaticThemeColor_GNTWCf(arg_HcaYcC, themeVarMap_nHCGUd, colorOptions_LNnFAV.themeKeys),
              null !== resolvedColor_KiBBaz ? colorOptions_LNnFAV.handle(resolvedColor_KiBBaz) : void 0);

          }),
          registerCompletions_VddGyH(utilityKey_mxCAMl, () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: colorOptions_LNnFAV.themeKeys,
            modifiers: Array.from({ length: 21 }, (unusedValue_eMiYlR, idx_pLEydK) => "" + 5 * idx_pLEydK)
          }]
          );
        }
        function registerSpacingUtility_YCMYBk(
        utilityKey_vCukWQ,
        themeKeys_doAsSE,
        handleFn_QtMTyI,
        { supportsNegative: supportsNegative_ftaHuM = !1, supportsFractions: supportsFractions_oxINsk = !1 } = {})
        {
          supportsNegative_ftaHuM && utilityRegistry_fatAmE.static(`-${utilityKey_vCukWQ}-px`, () => handleFn_QtMTyI("-1px")),
          utilityRegistry_fatAmE.static(`${utilityKey_vCukWQ}-px`, () => handleFn_QtMTyI("1px")),
          registerFunctionalHandler_VuzNfs(utilityKey_vCukWQ, {
            themeKeys: themeKeys_doAsSE,
            supportsFractions: supportsFractions_oxINsk,
            supportsNegative: supportsNegative_ftaHuM,
            defaultValue: null,
            handleBareValue: ({ value: val_eYWfey }) => {
              let spacingVar_vJgJGZ = themeVarMap_nHCGUd.resolve(null, ["--spacing"]);
              return spacingVar_vJgJGZ && isQuarterStep_WkCuTa(val_eYWfey) ? `calc(${spacingVar_vJgJGZ} * ${val_eYWfey})` : null;
            },
            handleNegativeBareValue: ({ value: val_zxruNA }) => {
              let spacingVar_mjSzrl = themeVarMap_nHCGUd.resolve(null, ["--spacing"]);
              return spacingVar_mjSzrl && isQuarterStep_WkCuTa(val_zxruNA) ? `calc(${spacingVar_mjSzrl} * -${val_zxruNA})` : null;
            },
            handle: handleFn_QtMTyI
          }),
          registerCompletions_VddGyH(utilityKey_vCukWQ, () => [
          {
            values: themeVarMap_nHCGUd.get(["--spacing"]) ? spacingSteps_NjsqjM : [],
            supportsNegative: supportsNegative_ftaHuM,
            supportsFractions: supportsFractions_oxINsk,
            valueThemeKeys: themeKeys_doAsSE
          }]
          );
        }
        registerStaticUtility_zeqrZG("sr-only", [
        ["position", "absolute"],
        ["width", "1px"],
        ["height", "1px"],
        ["padding", "0"],
        ["margin", "-1px"],
        ["overflow", "hidden"],
        ["clip", "rect(0, 0, 0, 0)"],
        ["white-space", "nowrap"],
        ["border-width", "0"]]
        ),
        registerStaticUtility_zeqrZG("not-sr-only", [
        ["position", "static"],
        ["width", "auto"],
        ["height", "auto"],
        ["padding", "0"],
        ["margin", "0"],
        ["overflow", "visible"],
        ["clip", "auto"],
        ["white-space", "normal"]]
        ),
        registerStaticUtility_zeqrZG("pointer-events-none", [["pointer-events", "none"]]),
        registerStaticUtility_zeqrZG("pointer-events-auto", [["pointer-events", "auto"]]),
        registerStaticUtility_zeqrZG("visible", [["visibility", "visible"]]),
        registerStaticUtility_zeqrZG("invisible", [["visibility", "hidden"]]),
        registerStaticUtility_zeqrZG("collapse", [["visibility", "collapse"]]),
        registerStaticUtility_zeqrZG("static", [["position", "static"]]),
        registerStaticUtility_zeqrZG("fixed", [["position", "fixed"]]),
        registerStaticUtility_zeqrZG("absolute", [["position", "absolute"]]),
        registerStaticUtility_zeqrZG("relative", [["position", "relative"]]),
        registerStaticUtility_zeqrZG("sticky", [["position", "sticky"]]);
        for (let [shortKey_GQuTpU, cssProp_SIlmxW] of [
        ["inset", "inset"],
        ["inset-x", "inset-inline"],
        ["inset-y", "inset-block"],
        ["start", "inset-inline-start"],
        ["end", "inset-inline-end"],
        ["top", "top"],
        ["right", "right"],
        ["bottom", "bottom"],
        ["left", "left"]])

        registerStaticUtility_zeqrZG(`${shortKey_GQuTpU}-auto`, [[cssProp_SIlmxW, "auto"]]),
        registerStaticUtility_zeqrZG(`${shortKey_GQuTpU}-full`, [[cssProp_SIlmxW, "100%"]]),
        registerStaticUtility_zeqrZG(`-${shortKey_GQuTpU}-full`, [[cssProp_SIlmxW, "-100%"]]),
        registerSpacingUtility_YCMYBk(shortKey_GQuTpU, ["--inset", "--spacing"], (spacingValue_whtttt) => [makeDeclarationNode_xYlaTt(cssProp_SIlmxW, spacingValue_whtttt)], {
          supportsNegative: !0,
          supportsFractions: !0
        });
        registerStaticUtility_zeqrZG("isolate", [["isolation", "isolate"]]),
        registerStaticUtility_zeqrZG("isolation-auto", [["isolation", "auto"]]),
        registerStaticUtility_zeqrZG("z-auto", [["z-index", "auto"]]),
        registerFunctionalHandler_VuzNfs("z", {
          supportsNegative: !0,
          handleBareValue: ({ value: zIndexValue_kUFuDL }) => isNonNegativeInteger_QISFSJ(zIndexValue_kUFuDL) ? zIndexValue_kUFuDL : null,
          themeKeys: ["--z-index"],
          handle: (resolvedZIndex_DxcYzf) => [makeDeclarationNode_xYlaTt("z-index", resolvedZIndex_DxcYzf)]
        }),
        registerCompletions_VddGyH("z", () => [
        {
          supportsNegative: !0,
          values: ["0", "10", "20", "30", "40", "50"],
          valueThemeKeys: ["--z-index"]
        }]
        ),
        registerStaticUtility_zeqrZG("order-first", [["order", "-9999"]]),
        registerStaticUtility_zeqrZG("order-last", [["order", "9999"]]),
        registerStaticUtility_zeqrZG("order-none", [["order", "0"]]),
        registerFunctionalHandler_VuzNfs("order", {
          supportsNegative: !0,
          handleBareValue: ({ value: orderValue_CBQKIU }) => isNonNegativeInteger_QISFSJ(orderValue_CBQKIU) ? orderValue_CBQKIU : null,
          themeKeys: ["--order"],
          handle: (resolvedOrder_QsTHWb) => [makeDeclarationNode_xYlaTt("order", resolvedOrder_QsTHWb)]
        }),
        registerCompletions_VddGyH("order", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 12 }, (unusedOrderValue_cubalp, orderIndex_mHNKpK) => `${orderIndex_mHNKpK + 1}`),
          valueThemeKeys: ["--order"]
        }]
        ),
        registerStaticUtility_zeqrZG("col-auto", [["grid-column", "auto"]]),
        registerFunctionalHandler_VuzNfs("col", {
          supportsNegative: !0,
          handleBareValue: ({ value: colValue_qpBuXu }) => isNonNegativeInteger_QISFSJ(colValue_qpBuXu) ? colValue_qpBuXu : null,
          themeKeys: ["--grid-column"],
          handle: (resolvedCol_rjkFtF) => [makeDeclarationNode_xYlaTt("grid-column", resolvedCol_rjkFtF)]
        }),
        registerStaticUtility_zeqrZG("col-span-full", [["grid-column", "1 / -1"]]),
        registerFunctionalHandler_VuzNfs("col-span", {
          handleBareValue: ({ value: colSpanValue_ZbzoPp }) => isNonNegativeInteger_QISFSJ(colSpanValue_ZbzoPp) ? colSpanValue_ZbzoPp : null,
          handle: (resolvedColSpan_upUoHh) => [makeDeclarationNode_xYlaTt("grid-column", `span ${resolvedColSpan_upUoHh} / span ${resolvedColSpan_upUoHh}`)]
        }),
        registerStaticUtility_zeqrZG("col-start-auto", [["grid-column-start", "auto"]]),
        registerFunctionalHandler_VuzNfs("col-start", {
          supportsNegative: !0,
          handleBareValue: ({ value: colStartValue_duDcBe }) => isNonNegativeInteger_QISFSJ(colStartValue_duDcBe) ? colStartValue_duDcBe : null,
          themeKeys: ["--grid-column-start"],
          handle: (resolvedColStart_JgVnkF) => [makeDeclarationNode_xYlaTt("grid-column-start", resolvedColStart_JgVnkF)]
        }),
        registerStaticUtility_zeqrZG("col-end-auto", [["grid-column-end", "auto"]]),
        registerFunctionalHandler_VuzNfs("col-end", {
          supportsNegative: !0,
          handleBareValue: ({ value: colEndValue_MmJwgX }) => isNonNegativeInteger_QISFSJ(colEndValue_MmJwgX) ? colEndValue_MmJwgX : null,
          themeKeys: ["--grid-column-end"],
          handle: (resolvedColEnd_fdYiec) => [makeDeclarationNode_xYlaTt("grid-column-end", resolvedColEnd_fdYiec)]
        }),
        registerCompletions_VddGyH("col-span", () => [
        {
          values: Array.from({ length: 12 }, (unusedColSpanValue_tntZJV, colSpanIndex_KYZPwP) => `${colSpanIndex_KYZPwP + 1}`),
          valueThemeKeys: []
        }]
        ),
        registerCompletions_VddGyH("col-start", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (unusedColStartValue_gWnZuN, colStartIndex_SfuSwU) => `${colStartIndex_SfuSwU + 1}`),
          valueThemeKeys: ["--grid-column-start"]
        }]
        ),
        registerCompletions_VddGyH("col-end", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (unusedColEndValue_eVwiqy, colEndIndex_XkLzKe) => `${colEndIndex_XkLzKe + 1}`),
          valueThemeKeys: ["--grid-column-end"]
        }]
        ),
        registerStaticUtility_zeqrZG("row-auto", [["grid-row", "auto"]]),
        registerFunctionalHandler_VuzNfs("row", {
          supportsNegative: !0,
          handleBareValue: ({ value: rowValue_bKLuhA }) => isNonNegativeInteger_QISFSJ(rowValue_bKLuhA) ? rowValue_bKLuhA : null,
          themeKeys: ["--grid-row"],
          handle: (resolvedRow_ysCZGv) => [makeDeclarationNode_xYlaTt("grid-row", resolvedRow_ysCZGv)]
        }),
        registerStaticUtility_zeqrZG("row-span-full", [["grid-row", "1 / -1"]]),
        registerFunctionalHandler_VuzNfs("row-span", {
          themeKeys: [],
          handleBareValue: ({ value: rowSpanValue_ZSqMDF }) => isNonNegativeInteger_QISFSJ(rowSpanValue_ZSqMDF) ? rowSpanValue_ZSqMDF : null,
          handle: (resolvedRowSpan_JqGHMc) => [makeDeclarationNode_xYlaTt("grid-row", `span ${resolvedRowSpan_JqGHMc} / span ${resolvedRowSpan_JqGHMc}`)]
        }),
        registerStaticUtility_zeqrZG("row-start-auto", [["grid-row-start", "auto"]]),
        registerFunctionalHandler_VuzNfs("row-start", {
          supportsNegative: !0,
          handleBareValue: ({ value: rowStartValue_tLjUqu }) => isNonNegativeInteger_QISFSJ(rowStartValue_tLjUqu) ? rowStartValue_tLjUqu : null,
          themeKeys: ["--grid-row-start"],
          handle: (resolvedRowStart_KQqRYB) => [makeDeclarationNode_xYlaTt("grid-row-start", resolvedRowStart_KQqRYB)]
        }),
        registerStaticUtility_zeqrZG("row-end-auto", [["grid-row-end", "auto"]]),
        registerFunctionalHandler_VuzNfs("row-end", {
          supportsNegative: !0,
          handleBareValue: ({ value: rowEndValue_QnYGvf }) => isNonNegativeInteger_QISFSJ(rowEndValue_QnYGvf) ? rowEndValue_QnYGvf : null,
          themeKeys: ["--grid-row-end"],
          handle: (resolvedRowEnd_LQTYBT) => [makeDeclarationNode_xYlaTt("grid-row-end", resolvedRowEnd_LQTYBT)]
        }),
        registerCompletions_VddGyH("row-span", () => [
        {
          values: Array.from({ length: 12 }, (unusedRowSpanValue_zvHanM, rowSpanIndex_kEqTeo) => `${rowSpanIndex_kEqTeo + 1}`),
          valueThemeKeys: []
        }]
        ),
        registerCompletions_VddGyH("row-start", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (unusedRowStartValue_nNsApr, rowStartIndex_bKVQWb) => `${rowStartIndex_bKVQWb + 1}`),
          valueThemeKeys: ["--grid-row-start"]
        }]
        ),
        registerCompletions_VddGyH("row-end", () => [
        {
          supportsNegative: !0,
          values: Array.from({ length: 13 }, (unusedRowEndValue_JFkdyG, rowEndIndex_tiyYbh) => `${rowEndIndex_tiyYbh + 1}`),
          valueThemeKeys: ["--grid-row-end"]
        }]
        ),
        registerStaticUtility_zeqrZG("float-start", [["float", "inline-start"]]),
        registerStaticUtility_zeqrZG("float-end", [["float", "inline-end"]]),
        registerStaticUtility_zeqrZG("float-right", [["float", "right"]]),
        registerStaticUtility_zeqrZG("float-left", [["float", "left"]]),
        registerStaticUtility_zeqrZG("float-none", [["float", "none"]]),
        registerStaticUtility_zeqrZG("clear-start", [["clear", "inline-start"]]),
        registerStaticUtility_zeqrZG("clear-end", [["clear", "inline-end"]]),
        registerStaticUtility_zeqrZG("clear-right", [["clear", "right"]]),
        registerStaticUtility_zeqrZG("clear-left", [["clear", "left"]]),
        registerStaticUtility_zeqrZG("clear-both", [["clear", "both"]]),
        registerStaticUtility_zeqrZG("clear-none", [["clear", "none"]]);
        for (let [marginShortKey_LLNVTY, marginCssProperty_WAzJQz] of [
        ["m", "margin"],
        ["mx", "margin-inline"],
        ["my", "margin-block"],
        ["ms", "margin-inline-start"],
        ["me", "margin-inline-end"],
        ["mt", "margin-top"],
        ["mr", "margin-right"],
        ["mb", "margin-bottom"],
        ["ml", "margin-left"]])

        registerStaticUtility_zeqrZG(`${marginShortKey_LLNVTY}-auto`, [[marginCssProperty_WAzJQz, "auto"]]),
        registerSpacingUtility_YCMYBk(marginShortKey_LLNVTY, ["--margin", "--spacing"], (marginValue_mwamkm) => [makeDeclarationNode_xYlaTt(marginCssProperty_WAzJQz, marginValue_mwamkm)], {
          supportsNegative: !0
        });
        registerStaticUtility_zeqrZG("box-border", [["box-sizing", "border-box"]]),
        registerStaticUtility_zeqrZG("box-content", [["box-sizing", "content-box"]]),
        registerStaticUtility_zeqrZG("line-clamp-none", [
        ["overflow", "visible"],
        ["display", "block"],
        ["-webkit-box-orient", "horizontal"],
        ["-webkit-line-clamp", "unset"]]
        ),
        registerFunctionalHandler_VuzNfs("line-clamp", {
          themeKeys: ["--line-clamp"],
          handleBareValue: ({ value: lineClampValue_WPXpze }) => isNonNegativeInteger_QISFSJ(lineClampValue_WPXpze) ? lineClampValue_WPXpze : null,
          handle: (resolvedLineClamp_FRWBUV) => [
          makeDeclarationNode_xYlaTt("overflow", "hidden"),
          makeDeclarationNode_xYlaTt("display", "-webkit-box"),
          makeDeclarationNode_xYlaTt("-webkit-box-orient", "vertical"),
          makeDeclarationNode_xYlaTt("-webkit-line-clamp", resolvedLineClamp_FRWBUV)]

        }),
        registerCompletions_VddGyH("line-clamp", () => [
        {
          values: ["1", "2", "3", "4", "5", "6"],
          valueThemeKeys: ["--line-clamp"]
        }]
        ),
        registerStaticUtility_zeqrZG("block", [["display", "block"]]),
        registerStaticUtility_zeqrZG("inline-block", [["display", "inline-block"]]),
        registerStaticUtility_zeqrZG("inline", [["display", "inline"]]),
        registerStaticUtility_zeqrZG("hidden", [["display", "none"]]),
        registerStaticUtility_zeqrZG("inline-flex", [["display", "inline-flex"]]),
        registerStaticUtility_zeqrZG("table", [["display", "table"]]),
        registerStaticUtility_zeqrZG("inline-table", [["display", "inline-table"]]),
        registerStaticUtility_zeqrZG("table-caption", [["display", "table-caption"]]),
        registerStaticUtility_zeqrZG("table-cell", [["display", "table-cell"]]),
        registerStaticUtility_zeqrZG("table-column", [["display", "table-column"]]),
        registerStaticUtility_zeqrZG("table-column-group", [["display", "table-column-group"]]),
        registerStaticUtility_zeqrZG("table-footer-group", [["display", "table-footer-group"]]),
        registerStaticUtility_zeqrZG("table-header-group", [["display", "table-header-group"]]),
        registerStaticUtility_zeqrZG("table-row-group", [["display", "table-row-group"]]),
        registerStaticUtility_zeqrZG("table-row", [["display", "table-row"]]),
        registerStaticUtility_zeqrZG("flow-root", [["display", "flow-root"]]),
        registerStaticUtility_zeqrZG("flex", [["display", "flex"]]),
        registerStaticUtility_zeqrZG("grid", [["display", "grid"]]),
        registerStaticUtility_zeqrZG("inline-grid", [["display", "inline-grid"]]),
        registerStaticUtility_zeqrZG("contents", [["display", "contents"]]),
        registerStaticUtility_zeqrZG("list-item", [["display", "list-item"]]),
        registerStaticUtility_zeqrZG("field-sizing-content", [["field-sizing", "content"]]),
        registerStaticUtility_zeqrZG("field-sizing-fixed", [["field-sizing", "fixed"]]),
        registerStaticUtility_zeqrZG("aspect-auto", [["aspect-ratio", "auto"]]),
        registerStaticUtility_zeqrZG("aspect-square", [["aspect-ratio", "1 / 1"]]),
        registerFunctionalHandler_VuzNfs("aspect", {
          themeKeys: ["--aspect"],
          handleBareValue: ({ fraction: aspectFractionValue_mOzVnl }) => {
            if (null === aspectFractionValue_mOzVnl) return null;
            let [aspectNumerator_INtcGX, aspectDenominator_vtroWf] = splitOnTopLevel_EfBwUv(aspectFractionValue_mOzVnl, "/");
            return isNonNegativeInteger_QISFSJ(aspectNumerator_INtcGX) && isNonNegativeInteger_QISFSJ(aspectDenominator_vtroWf) ? aspectFractionValue_mOzVnl : null;
          },
          handle: (resolvedAspectRatio_uYjVDd) => [makeDeclarationNode_xYlaTt("aspect-ratio", resolvedAspectRatio_uYjVDd)]
        });
        for (let [sizeVariant_ZitTyB, cssValue_UUMFtX] of [
        ["full", "100%"],
        ["svw", "100svw"],
        ["lvw", "100lvw"],
        ["dvw", "100dvw"],
        ["svh", "100svh"],
        ["lvh", "100lvh"],
        ["dvh", "100dvh"],
        ["min", "min-content"],
        ["max", "max-content"],
        ["fit", "fit-content"]])

        registerStaticUtility_zeqrZG(`size-${sizeVariant_ZitTyB}`, [
        ["--tw-sort", "size"],
        ["width", cssValue_UUMFtX],
        ["height", cssValue_UUMFtX]]
        ),
        registerStaticUtility_zeqrZG(`w-${sizeVariant_ZitTyB}`, [["width", cssValue_UUMFtX]]),
        registerStaticUtility_zeqrZG(`h-${sizeVariant_ZitTyB}`, [["height", cssValue_UUMFtX]]),
        registerStaticUtility_zeqrZG(`min-w-${sizeVariant_ZitTyB}`, [["min-width", cssValue_UUMFtX]]),
        registerStaticUtility_zeqrZG(`min-h-${sizeVariant_ZitTyB}`, [["min-height", cssValue_UUMFtX]]),
        registerStaticUtility_zeqrZG(`max-w-${sizeVariant_ZitTyB}`, [["max-width", cssValue_UUMFtX]]),
        registerStaticUtility_zeqrZG(`max-h-${sizeVariant_ZitTyB}`, [["max-height", cssValue_UUMFtX]]);
        registerStaticUtility_zeqrZG("size-auto", [
        ["--tw-sort", "size"],
        ["width", "auto"],
        ["height", "auto"]]
        ),
        registerStaticUtility_zeqrZG("w-auto", [["width", "auto"]]),
        registerStaticUtility_zeqrZG("h-auto", [["height", "auto"]]),
        registerStaticUtility_zeqrZG("min-w-auto", [["min-width", "auto"]]),
        registerStaticUtility_zeqrZG("min-h-auto", [["min-height", "auto"]]),
        registerStaticUtility_zeqrZG("h-lh", [["height", "1lh"]]),
        registerStaticUtility_zeqrZG("min-h-lh", [["min-height", "1lh"]]),
        registerStaticUtility_zeqrZG("max-h-lh", [["max-height", "1lh"]]),
        registerStaticUtility_zeqrZG("w-screen", [["width", "100vw"]]),
        registerStaticUtility_zeqrZG("min-w-screen", [["min-width", "100vw"]]),
        registerStaticUtility_zeqrZG("max-w-screen", [["max-width", "100vw"]]),
        registerStaticUtility_zeqrZG("h-screen", [["height", "100vh"]]),
        registerStaticUtility_zeqrZG("min-h-screen", [["min-height", "100vh"]]),
        registerStaticUtility_zeqrZG("max-h-screen", [["max-height", "100vh"]]),
        registerStaticUtility_zeqrZG("max-w-none", [["max-width", "none"]]),
        registerStaticUtility_zeqrZG("max-h-none", [["max-height", "none"]]),
        registerSpacingUtility_YCMYBk(
          "size",
          ["--size", "--spacing"],
          (sizeValue_djHkHN) => [makeDeclarationNode_xYlaTt("--tw-sort", "size"), makeDeclarationNode_xYlaTt("width", sizeValue_djHkHN), makeDeclarationNode_xYlaTt("height", sizeValue_djHkHN)],
          { supportsFractions: !0 }
        );
        for (let [utilKey_TXfSMG, themeKeys_ofDbgO, cssProp_QIBDeI] of [
        ["w", ["--width", "--spacing", "--container"], "width"],
        ["min-w", ["--min-width", "--spacing", "--container"], "min-width"],
        ["max-w", ["--max-width", "--spacing", "--container"], "max-width"],
        ["h", ["--height", "--spacing"], "height"],
        ["min-h", ["--min-height", "--height", "--spacing"], "min-height"],
        ["max-h", ["--max-height", "--height", "--spacing"], "max-height"]])

        registerSpacingUtility_YCMYBk(utilKey_TXfSMG, themeKeys_ofDbgO, (value_cBeQlY) => [makeDeclarationNode_xYlaTt(cssProp_QIBDeI, value_cBeQlY)], { supportsFractions: !0 });
        utilityRegistry_fatAmE.static("container", () => {
          let breakpointVals_AlAlVv = [...themeVarMap_nHCGUd.namespace("--breakpoint").values()];
          breakpointVals_AlAlVv.sort((a_ZbCLiS, b_ePNBfH) => compareWithOrder_AnSyON(a_ZbCLiS, b_ePNBfH, "asc"));
          let resultList_zIKrUG = [
          makeDeclarationNode_xYlaTt("--tw-sort", "--tw-container-component"),
          makeDeclarationNode_xYlaTt("width", "100%")];

          for (let v_oTJKSs of breakpointVals_AlAlVv)
          resultList_zIKrUG.push(processAtRule_lWgxgY("@media", `(width >= ${v_oTJKSs})`, [makeDeclarationNode_xYlaTt("max-width", v_oTJKSs)]));
          return resultList_zIKrUG;
        }),
        registerStaticUtility_zeqrZG("flex-auto", [["flex", "auto"]]),
        registerStaticUtility_zeqrZG("flex-initial", [["flex", "0 auto"]]),
        registerStaticUtility_zeqrZG("flex-none", [["flex", "none"]]),
        utilityRegistry_fatAmE.functional("flex", (flexArg_ERbARW) => {
          if (flexArg_ERbARW.value) {
            if ("arbitrary" === flexArg_ERbARW.value.kind)
            return flexArg_ERbARW.modifier ? void 0 : [makeDeclarationNode_xYlaTt("flex", flexArg_ERbARW.value.value)];
            if (flexArg_ERbARW.value.fraction) {
              let [flexNumerator_YafEYJ, flexDenominator_QmZcmP] = splitOnTopLevel_EfBwUv(flexArg_ERbARW.value.fraction, "/");
              return isNonNegativeInteger_QISFSJ(flexNumerator_YafEYJ) && isNonNegativeInteger_QISFSJ(flexDenominator_QmZcmP) ?
              [makeDeclarationNode_xYlaTt("flex", `calc(${flexArg_ERbARW.value.fraction} * 100%)`)] :
              void 0;
            }
            if (isNonNegativeInteger_QISFSJ(flexArg_ERbARW.value.value))
            return flexArg_ERbARW.modifier ? void 0 : [makeDeclarationNode_xYlaTt("flex", flexArg_ERbARW.value.value)];
          }
        }),
        registerCompletions_VddGyH("flex", () => [{ supportsFractions: !0 }]),
        registerFunctionalHandler_VuzNfs("shrink", {
          defaultValue: "1",
          handleBareValue: ({ value: shrinkValue_IlZHHx }) => isNonNegativeInteger_QISFSJ(shrinkValue_IlZHHx) ? shrinkValue_IlZHHx : null,
          handle: (resolvedShrink_DMlmjA) => [makeDeclarationNode_xYlaTt("flex-shrink", resolvedShrink_DMlmjA)]
        }),
        registerFunctionalHandler_VuzNfs("grow", {
          defaultValue: "1",
          handleBareValue: ({ value: growValue_EtxskD }) => isNonNegativeInteger_QISFSJ(growValue_EtxskD) ? growValue_EtxskD : null,
          handle: (resolvedGrow_QgJXpo) => [makeDeclarationNode_xYlaTt("flex-grow", resolvedGrow_QgJXpo)]
        }),
        registerCompletions_VddGyH("shrink", () => [
        { values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 }]
        ),
        registerCompletions_VddGyH("grow", () => [
        { values: ["0"], valueThemeKeys: [], hasDefaultValue: !0 }]
        ),
        registerStaticUtility_zeqrZG("basis-auto", [["flex-basis", "auto"]]),
        registerStaticUtility_zeqrZG("basis-full", [["flex-basis", "100%"]]),
        registerSpacingUtility_YCMYBk(
          "basis",
          ["--flex-basis", "--spacing", "--container"],
          (basisVal_FCyRPW) => [makeDeclarationNode_xYlaTt("flex-basis", basisVal_FCyRPW)],
          { supportsFractions: !0 }
        ),
        registerStaticUtility_zeqrZG("table-auto", [["table-layout", "auto"]]),
        registerStaticUtility_zeqrZG("table-fixed", [["table-layout", "fixed"]]),
        registerStaticUtility_zeqrZG("caption-top", [["caption-side", "top"]]),
        registerStaticUtility_zeqrZG("caption-bottom", [["caption-side", "bottom"]]),
        registerStaticUtility_zeqrZG("border-collapse", [["border-collapse", "collapse"]]),
        registerStaticUtility_zeqrZG("border-separate", [["border-collapse", "separate"]]);
        let makeBorderSpacingVarInit_GmRRJN = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-border-spacing-x", "0", "<length>"),
        makeAtPropertyNode_DIaSSt("--tw-border-spacing-y", "0", "<length>")]
        );
        registerSpacingUtility_YCMYBk("border-spacing", ["--border-spacing", "--spacing"], (v_ZZOxHw) => [
        makeBorderSpacingVarInit_GmRRJN(),
        makeDeclarationNode_xYlaTt("--tw-border-spacing-x", v_ZZOxHw),
        makeDeclarationNode_xYlaTt("--tw-border-spacing-y", v_ZZOxHw),
        makeDeclarationNode_xYlaTt(
          "border-spacing",
          "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
        )]
        ),
        registerSpacingUtility_YCMYBk("border-spacing-x", ["--border-spacing", "--spacing"], (v_FcFrWc) => [
        makeBorderSpacingVarInit_GmRRJN(),
        makeDeclarationNode_xYlaTt("--tw-border-spacing-x", v_FcFrWc),
        makeDeclarationNode_xYlaTt(
          "border-spacing",
          "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
        )]
        ),
        registerSpacingUtility_YCMYBk("border-spacing-y", ["--border-spacing", "--spacing"], (v_bBFgOG) => [
        makeBorderSpacingVarInit_GmRRJN(),
        makeDeclarationNode_xYlaTt("--tw-border-spacing-y", v_bBFgOG),
        makeDeclarationNode_xYlaTt(
          "border-spacing",
          "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
        )]
        ),
        registerStaticUtility_zeqrZG("origin-center", [["transform-origin", "center"]]),
        registerStaticUtility_zeqrZG("origin-top", [["transform-origin", "top"]]),
        registerStaticUtility_zeqrZG("origin-top-right", [["transform-origin", "top right"]]),
        registerStaticUtility_zeqrZG("origin-right", [["transform-origin", "right"]]),
        registerStaticUtility_zeqrZG("origin-bottom-right", [["transform-origin", "bottom right"]]),
        registerStaticUtility_zeqrZG("origin-bottom", [["transform-origin", "bottom"]]),
        registerStaticUtility_zeqrZG("origin-bottom-left", [["transform-origin", "bottom left"]]),
        registerStaticUtility_zeqrZG("origin-left", [["transform-origin", "left"]]),
        registerStaticUtility_zeqrZG("origin-top-left", [["transform-origin", "top left"]]),
        registerFunctionalHandler_VuzNfs("origin", {
          themeKeys: ["--transform-origin"],
          handle: (val_ThbfKF) => [makeDeclarationNode_xYlaTt("transform-origin", val_ThbfKF)]
        }),
        registerStaticUtility_zeqrZG("perspective-origin-center", [["perspective-origin", "center"]]),
        registerStaticUtility_zeqrZG("perspective-origin-top", [["perspective-origin", "top"]]),
        registerStaticUtility_zeqrZG("perspective-origin-top-right", [
        ["perspective-origin", "top right"]]
        ),
        registerStaticUtility_zeqrZG("perspective-origin-right", [["perspective-origin", "right"]]),
        registerStaticUtility_zeqrZG("perspective-origin-bottom-right", [
        ["perspective-origin", "bottom right"]]
        ),
        registerStaticUtility_zeqrZG("perspective-origin-bottom", [["perspective-origin", "bottom"]]),
        registerStaticUtility_zeqrZG("perspective-origin-bottom-left", [
        ["perspective-origin", "bottom left"]]
        ),
        registerStaticUtility_zeqrZG("perspective-origin-left", [["perspective-origin", "left"]]),
        registerStaticUtility_zeqrZG("perspective-origin-top-left", [
        ["perspective-origin", "top left"]]
        ),
        registerFunctionalHandler_VuzNfs("perspective-origin", {
          themeKeys: ["--perspective-origin"],
          handle: (val_vZZRAJ) => [makeDeclarationNode_xYlaTt("perspective-origin", val_vZZRAJ)]
        }),
        registerStaticUtility_zeqrZG("perspective-none", [["perspective", "none"]]),
        registerFunctionalHandler_VuzNfs("perspective", {
          themeKeys: ["--perspective"],
          handle: (val_ntVKaE) => [makeDeclarationNode_xYlaTt("perspective", val_ntVKaE)]
        });
        let makeTranslateVarInit_ClApMK = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-translate-x", "0"),
        makeAtPropertyNode_DIaSSt("--tw-translate-y", "0"),
        makeAtPropertyNode_DIaSSt("--tw-translate-z", "0")]
        );
        registerStaticUtility_zeqrZG("translate-none", [["translate", "none"]]),
        registerStaticUtility_zeqrZG("-translate-full", [
        makeTranslateVarInit_ClApMK,
        ["--tw-translate-x", "-100%"],
        ["--tw-translate-y", "-100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]
        ),
        registerStaticUtility_zeqrZG("translate-full", [
        makeTranslateVarInit_ClApMK,
        ["--tw-translate-x", "100%"],
        ["--tw-translate-y", "100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]
        ),
        registerSpacingUtility_YCMYBk(
          "translate",
          ["--translate", "--spacing"],
          (val_epptpE) => [
          makeTranslateVarInit_ClApMK(),
          makeDeclarationNode_xYlaTt("--tw-translate-x", val_epptpE),
          makeDeclarationNode_xYlaTt("--tw-translate-y", val_epptpE),
          makeDeclarationNode_xYlaTt("translate", "var(--tw-translate-x) var(--tw-translate-y)")],

          { supportsNegative: !0, supportsFractions: !0 }
        );
        for (let axis_yFrZKr of ["x", "y"])
        registerStaticUtility_zeqrZG(`-translate-${axis_yFrZKr}-full`, [
        makeTranslateVarInit_ClApMK,
        [`--tw-translate-${axis_yFrZKr}`, "-100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]
        ),
        registerStaticUtility_zeqrZG(`translate-${axis_yFrZKr}-full`, [
        makeTranslateVarInit_ClApMK,
        [`--tw-translate-${axis_yFrZKr}`, "100%"],
        ["translate", "var(--tw-translate-x) var(--tw-translate-y)"]]
        ),
        registerSpacingUtility_YCMYBk(
          `translate-${axis_yFrZKr}`,
          ["--translate", "--spacing"],
          (val_ANiALc) => [
          makeTranslateVarInit_ClApMK(),
          makeDeclarationNode_xYlaTt(`--tw-translate-${axis_yFrZKr}`, val_ANiALc),
          makeDeclarationNode_xYlaTt("translate", "var(--tw-translate-x) var(--tw-translate-y)")],

          { supportsNegative: !0, supportsFractions: !0 }
        );
        registerSpacingUtility_YCMYBk(
          "translate-z",
          ["--translate", "--spacing"],
          (val_QxhtUm) => [
          makeTranslateVarInit_ClApMK(),
          makeDeclarationNode_xYlaTt("--tw-translate-z", val_QxhtUm),
          makeDeclarationNode_xYlaTt(
            "translate",
            "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)"
          )],

          { supportsNegative: !0 }
        ),
        registerStaticUtility_zeqrZG("translate-3d", [
        makeTranslateVarInit_ClApMK,
        [
        "translate",
        "var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)"]]

        );
        let makeScaleVarInit_yDAeTO = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-scale-x", "1"),
        makeAtPropertyNode_DIaSSt("--tw-scale-y", "1"),
        makeAtPropertyNode_DIaSSt("--tw-scale-z", "1")]
        );
        function makeScaleHandler_hgDrEc({ negative: negative_WHGZSt }) {
          return (arg_AmIaGb) => {
            if (!arg_AmIaGb.value || arg_AmIaGb.modifier) return;
            let resolvedVal_lNVOfG;
            return "arbitrary" === arg_AmIaGb.value.kind ? (
            resolvedVal_lNVOfG = arg_AmIaGb.value.value, [makeDeclarationNode_xYlaTt("scale", resolvedVal_lNVOfG)]) : (
            resolvedVal_lNVOfG = themeVarMap_nHCGUd.resolve(arg_AmIaGb.value.value, ["--scale"]),
            !resolvedVal_lNVOfG && isNonNegativeInteger_QISFSJ(arg_AmIaGb.value.value) && (resolvedVal_lNVOfG = `${arg_AmIaGb.value.value}%`),
            resolvedVal_lNVOfG ? (
            resolvedVal_lNVOfG = negative_WHGZSt ? `calc(${resolvedVal_lNVOfG} * -1)` : resolvedVal_lNVOfG,
            [
            makeScaleVarInit_yDAeTO(),
            makeDeclarationNode_xYlaTt("--tw-scale-x", resolvedVal_lNVOfG),
            makeDeclarationNode_xYlaTt("--tw-scale-y", resolvedVal_lNVOfG),
            makeDeclarationNode_xYlaTt("--tw-scale-z", resolvedVal_lNVOfG),
            makeDeclarationNode_xYlaTt("scale", "var(--tw-scale-x) var(--tw-scale-y)")]) :

            void 0);
          };
        }
        registerStaticUtility_zeqrZG("scale-none", [["scale", "none"]]),
        utilityRegistry_fatAmE.functional("-scale", makeScaleHandler_hgDrEc({ negative: !0 })),
        utilityRegistry_fatAmE.functional("scale", makeScaleHandler_hgDrEc({ negative: !1 })),
        registerCompletions_VddGyH("scale", () => [
        {
          supportsNegative: !0,
          values: [
          "0",
          "50",
          "75",
          "90",
          "95",
          "100",
          "105",
          "110",
          "125",
          "150",
          "200"],

          valueThemeKeys: ["--scale"]
        }]
        );
        for (let axis_iniALp of ["x", "y", "z"])
        registerFunctionalHandler_VuzNfs(`scale-${axis_iniALp}`, {
          supportsNegative: !0,
          themeKeys: ["--scale"],
          handleBareValue: ({ value: val_YqWASn }) => isNonNegativeInteger_QISFSJ(val_YqWASn) ? `${val_YqWASn}%` : null,
          handle: (v_LoWjPa) => [
          makeScaleVarInit_yDAeTO(),
          makeDeclarationNode_xYlaTt(`--tw-scale-${axis_iniALp}`, v_LoWjPa),
          makeDeclarationNode_xYlaTt(
            "scale",
            "var(--tw-scale-x) var(--tw-scale-y)" + (
            "z" === axis_iniALp ? " var(--tw-scale-z)" : "")
          )]

        }),
        registerCompletions_VddGyH(`scale-${axis_iniALp}`, () => [
        {
          supportsNegative: !0,
          values: [
          "0",
          "50",
          "75",
          "90",
          "95",
          "100",
          "105",
          "110",
          "125",
          "150",
          "200"],

          valueThemeKeys: ["--scale"]
        }]
        );
        function makeRotateHandler_nWktpB({ negative: negative_sTYCKZ }) {
          return (arg_TGJtDr) => {
            if (!arg_TGJtDr.value || arg_TGJtDr.modifier) return;
            let angleValue_QnyReN;
            if ("arbitrary" === arg_TGJtDr.value.kind) {
              angleValue_QnyReN = arg_TGJtDr.value.value;
              let dataType_NHsjBf = arg_TGJtDr.value.dataType ?? resolveCssType_DhcVtf(angleValue_QnyReN, ["angle", "vector"]);
              if ("vector" === dataType_NHsjBf) return [makeDeclarationNode_xYlaTt("rotate", `${angleValue_QnyReN} var(--tw-rotate)`)];
              if ("angle" !== dataType_NHsjBf) return [makeDeclarationNode_xYlaTt("rotate", angleValue_QnyReN)];
            } else if (
            angleValue_QnyReN = themeVarMap_nHCGUd.resolve(arg_TGJtDr.value.value, ["--rotate"]),
            !angleValue_QnyReN && isNonNegativeInteger_QISFSJ(arg_TGJtDr.value.value) && (angleValue_QnyReN = `${arg_TGJtDr.value.value}deg`),
            !angleValue_QnyReN)

            return;
            return [makeDeclarationNode_xYlaTt("rotate", negative_sTYCKZ ? `calc(${angleValue_QnyReN} * -1)` : angleValue_QnyReN)];
          };
        }
        registerStaticUtility_zeqrZG("scale-3d", [
        makeScaleVarInit_yDAeTO,
        ["scale", "var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)"]]
        ),
        registerStaticUtility_zeqrZG("rotate-none", [["rotate", "none"]]),
        utilityRegistry_fatAmE.functional("-rotate", makeRotateHandler_nWktpB({ negative: !0 })),
        utilityRegistry_fatAmE.functional("rotate", makeRotateHandler_nWktpB({ negative: !1 })),
        registerCompletions_VddGyH("rotate", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
          valueThemeKeys: ["--rotate"]
        }]
        );
        {
          let transformDefaultString_iVGGEP = [
            "var(--tw-rotate-x,)",
            "var(--tw-rotate-y,)",
            "var(--tw-rotate-z,)",
            "var(--tw-skew-x,)",
            "var(--tw-skew-y,)"].
            join(" "),
            makeTransformVarInit_QoxBKt = () =>
            makeAtRootNode_uVreCe([
            makeAtPropertyNode_DIaSSt("--tw-rotate-x"),
            makeAtPropertyNode_DIaSSt("--tw-rotate-y"),
            makeAtPropertyNode_DIaSSt("--tw-rotate-z"),
            makeAtPropertyNode_DIaSSt("--tw-skew-x"),
            makeAtPropertyNode_DIaSSt("--tw-skew-y")]
            );
          for (let axis_TrPPGA of ["x", "y", "z"])
          registerFunctionalHandler_VuzNfs(`rotate-${axis_TrPPGA}`, {
            supportsNegative: !0,
            themeKeys: ["--rotate"],
            handleBareValue: ({ value: val_KClFpn }) => isNonNegativeInteger_QISFSJ(val_KClFpn) ? `${val_KClFpn}deg` : null,
            handle: (v_BXinAf) => [
            makeTransformVarInit_QoxBKt(),
            makeDeclarationNode_xYlaTt(`--tw-rotate-${axis_TrPPGA}`, `rotate${axis_TrPPGA.toUpperCase()}(${v_BXinAf})`),
            makeDeclarationNode_xYlaTt("transform", transformDefaultString_iVGGEP)]

          }),
          registerCompletions_VddGyH(`rotate-${axis_TrPPGA}`, () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"],
            valueThemeKeys: ["--rotate"]
          }]
          );
          registerFunctionalHandler_VuzNfs("skew", {
            supportsNegative: !0,
            themeKeys: ["--skew"],
            handleBareValue: ({ value: val_UGveXt }) => isNonNegativeInteger_QISFSJ(val_UGveXt) ? `${val_UGveXt}deg` : null,
            handle: (v_bLUlSW) => [
            makeTransformVarInit_QoxBKt(),
            makeDeclarationNode_xYlaTt("--tw-skew-x", `skewX(${v_bLUlSW})`),
            makeDeclarationNode_xYlaTt("--tw-skew-y", `skewY(${v_bLUlSW})`),
            makeDeclarationNode_xYlaTt("transform", transformDefaultString_iVGGEP)]

          }),
          registerFunctionalHandler_VuzNfs("skew-x", {
            supportsNegative: !0,
            themeKeys: ["--skew"],
            handleBareValue: ({ value: val_NVVTLT }) => isNonNegativeInteger_QISFSJ(val_NVVTLT) ? `${val_NVVTLT}deg` : null,
            handle: (v_szNLmK) => [
            makeTransformVarInit_QoxBKt(),
            makeDeclarationNode_xYlaTt("--tw-skew-x", `skewX(${v_szNLmK})`),
            makeDeclarationNode_xYlaTt("transform", transformDefaultString_iVGGEP)]

          }),
          registerFunctionalHandler_VuzNfs("skew-y", {
            supportsNegative: !0,
            themeKeys: ["--skew"],
            handleBareValue: ({ value: val_TXpGnj }) => isNonNegativeInteger_QISFSJ(val_TXpGnj) ? `${val_TXpGnj}deg` : null,
            handle: (v_YMrcuv) => [
            makeTransformVarInit_QoxBKt(),
            makeDeclarationNode_xYlaTt("--tw-skew-y", `skewY(${v_YMrcuv})`),
            makeDeclarationNode_xYlaTt("transform", transformDefaultString_iVGGEP)]

          }),
          registerCompletions_VddGyH("skew", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12"],
            valueThemeKeys: ["--skew"]
          }]
          ),
          registerCompletions_VddGyH("skew-x", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12"],
            valueThemeKeys: ["--skew"]
          }]
          ),
          registerCompletions_VddGyH("skew-y", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "3", "6", "12"],
            valueThemeKeys: ["--skew"]
          }]
          ),
          utilityRegistry_fatAmE.functional("transform", (arg_uqdrqr) => {
            if (arg_uqdrqr.modifier) return;
            let finalValue_twGZsD = null;
            return (
              arg_uqdrqr.value ?
              "arbitrary" === arg_uqdrqr.value.kind && (finalValue_twGZsD = arg_uqdrqr.value.value) :
              finalValue_twGZsD = transformDefaultString_iVGGEP,
              null !== finalValue_twGZsD ? [makeTransformVarInit_QoxBKt(), makeDeclarationNode_xYlaTt("transform", finalValue_twGZsD)] : void 0);

          }),
          registerCompletions_VddGyH("transform", () => [{ hasDefaultValue: !0 }]),
          registerStaticUtility_zeqrZG("transform-cpu", [["transform", transformDefaultString_iVGGEP]]),
          registerStaticUtility_zeqrZG("transform-gpu", [["transform", `translateZ(0) ${transformDefaultString_iVGGEP}`]]),
          registerStaticUtility_zeqrZG("transform-none", [["transform", "none"]]);
        }
        registerStaticUtility_zeqrZG("transform-flat", [["transform-style", "flat"]]),
        registerStaticUtility_zeqrZG("transform-3d", [["transform-style", "preserve-3d"]]),
        registerStaticUtility_zeqrZG("transform-content", [["transform-box", "content-box"]]),
        registerStaticUtility_zeqrZG("transform-border", [["transform-box", "border-box"]]),
        registerStaticUtility_zeqrZG("transform-fill", [["transform-box", "fill-box"]]),
        registerStaticUtility_zeqrZG("transform-stroke", [["transform-box", "stroke-box"]]),
        registerStaticUtility_zeqrZG("transform-view", [["transform-box", "view-box"]]),
        registerStaticUtility_zeqrZG("backface-visible", [["backface-visibility", "visible"]]),
        registerStaticUtility_zeqrZG("backface-hidden", [["backface-visibility", "hidden"]]);
        for (let cursorValue_uQMdZY of [
        "auto",
        "default",
        "pointer",
        "wait",
        "text",
        "move",
        "help",
        "not-allowed",
        "none",
        "context-menu",
        "progress",
        "cell",
        "crosshair",
        "vertical-text",
        "alias",
        "copy",
        "no-drop",
        "grab",
        "grabbing",
        "all-scroll",
        "col-resize",
        "row-resize",
        "n-resize",
        "e-resize",
        "s-resize",
        "w-resize",
        "ne-resize",
        "nw-resize",
        "se-resize",
        "sw-resize",
        "ew-resize",
        "ns-resize",
        "nesw-resize",
        "nwse-resize",
        "zoom-in",
        "zoom-out"])

        registerStaticUtility_zeqrZG(`cursor-${cursorValue_uQMdZY}`, [["cursor", cursorValue_uQMdZY]]);
        registerFunctionalHandler_VuzNfs("cursor", {
          themeKeys: ["--cursor"],
          handle: (cursorValue_RaEKZy) => [makeDeclarationNode_xYlaTt("cursor", cursorValue_RaEKZy)]
        });
        for (let touchValue_oLEWRl of ["auto", "none", "manipulation"])
        registerStaticUtility_zeqrZG(`touch-${touchValue_oLEWRl}`, [["touch-action", touchValue_oLEWRl]]);
        let makePanVarInit_IJBdTI = () =>
        makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-pan-x"), makeAtPropertyNode_DIaSSt("--tw-pan-y"), makeAtPropertyNode_DIaSSt("--tw-pinch-zoom")]);
        for (let panXAxis_RIokrP of ["x", "left", "right"])
        registerStaticUtility_zeqrZG(`touch-pan-${panXAxis_RIokrP}`, [
        makePanVarInit_IJBdTI,
        ["--tw-pan-x", `pan-${panXAxis_RIokrP}`],
        [
        "touch-action",
        "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]

        );
        for (let panYAxis_ZomKNI of ["y", "up", "down"])
        registerStaticUtility_zeqrZG(`touch-pan-${panYAxis_ZomKNI}`, [
        makePanVarInit_IJBdTI,
        ["--tw-pan-y", `pan-${panYAxis_ZomKNI}`],
        [
        "touch-action",
        "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]

        );
        registerStaticUtility_zeqrZG("touch-pinch-zoom", [
        makePanVarInit_IJBdTI,
        ["--tw-pinch-zoom", "pinch-zoom"],
        [
        "touch-action",
        "var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,)"]]

        );
        for (let userSelectValue_fXiKDC of ["none", "text", "all", "auto"])
        registerStaticUtility_zeqrZG(`select-${userSelectValue_fXiKDC}`, [
        ["-webkit-user-select", userSelectValue_fXiKDC],
        ["user-select", userSelectValue_fXiKDC]]
        );
        registerStaticUtility_zeqrZG("resize-none", [["resize", "none"]]),
        registerStaticUtility_zeqrZG("resize-x", [["resize", "horizontal"]]),
        registerStaticUtility_zeqrZG("resize-y", [["resize", "vertical"]]),
        registerStaticUtility_zeqrZG("resize", [["resize", "both"]]),
        registerStaticUtility_zeqrZG("snap-none", [["scroll-snap-type", "none"]]);
        let makeSnapVarInit_HECzuj = () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-scroll-snap-strictness", "proximity", "*")]);
        for (let axis_zBTdFR of ["x", "y", "both"])
        registerStaticUtility_zeqrZG(`snap-${axis_zBTdFR}`, [
        makeSnapVarInit_HECzuj,
        ["scroll-snap-type", `${axis_zBTdFR} var(--tw-scroll-snap-strictness)`]]
        );
        registerStaticUtility_zeqrZG("snap-mandatory", [makeSnapVarInit_HECzuj, ["--tw-scroll-snap-strictness", "mandatory"]]),
        registerStaticUtility_zeqrZG("snap-proximity", [
        makeSnapVarInit_HECzuj,
        ["--tw-scroll-snap-strictness", "proximity"]]
        ),
        registerStaticUtility_zeqrZG("snap-align-none", [["scroll-snap-align", "none"]]),
        registerStaticUtility_zeqrZG("snap-start", [["scroll-snap-align", "start"]]),
        registerStaticUtility_zeqrZG("snap-end", [["scroll-snap-align", "end"]]),
        registerStaticUtility_zeqrZG("snap-center", [["scroll-snap-align", "center"]]),
        registerStaticUtility_zeqrZG("snap-normal", [["scroll-snap-stop", "normal"]]),
        registerStaticUtility_zeqrZG("snap-always", [["scroll-snap-stop", "always"]]);
        for (let [utilKey_LPFXET, cssProp_ujDQZl] of [
        ["scroll-m", "scroll-margin"],
        ["scroll-mx", "scroll-margin-inline"],
        ["scroll-my", "scroll-margin-block"],
        ["scroll-ms", "scroll-margin-inline-start"],
        ["scroll-me", "scroll-margin-inline-end"],
        ["scroll-mt", "scroll-margin-top"],
        ["scroll-mr", "scroll-margin-right"],
        ["scroll-mb", "scroll-margin-bottom"],
        ["scroll-ml", "scroll-margin-left"]])

        registerSpacingUtility_YCMYBk(utilKey_LPFXET, ["--scroll-margin", "--spacing"], (v_LZfxLu) => [makeDeclarationNode_xYlaTt(cssProp_ujDQZl, v_LZfxLu)], {
          supportsNegative: !0
        });
        for (let [utilKey_nZYiMP, cssProp_UeXluT] of [
        ["scroll-p", "scroll-padding"],
        ["scroll-px", "scroll-padding-inline"],
        ["scroll-py", "scroll-padding-block"],
        ["scroll-ps", "scroll-padding-inline-start"],
        ["scroll-pe", "scroll-padding-inline-end"],
        ["scroll-pt", "scroll-padding-top"],
        ["scroll-pr", "scroll-padding-right"],
        ["scroll-pb", "scroll-padding-bottom"],
        ["scroll-pl", "scroll-padding-left"]])

        registerSpacingUtility_YCMYBk(utilKey_nZYiMP, ["--scroll-padding", "--spacing"], (v_ymvqli) => [makeDeclarationNode_xYlaTt(cssProp_UeXluT, v_ymvqli)]);
        registerStaticUtility_zeqrZG("list-inside", [["list-style-position", "inside"]]),
        registerStaticUtility_zeqrZG("list-outside", [["list-style-position", "outside"]]),
        registerStaticUtility_zeqrZG("list-none", [["list-style-type", "none"]]),
        registerStaticUtility_zeqrZG("list-disc", [["list-style-type", "disc"]]),
        registerStaticUtility_zeqrZG("list-decimal", [["list-style-type", "decimal"]]),
        registerFunctionalHandler_VuzNfs("list", {
          themeKeys: ["--list-style-type"],
          handle: (val_EOGWxB) => [makeDeclarationNode_xYlaTt("list-style-type", val_EOGWxB)]
        }),
        registerStaticUtility_zeqrZG("list-image-none", [["list-style-image", "none"]]),
        registerFunctionalHandler_VuzNfs("list-image", {
          themeKeys: ["--list-style-image"],
          handle: (val_GCqSpy) => [makeDeclarationNode_xYlaTt("list-style-image", val_GCqSpy)]
        }),
        registerStaticUtility_zeqrZG("appearance-none", [["appearance", "none"]]),
        registerStaticUtility_zeqrZG("appearance-auto", [["appearance", "auto"]]),
        registerStaticUtility_zeqrZG("scheme-normal", [["color-scheme", "normal"]]),
        registerStaticUtility_zeqrZG("scheme-dark", [["color-scheme", "dark"]]),
        registerStaticUtility_zeqrZG("scheme-light", [["color-scheme", "light"]]),
        registerStaticUtility_zeqrZG("scheme-light-dark", [["color-scheme", "light dark"]]),
        registerStaticUtility_zeqrZG("scheme-only-dark", [["color-scheme", "only dark"]]),
        registerStaticUtility_zeqrZG("scheme-only-light", [["color-scheme", "only light"]]),
        registerStaticUtility_zeqrZG("columns-auto", [["columns", "auto"]]),
        registerFunctionalHandler_VuzNfs("columns", {
          themeKeys: ["--columns", "--container"],
          handleBareValue: ({ value: val_biiGBn }) => isNonNegativeInteger_QISFSJ(val_biiGBn) ? val_biiGBn : null,
          handle: (v_QkZYvh) => [makeDeclarationNode_xYlaTt("columns", v_QkZYvh)]
        }),
        registerCompletions_VddGyH("columns", () => [
        {
          values: Array.from({ length: 12 }, (unusedVal_tiBtZD, idx_NhLxAL) => `${idx_NhLxAL + 1}`),
          valueThemeKeys: ["--columns", "--container"]
        }]
        );
        for (let beforeValue_klCqsg of [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column"])

        registerStaticUtility_zeqrZG(`break-before-${beforeValue_klCqsg}`, [["break-before", beforeValue_klCqsg]]);
        for (let insideValue_WlRdNO of ["auto", "avoid", "avoid-page", "avoid-column"])
        registerStaticUtility_zeqrZG(`break-inside-${insideValue_WlRdNO}`, [["break-inside", insideValue_WlRdNO]]);
        for (let afterValue_DKtNYI of [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column"])

        registerStaticUtility_zeqrZG(`break-after-${afterValue_DKtNYI}`, [["break-after", afterValue_DKtNYI]]);
        registerStaticUtility_zeqrZG("grid-flow-row", [["grid-auto-flow", "row"]]),
        registerStaticUtility_zeqrZG("grid-flow-col", [["grid-auto-flow", "column"]]),
        registerStaticUtility_zeqrZG("grid-flow-dense", [["grid-auto-flow", "dense"]]),
        registerStaticUtility_zeqrZG("grid-flow-row-dense", [["grid-auto-flow", "row dense"]]),
        registerStaticUtility_zeqrZG("grid-flow-col-dense", [["grid-auto-flow", "column dense"]]),
        registerStaticUtility_zeqrZG("auto-cols-auto", [["grid-auto-columns", "auto"]]),
        registerStaticUtility_zeqrZG("auto-cols-min", [["grid-auto-columns", "min-content"]]),
        registerStaticUtility_zeqrZG("auto-cols-max", [["grid-auto-columns", "max-content"]]),
        registerStaticUtility_zeqrZG("auto-cols-fr", [["grid-auto-columns", "minmax(0, 1fr)"]]),
        registerFunctionalHandler_VuzNfs("auto-cols", {
          themeKeys: ["--grid-auto-columns"],
          handle: (val_hyvSGe) => [makeDeclarationNode_xYlaTt("grid-auto-columns", val_hyvSGe)]
        }),
        registerStaticUtility_zeqrZG("auto-rows-auto", [["grid-auto-rows", "auto"]]),
        registerStaticUtility_zeqrZG("auto-rows-min", [["grid-auto-rows", "min-content"]]),
        registerStaticUtility_zeqrZG("auto-rows-max", [["grid-auto-rows", "max-content"]]),
        registerStaticUtility_zeqrZG("auto-rows-fr", [["grid-auto-rows", "minmax(0, 1fr)"]]),
        registerFunctionalHandler_VuzNfs("auto-rows", {
          themeKeys: ["--grid-auto-rows"],
          handle: (val_Nqborb) => [makeDeclarationNode_xYlaTt("grid-auto-rows", val_Nqborb)]
        }),
        registerStaticUtility_zeqrZG("grid-cols-none", [["grid-template-columns", "none"]]),
        registerStaticUtility_zeqrZG("grid-cols-subgrid", [["grid-template-columns", "subgrid"]]),
        registerFunctionalHandler_VuzNfs("grid-cols", {
          themeKeys: ["--grid-template-columns"],
          handleBareValue: ({ value: val_Pkylyu }) =>
          isPositiveInteger_IonhVo(val_Pkylyu) ? `repeat(${val_Pkylyu}, minmax(0, 1fr))` : null,
          handle: (v_rhgOHL) => [makeDeclarationNode_xYlaTt("grid-template-columns", v_rhgOHL)]
        }),
        registerStaticUtility_zeqrZG("grid-rows-none", [["grid-template-rows", "none"]]),
        registerStaticUtility_zeqrZG("grid-rows-subgrid", [["grid-template-rows", "subgrid"]]),
        registerFunctionalHandler_VuzNfs("grid-rows", {
          themeKeys: ["--grid-template-rows"],
          handleBareValue: ({ value: val_APMcyS }) =>
          isPositiveInteger_IonhVo(val_APMcyS) ? `repeat(${val_APMcyS}, minmax(0, 1fr))` : null,
          handle: (v_AgMYPT) => [makeDeclarationNode_xYlaTt("grid-template-rows", v_AgMYPT)]
        }),
        registerCompletions_VddGyH("grid-cols", () => [
        {
          values: Array.from({ length: 12 }, (unusedVal_jWxCES, idx_URKIWi) => `${idx_URKIWi + 1}`),
          valueThemeKeys: ["--grid-template-columns"]
        }]
        ),
        registerCompletions_VddGyH("grid-rows", () => [
        {
          values: Array.from({ length: 12 }, (unusedVal_NeOxid, idx_UfjfxB) => `${idx_UfjfxB + 1}`),
          valueThemeKeys: ["--grid-template-rows"]
        }]
        ),
        registerStaticUtility_zeqrZG("flex-row", [["flex-direction", "row"]]),
        registerStaticUtility_zeqrZG("flex-row-reverse", [["flex-direction", "row-reverse"]]),
        registerStaticUtility_zeqrZG("flex-col", [["flex-direction", "column"]]),
        registerStaticUtility_zeqrZG("flex-col-reverse", [["flex-direction", "column-reverse"]]),
        registerStaticUtility_zeqrZG("flex-wrap", [["flex-wrap", "wrap"]]),
        registerStaticUtility_zeqrZG("flex-nowrap", [["flex-wrap", "nowrap"]]),
        registerStaticUtility_zeqrZG("flex-wrap-reverse", [["flex-wrap", "wrap-reverse"]]),
        registerStaticUtility_zeqrZG("place-content-center", [["place-content", "center"]]),
        registerStaticUtility_zeqrZG("place-content-start", [["place-content", "start"]]),
        registerStaticUtility_zeqrZG("place-content-end", [["place-content", "end"]]),
        registerStaticUtility_zeqrZG("place-content-center-safe", [["place-content", "safe center"]]),
        registerStaticUtility_zeqrZG("place-content-end-safe", [["place-content", "safe end"]]),
        registerStaticUtility_zeqrZG("place-content-between", [["place-content", "space-between"]]),
        registerStaticUtility_zeqrZG("place-content-around", [["place-content", "space-around"]]),
        registerStaticUtility_zeqrZG("place-content-evenly", [["place-content", "space-evenly"]]),
        registerStaticUtility_zeqrZG("place-content-baseline", [["place-content", "baseline"]]),
        registerStaticUtility_zeqrZG("place-content-stretch", [["place-content", "stretch"]]),
        registerStaticUtility_zeqrZG("place-items-center", [["place-items", "center"]]),
        registerStaticUtility_zeqrZG("place-items-start", [["place-items", "start"]]),
        registerStaticUtility_zeqrZG("place-items-end", [["place-items", "end"]]),
        registerStaticUtility_zeqrZG("place-items-center-safe", [["place-items", "safe center"]]),
        registerStaticUtility_zeqrZG("place-items-end-safe", [["place-items", "safe end"]]),
        registerStaticUtility_zeqrZG("place-items-baseline", [["place-items", "baseline"]]),
        registerStaticUtility_zeqrZG("place-items-stretch", [["place-items", "stretch"]]),
        registerStaticUtility_zeqrZG("content-normal", [["align-content", "normal"]]),
        registerStaticUtility_zeqrZG("content-center", [["align-content", "center"]]),
        registerStaticUtility_zeqrZG("content-start", [["align-content", "flex-start"]]),
        registerStaticUtility_zeqrZG("content-end", [["align-content", "flex-end"]]),
        registerStaticUtility_zeqrZG("content-center-safe", [["align-content", "safe center"]]),
        registerStaticUtility_zeqrZG("content-end-safe", [["align-content", "safe flex-end"]]),
        registerStaticUtility_zeqrZG("content-between", [["align-content", "space-between"]]),
        registerStaticUtility_zeqrZG("content-around", [["align-content", "space-around"]]),
        registerStaticUtility_zeqrZG("content-evenly", [["align-content", "space-evenly"]]),
        registerStaticUtility_zeqrZG("content-baseline", [["align-content", "baseline"]]),
        registerStaticUtility_zeqrZG("content-stretch", [["align-content", "stretch"]]),
        registerStaticUtility_zeqrZG("items-center", [["align-items", "center"]]),
        registerStaticUtility_zeqrZG("items-start", [["align-items", "flex-start"]]),
        registerStaticUtility_zeqrZG("items-end", [["align-items", "flex-end"]]),
        registerStaticUtility_zeqrZG("items-center-safe", [["align-items", "safe center"]]),
        registerStaticUtility_zeqrZG("items-end-safe", [["align-items", "safe flex-end"]]),
        registerStaticUtility_zeqrZG("items-baseline", [["align-items", "baseline"]]),
        registerStaticUtility_zeqrZG("items-baseline-last", [["align-items", "last baseline"]]),
        registerStaticUtility_zeqrZG("items-stretch", [["align-items", "stretch"]]),
        registerStaticUtility_zeqrZG("justify-normal", [["justify-content", "normal"]]),
        registerStaticUtility_zeqrZG("justify-center", [["justify-content", "center"]]),
        registerStaticUtility_zeqrZG("justify-start", [["justify-content", "flex-start"]]),
        registerStaticUtility_zeqrZG("justify-end", [["justify-content", "flex-end"]]),
        registerStaticUtility_zeqrZG("justify-center-safe", [["justify-content", "safe center"]]),
        registerStaticUtility_zeqrZG("justify-end-safe", [["justify-content", "safe flex-end"]]),
        registerStaticUtility_zeqrZG("justify-between", [["justify-content", "space-between"]]),
        registerStaticUtility_zeqrZG("justify-around", [["justify-content", "space-around"]]),
        registerStaticUtility_zeqrZG("justify-evenly", [["justify-content", "space-evenly"]]),
        registerStaticUtility_zeqrZG("justify-baseline", [["justify-content", "baseline"]]),
        registerStaticUtility_zeqrZG("justify-stretch", [["justify-content", "stretch"]]),
        registerStaticUtility_zeqrZG("justify-items-normal", [["justify-items", "normal"]]),
        registerStaticUtility_zeqrZG("justify-items-center", [["justify-items", "center"]]),
        registerStaticUtility_zeqrZG("justify-items-start", [["justify-items", "start"]]),
        registerStaticUtility_zeqrZG("justify-items-end", [["justify-items", "end"]]),
        registerStaticUtility_zeqrZG("justify-items-center-safe", [["justify-items", "safe center"]]),
        registerStaticUtility_zeqrZG("justify-items-end-safe", [["justify-items", "safe end"]]),
        registerStaticUtility_zeqrZG("justify-items-stretch", [["justify-items", "stretch"]]),
        registerSpacingUtility_YCMYBk("gap", ["--gap", "--spacing"], (v_YcayHk) => [makeDeclarationNode_xYlaTt("gap", v_YcayHk)]),
        registerSpacingUtility_YCMYBk("gap-x", ["--gap", "--spacing"], (v_NbJDeZ) => [makeDeclarationNode_xYlaTt("column-gap", v_NbJDeZ)]),
        registerSpacingUtility_YCMYBk("gap-y", ["--gap", "--spacing"], (v_IWdwkq) => [makeDeclarationNode_xYlaTt("row-gap", v_IWdwkq)]),
        registerSpacingUtility_YCMYBk(
          "space-x",
          ["--space", "--spacing"],
          (spaceVal_LlHvul) => [
          makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-space-x-reverse", "0")]),
          makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
          makeDeclarationNode_xYlaTt("--tw-sort", "row-gap"),
          makeDeclarationNode_xYlaTt("--tw-space-x-reverse", "0"),
          makeDeclarationNode_xYlaTt(
            "margin-inline-start",
            `calc(${spaceVal_LlHvul} * var(--tw-space-x-reverse))`
          ),
          makeDeclarationNode_xYlaTt(
            "margin-inline-end",
            `calc(${spaceVal_LlHvul} * calc(1 - var(--tw-space-x-reverse)))`
          )]
          )],

          { supportsNegative: !0 }
        ),
        registerSpacingUtility_YCMYBk(
          "space-y",
          ["--space", "--spacing"],
          (spaceVal_wXldik) => [
          makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-space-y-reverse", "0")]),
          makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
          makeDeclarationNode_xYlaTt("--tw-sort", "column-gap"),
          makeDeclarationNode_xYlaTt("--tw-space-y-reverse", "0"),
          makeDeclarationNode_xYlaTt(
            "margin-block-start",
            `calc(${spaceVal_wXldik} * var(--tw-space-y-reverse))`
          ),
          makeDeclarationNode_xYlaTt(
            "margin-block-end",
            `calc(${spaceVal_wXldik} * calc(1 - var(--tw-space-y-reverse)))`
          )]
          )],

          { supportsNegative: !0 }
        ),
        registerStaticUtility_zeqrZG("space-x-reverse", [
        () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-space-x-reverse", "0")]),
        () =>
        makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
        makeDeclarationNode_xYlaTt("--tw-sort", "row-gap"),
        makeDeclarationNode_xYlaTt("--tw-space-x-reverse", "1")]
        )]
        ),
        registerStaticUtility_zeqrZG("space-y-reverse", [
        () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-space-y-reverse", "0")]),
        () =>
        makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
        makeDeclarationNode_xYlaTt("--tw-sort", "column-gap"),
        makeDeclarationNode_xYlaTt("--tw-space-y-reverse", "1")]
        )]
        ),
        registerStaticUtility_zeqrZG("accent-auto", [["accent-color", "auto"]]),
        registerColorUtility_uMaiuB("accent", {
          themeKeys: ["--accent-color", "--color"],
          handle: (v_tShsOa) => [makeDeclarationNode_xYlaTt("accent-color", v_tShsOa)]
        }),
        registerColorUtility_uMaiuB("caret", {
          themeKeys: ["--caret-color", "--color"],
          handle: (v_ProvVF) => [makeDeclarationNode_xYlaTt("caret-color", v_ProvVF)]
        }),
        registerColorUtility_uMaiuB("divide", {
          themeKeys: ["--divide-color", "--color"],
          handle: (v_RnIliQ) => [
          makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
          makeDeclarationNode_xYlaTt("--tw-sort", "divide-color"),
          makeDeclarationNode_xYlaTt("border-color", v_RnIliQ)]
          )]

        }),
        registerStaticUtility_zeqrZG("place-self-auto", [["place-self", "auto"]]),
        registerStaticUtility_zeqrZG("place-self-start", [["place-self", "start"]]),
        registerStaticUtility_zeqrZG("place-self-end", [["place-self", "end"]]),
        registerStaticUtility_zeqrZG("place-self-center", [["place-self", "center"]]),
        registerStaticUtility_zeqrZG("place-self-end-safe", [["place-self", "safe end"]]),
        registerStaticUtility_zeqrZG("place-self-center-safe", [["place-self", "safe center"]]),
        registerStaticUtility_zeqrZG("place-self-stretch", [["place-self", "stretch"]]),
        registerStaticUtility_zeqrZG("self-auto", [["align-self", "auto"]]),
        registerStaticUtility_zeqrZG("self-start", [["align-self", "flex-start"]]),
        registerStaticUtility_zeqrZG("self-end", [["align-self", "flex-end"]]),
        registerStaticUtility_zeqrZG("self-center", [["align-self", "center"]]),
        registerStaticUtility_zeqrZG("self-end-safe", [["align-self", "safe flex-end"]]),
        registerStaticUtility_zeqrZG("self-center-safe", [["align-self", "safe center"]]),
        registerStaticUtility_zeqrZG("self-stretch", [["align-self", "stretch"]]),
        registerStaticUtility_zeqrZG("self-baseline", [["align-self", "baseline"]]),
        registerStaticUtility_zeqrZG("self-baseline-last", [["align-self", "last baseline"]]),
        registerStaticUtility_zeqrZG("justify-self-auto", [["justify-self", "auto"]]),
        registerStaticUtility_zeqrZG("justify-self-start", [["justify-self", "flex-start"]]),
        registerStaticUtility_zeqrZG("justify-self-end", [["justify-self", "flex-end"]]),
        registerStaticUtility_zeqrZG("justify-self-center", [["justify-self", "center"]]),
        registerStaticUtility_zeqrZG("justify-self-end-safe", [["justify-self", "safe flex-end"]]),
        registerStaticUtility_zeqrZG("justify-self-center-safe", [["justify-self", "safe center"]]),
        registerStaticUtility_zeqrZG("justify-self-stretch", [["justify-self", "stretch"]]);
        for (let val_WKFVIk of ["auto", "hidden", "clip", "visible", "scroll"])
        registerStaticUtility_zeqrZG(`overflow-${val_WKFVIk}`, [["overflow", val_WKFVIk]]),
        registerStaticUtility_zeqrZG(`overflow-x-${val_WKFVIk}`, [["overflow-x", val_WKFVIk]]),
        registerStaticUtility_zeqrZG(`overflow-y-${val_WKFVIk}`, [["overflow-y", val_WKFVIk]]);
        for (let val_zrqohI of ["auto", "contain", "none"])
        registerStaticUtility_zeqrZG(`overscroll-${val_zrqohI}`, [["overscroll-behavior", val_zrqohI]]),
        registerStaticUtility_zeqrZG(`overscroll-x-${val_zrqohI}`, [["overscroll-behavior-x", val_zrqohI]]),
        registerStaticUtility_zeqrZG(`overscroll-y-${val_zrqohI}`, [["overscroll-behavior-y", val_zrqohI]]);
        registerStaticUtility_zeqrZG("scroll-auto", [["scroll-behavior", "auto"]]),
        registerStaticUtility_zeqrZG("scroll-smooth", [["scroll-behavior", "smooth"]]),
        registerStaticUtility_zeqrZG("truncate", [
        ["overflow", "hidden"],
        ["text-overflow", "ellipsis"],
        ["white-space", "nowrap"]]
        ),
        registerStaticUtility_zeqrZG("text-ellipsis", [["text-overflow", "ellipsis"]]),
        registerStaticUtility_zeqrZG("text-clip", [["text-overflow", "clip"]]),
        registerStaticUtility_zeqrZG("hyphens-none", [
        ["-webkit-hyphens", "none"],
        ["hyphens", "none"]]
        ),
        registerStaticUtility_zeqrZG("hyphens-manual", [
        ["-webkit-hyphens", "manual"],
        ["hyphens", "manual"]]
        ),
        registerStaticUtility_zeqrZG("hyphens-auto", [
        ["-webkit-hyphens", "auto"],
        ["hyphens", "auto"]]
        ),
        registerStaticUtility_zeqrZG("whitespace-normal", [["white-space", "normal"]]),
        registerStaticUtility_zeqrZG("whitespace-nowrap", [["white-space", "nowrap"]]),
        registerStaticUtility_zeqrZG("whitespace-pre", [["white-space", "pre"]]),
        registerStaticUtility_zeqrZG("whitespace-pre-line", [["white-space", "pre-line"]]),
        registerStaticUtility_zeqrZG("whitespace-pre-wrap", [["white-space", "pre-wrap"]]),
        registerStaticUtility_zeqrZG("whitespace-break-spaces", [["white-space", "break-spaces"]]),
        registerStaticUtility_zeqrZG("text-wrap", [["text-wrap", "wrap"]]),
        registerStaticUtility_zeqrZG("text-nowrap", [["text-wrap", "nowrap"]]),
        registerStaticUtility_zeqrZG("text-balance", [["text-wrap", "balance"]]),
        registerStaticUtility_zeqrZG("text-pretty", [["text-wrap", "pretty"]]),
        registerStaticUtility_zeqrZG("break-normal", [
        ["overflow-wrap", "normal"],
        ["word-break", "normal"]]
        ),
        registerStaticUtility_zeqrZG("break-words", [["overflow-wrap", "break-word"]]),
        registerStaticUtility_zeqrZG("break-all", [["word-break", "break-all"]]),
        registerStaticUtility_zeqrZG("break-keep", [["word-break", "keep-all"]]),
        registerStaticUtility_zeqrZG("wrap-anywhere", [["overflow-wrap", "anywhere"]]),
        registerStaticUtility_zeqrZG("wrap-break-word", [["overflow-wrap", "break-word"]]),
        registerStaticUtility_zeqrZG("wrap-normal", [["overflow-wrap", "normal"]]);
        for (let [cornerKey_sdShpp, cornerProps_FdqPwu] of [
        ["rounded", ["border-radius"]],
        [
        "rounded-s",
        ["border-start-start-radius", "border-end-start-radius"]],

        ["rounded-e", ["border-start-end-radius", "border-end-end-radius"]],
        ["rounded-t", ["border-top-left-radius", "border-top-right-radius"]],
        [
        "rounded-r",
        ["border-top-right-radius", "border-bottom-right-radius"]],

        [
        "rounded-b",
        ["border-bottom-right-radius", "border-bottom-left-radius"]],

        [
        "rounded-l",
        ["border-top-left-radius", "border-bottom-left-radius"]],

        ["rounded-ss", ["border-start-start-radius"]],
        ["rounded-se", ["border-start-end-radius"]],
        ["rounded-ee", ["border-end-end-radius"]],
        ["rounded-es", ["border-end-start-radius"]],
        ["rounded-tl", ["border-top-left-radius"]],
        ["rounded-tr", ["border-top-right-radius"]],
        ["rounded-br", ["border-bottom-right-radius"]],
        ["rounded-bl", ["border-bottom-left-radius"]]])

        registerStaticUtility_zeqrZG(
          `${cornerKey_sdShpp}-none`,
          cornerProps_FdqPwu.map((prop_vtxsiA) => [prop_vtxsiA, "0"])
        ),
        registerStaticUtility_zeqrZG(
          `${cornerKey_sdShpp}-full`,
          cornerProps_FdqPwu.map((prop_ADhygu) => [prop_ADhygu, "calc(infinity * 1px)"])
        ),
        registerFunctionalHandler_VuzNfs(cornerKey_sdShpp, {
          themeKeys: ["--radius"],
          handle: (v_cbIuUv) => cornerProps_FdqPwu.map((cornerProp_YqXpWL) => makeDeclarationNode_xYlaTt(cornerProp_YqXpWL, v_cbIuUv))
        });
        registerStaticUtility_zeqrZG("border-solid", [
        ["--tw-border-style", "solid"],
        ["border-style", "solid"]]
        ),
        registerStaticUtility_zeqrZG("border-dashed", [
        ["--tw-border-style", "dashed"],
        ["border-style", "dashed"]]
        ),
        registerStaticUtility_zeqrZG("border-dotted", [
        ["--tw-border-style", "dotted"],
        ["border-style", "dotted"]]
        ),
        registerStaticUtility_zeqrZG("border-double", [
        ["--tw-border-style", "double"],
        ["border-style", "double"]]
        ),
        registerStaticUtility_zeqrZG("border-hidden", [
        ["--tw-border-style", "hidden"],
        ["border-style", "hidden"]]
        ),
        registerStaticUtility_zeqrZG("border-none", [
        ["--tw-border-style", "none"],
        ["border-style", "none"]]
        );
        {
          let registerBorderUtility_mQqLHq = function (utilityKey_bYWRUw, handlers_VXtbcH) {
              utilityRegistry_fatAmE.functional(utilityKey_bYWRUw, (arg_bVBtQd) => {
                if (!arg_bVBtQd.value) {
                  if (arg_bVBtQd.modifier) return;
                  let defaultWidth_HehKGS = themeVarMap_nHCGUd.get(["--default-border-width"]) ?? "1px",
                    result_vvHXuj = handlers_VXtbcH.width(defaultWidth_HehKGS);
                  return result_vvHXuj ? [makeSolidBorderVarInit_BtpuVS(), ...result_vvHXuj] : void 0;
                }
                if ("arbitrary" === arg_bVBtQd.value.kind) {
                  let val_ciAtbn = arg_bVBtQd.value.value;
                  switch (
                  arg_bVBtQd.value.dataType ??
                  resolveCssType_DhcVtf(val_ciAtbn, ["color", "line-width", "length"])) {

                    case "line-width":
                    case "length":{
                        if (arg_bVBtQd.modifier) return;
                        let result_ZIShVd = handlers_VXtbcH.width(val_ciAtbn);
                        return result_ZIShVd ? [makeSolidBorderVarInit_BtpuVS(), ...result_ZIShVd] : void 0;
                      }
                    default:
                      return (
                        val_ciAtbn = applyOpacityToColor_qFFjzR(val_ciAtbn, arg_bVBtQd.modifier, themeVarMap_nHCGUd),
                        null === val_ciAtbn ? void 0 : handlers_VXtbcH.color(val_ciAtbn));

                  }
                }
                {
                  let colorValue_OfzFUI = mapStaticThemeColor_GNTWCf(arg_bVBtQd, themeVarMap_nHCGUd, ["--border-color", "--color"]);
                  if (colorValue_OfzFUI) return handlers_VXtbcH.color(colorValue_OfzFUI);
                }
                {
                  if (arg_bVBtQd.modifier) return;
                  let resolved_NJdCig = themeVarMap_nHCGUd.resolve(arg_bVBtQd.value.value, ["--border-width"]);
                  if (resolved_NJdCig) {
                    let result_rxOQqZ = handlers_VXtbcH.width(resolved_NJdCig);
                    return result_rxOQqZ ? [makeSolidBorderVarInit_BtpuVS(), ...result_rxOQqZ] : void 0;
                  }
                  if (isNonNegativeInteger_QISFSJ(arg_bVBtQd.value.value)) {
                    let result_RPRrCt = handlers_VXtbcH.width(`${arg_bVBtQd.value.value}px`);
                    return result_RPRrCt ? [makeSolidBorderVarInit_BtpuVS(), ...result_RPRrCt] : void 0;
                  }
                }
              }),
              registerCompletions_VddGyH(utilityKey_bYWRUw, () => [
              {
                values: ["current", "inherit", "transparent"],
                valueThemeKeys: ["--border-color", "--color"],
                modifiers: Array.from({ length: 21 }, (unusedModifierValue_QYQlBO, modifierIndex_KjOiYW) => "" + 5 * modifierIndex_KjOiYW),
                hasDefaultValue: !0
              },
              {
                values: ["0", "2", "4", "8"],
                valueThemeKeys: ["--border-width"]
              }]
              );
            },
            makeSolidBorderVarInit_BtpuVS = () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-border-style", "solid")]);
          registerBorderUtility_mQqLHq("border", {
            width: (v_ghpjnE) => [
            makeDeclarationNode_xYlaTt("border-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-width", v_ghpjnE)],

            color: (v_sEHjdd) => [makeDeclarationNode_xYlaTt("border-color", v_sEHjdd)]
          }),
          registerBorderUtility_mQqLHq("border-x", {
            width: (v_wAqxjS) => [
            makeDeclarationNode_xYlaTt("border-inline-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-inline-width", v_wAqxjS)],

            color: (v_OusxUo) => [makeDeclarationNode_xYlaTt("border-inline-color", v_OusxUo)]
          }),
          registerBorderUtility_mQqLHq("border-y", {
            width: (v_kZkUuZ) => [
            makeDeclarationNode_xYlaTt("border-block-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-block-width", v_kZkUuZ)],

            color: (v_NsNRBe) => [makeDeclarationNode_xYlaTt("border-block-color", v_NsNRBe)]
          }),
          registerBorderUtility_mQqLHq("border-s", {
            width: (v_ayKKLN) => [
            makeDeclarationNode_xYlaTt("border-inline-start-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-inline-start-width", v_ayKKLN)],

            color: (v_UEGtQZ) => [makeDeclarationNode_xYlaTt("border-inline-start-color", v_UEGtQZ)]
          }),
          registerBorderUtility_mQqLHq("border-e", {
            width: (v_vsFTUI) => [
            makeDeclarationNode_xYlaTt("border-inline-end-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-inline-end-width", v_vsFTUI)],

            color: (v_pqUstD) => [makeDeclarationNode_xYlaTt("border-inline-end-color", v_pqUstD)]
          }),
          registerBorderUtility_mQqLHq("border-t", {
            width: (v_VhWHhZ) => [
            makeDeclarationNode_xYlaTt("border-top-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-top-width", v_VhWHhZ)],

            color: (v_EZNzPL) => [makeDeclarationNode_xYlaTt("border-top-color", v_EZNzPL)]
          }),
          registerBorderUtility_mQqLHq("border-r", {
            width: (v_lQcYfz) => [
            makeDeclarationNode_xYlaTt("border-right-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-right-width", v_lQcYfz)],

            color: (v_dkqjek) => [makeDeclarationNode_xYlaTt("border-right-color", v_dkqjek)]
          }),
          registerBorderUtility_mQqLHq("border-b", {
            width: (v_hTThrO) => [
            makeDeclarationNode_xYlaTt("border-bottom-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-bottom-width", v_hTThrO)],

            color: (v_OzKADd) => [makeDeclarationNode_xYlaTt("border-bottom-color", v_OzKADd)]
          }),
          registerBorderUtility_mQqLHq("border-l", {
            width: (v_LFCXDw) => [
            makeDeclarationNode_xYlaTt("border-left-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-left-width", v_LFCXDw)],

            color: (v_stcWzl) => [makeDeclarationNode_xYlaTt("border-left-color", v_stcWzl)]
          }),
          registerFunctionalHandler_VuzNfs("divide-x", {
            defaultValue: themeVarMap_nHCGUd.get(["--default-border-width"]) ?? "1px",
            themeKeys: ["--divide-width", "--border-width"],
            handleBareValue: ({ value: val_NFewTN }) => isNonNegativeInteger_QISFSJ(val_NFewTN) ? `${val_NFewTN}px` : null,
            handle: (v_MlhjQZ) => [
            makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-divide-x-reverse", "0")]),
            makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
            makeDeclarationNode_xYlaTt("--tw-sort", "divide-x-width"),
            makeSolidBorderVarInit_BtpuVS(),
            makeDeclarationNode_xYlaTt("--tw-divide-x-reverse", "0"),
            makeDeclarationNode_xYlaTt("border-inline-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt(
              "border-inline-start-width",
              `calc(${v_MlhjQZ} * var(--tw-divide-x-reverse))`
            ),
            makeDeclarationNode_xYlaTt(
              "border-inline-end-width",
              `calc(${v_MlhjQZ} * calc(1 - var(--tw-divide-x-reverse)))`
            )]
            )]

          }),
          registerFunctionalHandler_VuzNfs("divide-y", {
            defaultValue: themeVarMap_nHCGUd.get(["--default-border-width"]) ?? "1px",
            themeKeys: ["--divide-width", "--border-width"],
            handleBareValue: ({ value: val_TTBDzd }) => isNonNegativeInteger_QISFSJ(val_TTBDzd) ? `${val_TTBDzd}px` : null,
            handle: (v_kVMBcr) => [
            makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-divide-y-reverse", "0")]),
            makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
            makeDeclarationNode_xYlaTt("--tw-sort", "divide-y-width"),
            makeSolidBorderVarInit_BtpuVS(),
            makeDeclarationNode_xYlaTt("--tw-divide-y-reverse", "0"),
            makeDeclarationNode_xYlaTt("border-bottom-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt("border-top-style", "var(--tw-border-style)"),
            makeDeclarationNode_xYlaTt(
              "border-top-width",
              `calc(${v_kVMBcr} * var(--tw-divide-y-reverse))`
            ),
            makeDeclarationNode_xYlaTt(
              "border-bottom-width",
              `calc(${v_kVMBcr} * calc(1 - var(--tw-divide-y-reverse)))`
            )]
            )]

          }),
          registerCompletions_VddGyH("divide-x", () => [
          {
            values: ["0", "2", "4", "8"],
            valueThemeKeys: ["--divide-width", "--border-width"],
            hasDefaultValue: !0
          }]
          ),
          registerCompletions_VddGyH("divide-y", () => [
          {
            values: ["0", "2", "4", "8"],
            valueThemeKeys: ["--divide-width", "--border-width"],
            hasDefaultValue: !0
          }]
          ),
          registerStaticUtility_zeqrZG("divide-x-reverse", [
          () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-divide-x-reverse", "0")]),
          () =>
          makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
          makeDeclarationNode_xYlaTt("--tw-divide-x-reverse", "1")]
          )]
          ),
          registerStaticUtility_zeqrZG("divide-y-reverse", [
          () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-divide-y-reverse", "0")]),
          () =>
          makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
          makeDeclarationNode_xYlaTt("--tw-divide-y-reverse", "1")]
          )]
          );
          for (let style_xXUmKy of ["solid", "dashed", "dotted", "double", "none"])
          registerStaticUtility_zeqrZG(`divide-${style_xXUmKy}`, [
          () =>
          makeRuleNode_PDClCj(":where(& > :not(:last-child))", [
          makeDeclarationNode_xYlaTt("--tw-sort", "divide-style"),
          makeDeclarationNode_xYlaTt("--tw-border-style", style_xXUmKy),
          makeDeclarationNode_xYlaTt("border-style", style_xXUmKy)]
          )]
          );
        }
        registerStaticUtility_zeqrZG("bg-auto", [["background-size", "auto"]]),
        registerStaticUtility_zeqrZG("bg-cover", [["background-size", "cover"]]),
        registerStaticUtility_zeqrZG("bg-contain", [["background-size", "contain"]]),
        registerFunctionalHandler_VuzNfs("bg-size", {
          handle(v_cnzpbs) {
            if (v_cnzpbs) return [makeDeclarationNode_xYlaTt("background-size", v_cnzpbs)];
          }
        }),
        registerStaticUtility_zeqrZG("bg-fixed", [["background-attachment", "fixed"]]),
        registerStaticUtility_zeqrZG("bg-local", [["background-attachment", "local"]]),
        registerStaticUtility_zeqrZG("bg-scroll", [["background-attachment", "scroll"]]),
        registerStaticUtility_zeqrZG("bg-top", [["background-position", "top"]]),
        registerStaticUtility_zeqrZG("bg-top-left", [["background-position", "left top"]]),
        registerStaticUtility_zeqrZG("bg-top-right", [["background-position", "right top"]]),
        registerStaticUtility_zeqrZG("bg-bottom", [["background-position", "bottom"]]),
        registerStaticUtility_zeqrZG("bg-bottom-left", [["background-position", "left bottom"]]),
        registerStaticUtility_zeqrZG("bg-bottom-right", [["background-position", "right bottom"]]),
        registerStaticUtility_zeqrZG("bg-left", [["background-position", "left"]]),
        registerStaticUtility_zeqrZG("bg-right", [["background-position", "right"]]),
        registerStaticUtility_zeqrZG("bg-center", [["background-position", "center"]]),
        registerFunctionalHandler_VuzNfs("bg-position", {
          handle(v_WgAdjg) {
            if (v_WgAdjg) return [makeDeclarationNode_xYlaTt("background-position", v_WgAdjg)];
          }
        }),
        registerStaticUtility_zeqrZG("bg-repeat", [["background-repeat", "repeat"]]),
        registerStaticUtility_zeqrZG("bg-no-repeat", [["background-repeat", "no-repeat"]]),
        registerStaticUtility_zeqrZG("bg-repeat-x", [["background-repeat", "repeat-x"]]),
        registerStaticUtility_zeqrZG("bg-repeat-y", [["background-repeat", "repeat-y"]]),
        registerStaticUtility_zeqrZG("bg-repeat-round", [["background-repeat", "round"]]),
        registerStaticUtility_zeqrZG("bg-repeat-space", [["background-repeat", "space"]]),
        registerStaticUtility_zeqrZG("bg-none", [["background-image", "none"]]);
        {
          let getGradientDirectionString_PVWmKq = function (modifierNode_wfjqaZ) {
              let dirStr_CBqMoY = "in oklab";
              if ("named" === modifierNode_wfjqaZ?.kind)
              switch (modifierNode_wfjqaZ.value) {
                case "longer":
                case "shorter":
                case "increasing":
                case "decreasing":
                  dirStr_CBqMoY = `in oklch ${modifierNode_wfjqaZ.value} hue`;
                  break;
                default:
                  dirStr_CBqMoY = `in ${modifierNode_wfjqaZ.value}`;
              } else
              "arbitrary" === modifierNode_wfjqaZ?.kind && (dirStr_CBqMoY = modifierNode_wfjqaZ.value);
              return dirStr_CBqMoY;
            },
            makeGradientAngleHandler_xltnfK = function ({ negative: negative_sEBCSY }) {
              return (arg_SToysq) => {
                if (!arg_SToysq.value) return;
                if ("arbitrary" === arg_SToysq.value.kind) {
                  if (arg_SToysq.modifier) return;
                  let val_HeTXxI = arg_SToysq.value.value;
                  return "angle" === (arg_SToysq.value.dataType ?? resolveCssType_DhcVtf(val_HeTXxI, ["angle"])) ? (
                  val_HeTXxI = negative_sEBCSY ? `calc(${val_HeTXxI} * -1)` : `${val_HeTXxI}`,
                  [
                  makeDeclarationNode_xYlaTt("--tw-gradient-position", val_HeTXxI),
                  makeDeclarationNode_xYlaTt(
                    "background-image",
                    `linear-gradient(var(--tw-gradient-stops,${val_HeTXxI}))`
                  )]) :

                  negative_sEBCSY ?
                  void 0 :
                  [
                  makeDeclarationNode_xYlaTt("--tw-gradient-position", val_HeTXxI),
                  makeDeclarationNode_xYlaTt(
                    "background-image",
                    `linear-gradient(var(--tw-gradient-stops,${val_HeTXxI}))`
                  )];

                }
                let angleVal_DfpVlO = arg_SToysq.value.value;
                if (!negative_sEBCSY && linearGradientDirectionMap_diWdhw.has(angleVal_DfpVlO)) angleVal_DfpVlO = linearGradientDirectionMap_diWdhw.get(angleVal_DfpVlO);else
                {
                  if (!isNonNegativeInteger_QISFSJ(angleVal_DfpVlO)) return;
                  angleVal_DfpVlO = negative_sEBCSY ? `calc(${angleVal_DfpVlO}deg * -1)` : `${angleVal_DfpVlO}deg`;
                }
                let positionStr_fpIazz = getGradientDirectionString_PVWmKq(arg_SToysq.modifier);
                return [
                makeDeclarationNode_xYlaTt("--tw-gradient-position", `${angleVal_DfpVlO}`),
                parseCSSRule_QVgHxe(
                  "@supports (background-image: linear-gradient(in lab, red, red))",
                  [makeDeclarationNode_xYlaTt("--tw-gradient-position", `${angleVal_DfpVlO} ${positionStr_fpIazz}`)]
                ),
                makeDeclarationNode_xYlaTt(
                  "background-image",
                  "linear-gradient(var(--tw-gradient-stops))"
                )];

              };
            },
            makeConicGradientHandler_JKjoxs = function ({ negative: negative_vyYFZW }) {
              return (arg_NedvIx) => {
                if ("arbitrary" === arg_NedvIx.value?.kind) {
                  if (arg_NedvIx.modifier) return;
                  let val_OzVScM = arg_NedvIx.value.value;
                  return [
                  makeDeclarationNode_xYlaTt("--tw-gradient-position", val_OzVScM),
                  makeDeclarationNode_xYlaTt(
                    "background-image",
                    `conic-gradient(var(--tw-gradient-stops,${val_OzVScM}))`
                  )];

                }
                let positionStr_ZSnNZO = getGradientDirectionString_PVWmKq(arg_NedvIx.modifier);
                if (!arg_NedvIx.value)
                return [
                makeDeclarationNode_xYlaTt("--tw-gradient-position", positionStr_ZSnNZO),
                makeDeclarationNode_xYlaTt(
                  "background-image",
                  "conic-gradient(var(--tw-gradient-stops))"
                )];

                let angleVal_JhLUXy = arg_NedvIx.value.value;
                return isNonNegativeInteger_QISFSJ(angleVal_JhLUXy) ? (
                angleVal_JhLUXy = negative_vyYFZW ? `calc(${angleVal_JhLUXy}deg * -1)` : `${angleVal_JhLUXy}deg`,
                [
                makeDeclarationNode_xYlaTt("--tw-gradient-position", `from ${angleVal_JhLUXy} ${positionStr_ZSnNZO}`),
                makeDeclarationNode_xYlaTt(
                  "background-image",
                  "conic-gradient(var(--tw-gradient-stops))"
                )]) :

                void 0;
              };
            },
            gradientPositionModifiers_FcmPeE = [
            "oklab",
            "oklch",
            "srgb",
            "hsl",
            "longer",
            "shorter",
            "increasing",
            "decreasing"],

            linearGradientDirectionMap_diWdhw = new Map([
            ["to-t", "to top"],
            ["to-tr", "to top right"],
            ["to-r", "to right"],
            ["to-br", "to bottom right"],
            ["to-b", "to bottom"],
            ["to-bl", "to bottom left"],
            ["to-l", "to left"],
            ["to-tl", "to top left"]]
            );
          utilityRegistry_fatAmE.functional("-bg-linear", makeGradientAngleHandler_xltnfK({ negative: !0 })),
          utilityRegistry_fatAmE.functional("bg-linear", makeGradientAngleHandler_xltnfK({ negative: !1 })),
          registerCompletions_VddGyH("bg-linear", () => [
          { values: [...linearGradientDirectionMap_diWdhw.keys()], modifiers: gradientPositionModifiers_FcmPeE },
          {
            values: [
            "0",
            "30",
            "60",
            "90",
            "120",
            "150",
            "180",
            "210",
            "240",
            "270",
            "300",
            "330"],

            supportsNegative: !0,
            modifiers: gradientPositionModifiers_FcmPeE
          }]
          ),
          utilityRegistry_fatAmE.functional("-bg-conic", makeConicGradientHandler_JKjoxs({ negative: !0 })),
          utilityRegistry_fatAmE.functional("bg-conic", makeConicGradientHandler_JKjoxs({ negative: !1 })),
          registerCompletions_VddGyH("bg-conic", () => [
          { hasDefaultValue: !0, modifiers: gradientPositionModifiers_FcmPeE },
          {
            values: [
            "0",
            "30",
            "60",
            "90",
            "120",
            "150",
            "180",
            "210",
            "240",
            "270",
            "300",
            "330"],

            supportsNegative: !0,
            modifiers: gradientPositionModifiers_FcmPeE
          }]
          ),
          utilityRegistry_fatAmE.functional("bg-radial", (arg_UIhnRj) => {
            if (!arg_UIhnRj.value)
            return [
            makeDeclarationNode_xYlaTt("--tw-gradient-position", getGradientDirectionString_PVWmKq(arg_UIhnRj.modifier)),
            makeDeclarationNode_xYlaTt(
              "background-image",
              "radial-gradient(var(--tw-gradient-stops))"
            )];

            if ("arbitrary" === arg_UIhnRj.value.kind) {
              if (arg_UIhnRj.modifier) return;
              let val_zOwYsN = arg_UIhnRj.value.value;
              return [
              makeDeclarationNode_xYlaTt("--tw-gradient-position", val_zOwYsN),
              makeDeclarationNode_xYlaTt(
                "background-image",
                `radial-gradient(var(--tw-gradient-stops,${val_zOwYsN}))`
              )];

            }
          }),
          registerCompletions_VddGyH("bg-radial", () => [{ hasDefaultValue: !0, modifiers: gradientPositionModifiers_FcmPeE }]);
        }
        utilityRegistry_fatAmE.functional("bg", (arg_GLppuw) => {
          if (arg_GLppuw.value) {
            if ("arbitrary" === arg_GLppuw.value.kind) {
              let val_oZMNUV = arg_GLppuw.value.value;
              switch (
              arg_GLppuw.value.dataType ??
              resolveCssType_DhcVtf(val_oZMNUV, [
              "image",
              "color",
              "percentage",
              "position",
              "bg-size",
              "length",
              "url"]
              )) {

                case "percentage":
                case "position":
                  return arg_GLppuw.modifier ? void 0 : [makeDeclarationNode_xYlaTt("background-position", val_oZMNUV)];
                case "bg-size":
                case "length":
                case "size":
                  return arg_GLppuw.modifier ? void 0 : [makeDeclarationNode_xYlaTt("background-size", val_oZMNUV)];
                case "image":
                case "url":
                  return arg_GLppuw.modifier ? void 0 : [makeDeclarationNode_xYlaTt("background-image", val_oZMNUV)];
                default:
                  return (
                    val_oZMNUV = applyOpacityToColor_qFFjzR(val_oZMNUV, arg_GLppuw.modifier, themeVarMap_nHCGUd),
                    null === val_oZMNUV ? void 0 : [makeDeclarationNode_xYlaTt("background-color", val_oZMNUV)]);

              }
            }
            {
              let colorValue_EXbvtt = mapStaticThemeColor_GNTWCf(arg_GLppuw, themeVarMap_nHCGUd, ["--background-color", "--color"]);
              if (colorValue_EXbvtt) return [makeDeclarationNode_xYlaTt("background-color", colorValue_EXbvtt)];
            }
            {
              if (arg_GLppuw.modifier) return;
              let resolvedImage_VdqQRt = themeVarMap_nHCGUd.resolve(arg_GLppuw.value.value, ["--background-image"]);
              if (resolvedImage_VdqQRt) return [makeDeclarationNode_xYlaTt("background-image", resolvedImage_VdqQRt)];
            }
          }
        }),
        registerCompletions_VddGyH("bg", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--background-color", "--color"],
          modifiers: Array.from({ length: 21 }, (unusedBgModifierValue_cTlVur, bgModifierIndex_tbbFKk) => "" + 5 * bgModifierIndex_tbbFKk)
        },
        { values: [], valueThemeKeys: ["--background-image"] }]
        );
        let makeGradientVarsInit_oZuZmq = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-gradient-position"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-from", "#0000", "<color>"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-via", "#0000", "<color>"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-to", "#0000", "<color>"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-stops"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-via-stops"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-from-position", "0%", "<length-percentage>"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-via-position", "50%", "<length-percentage>"),
        makeAtPropertyNode_DIaSSt("--tw-gradient-to-position", "100%", "<length-percentage>")]
        );
        function registerGradientColorStop_LOGuyu(utilityKey_iRmdEL, handlers_PPgCkP) {
          utilityRegistry_fatAmE.functional(utilityKey_iRmdEL, (arg_JhkiFv) => {
            if (arg_JhkiFv.value) {
              if ("arbitrary" === arg_JhkiFv.value.kind) {
                let val_gxrFjF = arg_JhkiFv.value.value;
                switch (
                arg_JhkiFv.value.dataType ??
                resolveCssType_DhcVtf(val_gxrFjF, ["color", "length", "percentage"])) {

                  case "length":
                  case "percentage":
                    return arg_JhkiFv.modifier ? void 0 : handlers_PPgCkP.position(val_gxrFjF);
                  default:
                    return (
                      val_gxrFjF = applyOpacityToColor_qFFjzR(val_gxrFjF, arg_JhkiFv.modifier, themeVarMap_nHCGUd),
                      null === val_gxrFjF ? void 0 : handlers_PPgCkP.color(val_gxrFjF));

                }
              }
              {
                let colorValue_zrZxJe = mapStaticThemeColor_GNTWCf(arg_JhkiFv, themeVarMap_nHCGUd, ["--background-color", "--color"]);
                if (colorValue_zrZxJe) return handlers_PPgCkP.color(colorValue_zrZxJe);
              }
              {
                if (arg_JhkiFv.modifier) return;
                let resolvedStop_kgXJNj = themeVarMap_nHCGUd.resolve(arg_JhkiFv.value.value, [
                "--gradient-color-stop-positions"]
                );
                if (resolvedStop_kgXJNj) return handlers_PPgCkP.position(resolvedStop_kgXJNj);
                if (
                "%" === arg_JhkiFv.value.value[arg_JhkiFv.value.value.length - 1] &&
                isNonNegativeInteger_QISFSJ(arg_JhkiFv.value.value.slice(0, -1)))

                return handlers_PPgCkP.position(arg_JhkiFv.value.value);
              }
            }
          }),
          registerCompletions_VddGyH(utilityKey_iRmdEL, () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--background-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedValue_yscjXE, idx_kXpMzj) => "" + 5 * idx_kXpMzj)
          },
          {
            values: Array.from({ length: 21 }, (unusedValue_QqWglB, idx_DeIbXT) => 5 * idx_DeIbXT + "%"),
            valueThemeKeys: ["--gradient-color-stop-positions"]
          }]
          );
        }
        registerGradientColorStop_LOGuyu("from", {
          color: (colorVal_HzHRBj) => [
          makeGradientVarsInit_oZuZmq(),
          makeDeclarationNode_xYlaTt("--tw-sort", "--tw-gradient-from"),
          makeDeclarationNode_xYlaTt("--tw-gradient-from", colorVal_HzHRBj),
          makeDeclarationNode_xYlaTt(
            "--tw-gradient-stops",
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))"
          )],

          position: (posVal_yeMBnn) => [makeGradientVarsInit_oZuZmq(), makeDeclarationNode_xYlaTt("--tw-gradient-from-position", posVal_yeMBnn)]
        }),
        registerStaticUtility_zeqrZG("via-none", [["--tw-gradient-via-stops", "initial"]]),
        registerGradientColorStop_LOGuyu("via", {
          color: (colorVal_YRUywI) => [
          makeGradientVarsInit_oZuZmq(),
          makeDeclarationNode_xYlaTt("--tw-sort", "--tw-gradient-via"),
          makeDeclarationNode_xYlaTt("--tw-gradient-via", colorVal_YRUywI),
          makeDeclarationNode_xYlaTt(
            "--tw-gradient-via-stops",
            "var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-via) var(--tw-gradient-via-position), var(--tw-gradient-to) var(--tw-gradient-to-position)"
          ),
          makeDeclarationNode_xYlaTt("--tw-gradient-stops", "var(--tw-gradient-via-stops)")],

          position: (posVal_SAWmVc) => [makeGradientVarsInit_oZuZmq(), makeDeclarationNode_xYlaTt("--tw-gradient-via-position", posVal_SAWmVc)]
        }),
        registerGradientColorStop_LOGuyu("to", {
          color: (colorVal_bJrSnp) => [
          makeGradientVarsInit_oZuZmq(),
          makeDeclarationNode_xYlaTt("--tw-sort", "--tw-gradient-to"),
          makeDeclarationNode_xYlaTt("--tw-gradient-to", colorVal_bJrSnp),
          makeDeclarationNode_xYlaTt(
            "--tw-gradient-stops",
            "var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position))"
          )],

          position: (posVal_nxUHwF) => [makeGradientVarsInit_oZuZmq(), makeDeclarationNode_xYlaTt("--tw-gradient-to-position", posVal_nxUHwF)]
        }),
        registerStaticUtility_zeqrZG("mask-none", [["mask-image", "none"]]),
        utilityRegistry_fatAmE.functional("mask", (arg_OmhrbV) => {
          if (!arg_OmhrbV.value || arg_OmhrbV.modifier || "arbitrary" !== arg_OmhrbV.value.kind) return;
          let val_SyceZQ = arg_OmhrbV.value.value;
          switch (
          arg_OmhrbV.value.dataType ??
          resolveCssType_DhcVtf(val_SyceZQ, [
          "image",
          "percentage",
          "position",
          "bg-size",
          "length",
          "url"]
          )) {

            case "percentage":
            case "position":
              return arg_OmhrbV.modifier ? void 0 : [makeDeclarationNode_xYlaTt("mask-position", val_SyceZQ)];
            case "bg-size":
            case "length":
            case "size":
              return [makeDeclarationNode_xYlaTt("mask-size", val_SyceZQ)];
            default:
              return [makeDeclarationNode_xYlaTt("mask-image", val_SyceZQ)];
          }
        }),
        registerStaticUtility_zeqrZG("mask-add", [["mask-composite", "add"]]),
        registerStaticUtility_zeqrZG("mask-subtract", [["mask-composite", "subtract"]]),
        registerStaticUtility_zeqrZG("mask-intersect", [["mask-composite", "intersect"]]),
        registerStaticUtility_zeqrZG("mask-exclude", [["mask-composite", "exclude"]]),
        registerStaticUtility_zeqrZG("mask-alpha", [["mask-mode", "alpha"]]),
        registerStaticUtility_zeqrZG("mask-luminance", [["mask-mode", "luminance"]]),
        registerStaticUtility_zeqrZG("mask-match", [["mask-mode", "match-source"]]),
        registerStaticUtility_zeqrZG("mask-type-alpha", [["mask-type", "alpha"]]),
        registerStaticUtility_zeqrZG("mask-type-luminance", [["mask-type", "luminance"]]),
        registerStaticUtility_zeqrZG("mask-auto", [["mask-size", "auto"]]),
        registerStaticUtility_zeqrZG("mask-cover", [["mask-size", "cover"]]),
        registerStaticUtility_zeqrZG("mask-contain", [["mask-size", "contain"]]),
        registerFunctionalHandler_VuzNfs("mask-size", {
          handle(v_gSfLGZ) {
            if (v_gSfLGZ) return [makeDeclarationNode_xYlaTt("mask-size", v_gSfLGZ)];
          }
        }),
        registerStaticUtility_zeqrZG("mask-top", [["mask-position", "top"]]),
        registerStaticUtility_zeqrZG("mask-top-left", [["mask-position", "left top"]]),
        registerStaticUtility_zeqrZG("mask-top-right", [["mask-position", "right top"]]),
        registerStaticUtility_zeqrZG("mask-bottom", [["mask-position", "bottom"]]),
        registerStaticUtility_zeqrZG("mask-bottom-left", [["mask-position", "left bottom"]]),
        registerStaticUtility_zeqrZG("mask-bottom-right", [["mask-position", "right bottom"]]),
        registerStaticUtility_zeqrZG("mask-left", [["mask-position", "left"]]),
        registerStaticUtility_zeqrZG("mask-right", [["mask-position", "right"]]),
        registerStaticUtility_zeqrZG("mask-center", [["mask-position", "center"]]),
        registerFunctionalHandler_VuzNfs("mask-position", {
          handle(val_xtxeYj) {
            if (val_xtxeYj) return [makeDeclarationNode_xYlaTt("mask-position", val_xtxeYj)];
          }
        }),
        registerStaticUtility_zeqrZG("mask-repeat", [["mask-repeat", "repeat"]]),
        registerStaticUtility_zeqrZG("mask-no-repeat", [["mask-repeat", "no-repeat"]]),
        registerStaticUtility_zeqrZG("mask-repeat-x", [["mask-repeat", "repeat-x"]]),
        registerStaticUtility_zeqrZG("mask-repeat-y", [["mask-repeat", "repeat-y"]]),
        registerStaticUtility_zeqrZG("mask-repeat-round", [["mask-repeat", "round"]]),
        registerStaticUtility_zeqrZG("mask-repeat-space", [["mask-repeat", "space"]]),
        registerStaticUtility_zeqrZG("mask-clip-border", [["mask-clip", "border-box"]]),
        registerStaticUtility_zeqrZG("mask-clip-padding", [["mask-clip", "padding-box"]]),
        registerStaticUtility_zeqrZG("mask-clip-content", [["mask-clip", "content-box"]]),
        registerStaticUtility_zeqrZG("mask-clip-fill", [["mask-clip", "fill-box"]]),
        registerStaticUtility_zeqrZG("mask-clip-stroke", [["mask-clip", "stroke-box"]]),
        registerStaticUtility_zeqrZG("mask-clip-view", [["mask-clip", "view-box"]]),
        registerStaticUtility_zeqrZG("mask-no-clip", [["mask-clip", "no-clip"]]),
        registerStaticUtility_zeqrZG("mask-origin-border", [["mask-origin", "border-box"]]),
        registerStaticUtility_zeqrZG("mask-origin-padding", [["mask-origin", "padding-box"]]),
        registerStaticUtility_zeqrZG("mask-origin-content", [["mask-origin", "content-box"]]),
        registerStaticUtility_zeqrZG("mask-origin-fill", [["mask-origin", "fill-box"]]),
        registerStaticUtility_zeqrZG("mask-origin-stroke", [["mask-origin", "stroke-box"]]),
        registerStaticUtility_zeqrZG("mask-origin-view", [["mask-origin", "view-box"]]);
        let makeMaskVarsInit_AgvOng = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-mask-linear", "linear-gradient(#fff, #fff)"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial", "linear-gradient(#fff, #fff)"),
        makeAtPropertyNode_DIaSSt("--tw-mask-conic", "linear-gradient(#fff, #fff)")]
        );
        function registerMaskLinearUtility_mTpptc(utilityKey_yJUXWL, handlers_NUyjuo) {
          utilityRegistry_fatAmE.functional(utilityKey_yJUXWL, (arg_xngbzr) => {
            if (arg_xngbzr.value) {
              if ("arbitrary" === arg_xngbzr.value.kind) {
                let val_wYinXS = arg_xngbzr.value.value;
                switch (
                arg_xngbzr.value.dataType ??
                resolveCssType_DhcVtf(val_wYinXS, ["length", "percentage", "color"])) {

                  case "color":
                    return (
                      val_wYinXS = applyOpacityToColor_qFFjzR(val_wYinXS, arg_xngbzr.modifier, themeVarMap_nHCGUd),
                      null === val_wYinXS ? void 0 : handlers_NUyjuo.color(val_wYinXS));

                  case "percentage":
                    return arg_xngbzr.modifier || !isNonNegativeInteger_QISFSJ(val_wYinXS.slice(0, -1)) ?
                    void 0 :
                    handlers_NUyjuo.position(val_wYinXS);
                  default:
                    return arg_xngbzr.modifier ? void 0 : handlers_NUyjuo.position(val_wYinXS);
                }
              }
              {
                let colorVal_mxRSWj = mapStaticThemeColor_GNTWCf(arg_xngbzr, themeVarMap_nHCGUd, ["--background-color", "--color"]);
                if (colorVal_mxRSWj) return handlers_NUyjuo.color(colorVal_mxRSWj);
              }
              {
                if (arg_xngbzr.modifier) return;
                let type_EbBPtc = resolveCssType_DhcVtf(arg_xngbzr.value.value, ["number", "percentage"]);
                if (!type_EbBPtc) return;
                switch (type_EbBPtc) {
                  case "number":{
                      let spacingVar_hMphwT = themeVarMap_nHCGUd.resolve(null, ["--spacing"]);
                      return spacingVar_hMphwT && isQuarterStep_WkCuTa(arg_xngbzr.value.value) ?
                      handlers_NUyjuo.position(`calc(${spacingVar_hMphwT} * ${arg_xngbzr.value.value})`) :
                      void 0;
                    }
                  case "percentage":
                    return isNonNegativeInteger_QISFSJ(arg_xngbzr.value.value.slice(0, -1)) ?
                    handlers_NUyjuo.position(arg_xngbzr.value.value) :
                    void 0;
                  default:
                    return;
                }
              }
            }
          }),
          registerCompletions_VddGyH(utilityKey_yJUXWL, () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--background-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedVal_LyEMjR, idx_ldSvZW) => "" + 5 * idx_ldSvZW)
          },
          {
            values: Array.from({ length: 21 }, (unusedVal_Njrvay, idx_WQcZOc) => 5 * idx_WQcZOc + "%"),
            valueThemeKeys: ["--gradient-color-stop-positions"]
          }]
          ),
          registerCompletions_VddGyH(utilityKey_yJUXWL, () => [
          { values: Array.from({ length: 21 }, (unusedVal_IZJZGS, idx_NsCGEZ) => 5 * idx_NsCGEZ + "%") },
          { values: themeVarMap_nHCGUd.get(["--spacing"]) ? spacingSteps_NjsqjM : [] },
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--background-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedVal_bhLmMw, idx_haiNTQ) => "" + 5 * idx_haiNTQ)
          }]
          );
        }
        let makeMaskSideVarsInit_AYSJsC = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-mask-left", "linear-gradient(#fff, #fff)"),
        makeAtPropertyNode_DIaSSt("--tw-mask-right", "linear-gradient(#fff, #fff)"),
        makeAtPropertyNode_DIaSSt("--tw-mask-bottom", "linear-gradient(#fff, #fff)"),
        makeAtPropertyNode_DIaSSt("--tw-mask-top", "linear-gradient(#fff, #fff)")]
        );
        function registerDirectionalMaskLinearUtility_zTEqNr(utilityKey_WzhUuy, dir_AQqUGT, sides_OdmvJR) {
          registerMaskLinearUtility_mTpptc(utilityKey_WzhUuy, {
            color(colorVal_DezxOR) {
              let outArr_tfKsAt = [
              makeMaskVarsInit_AgvOng(),
              makeMaskSideVarsInit_AYSJsC(),
              makeDeclarationNode_xYlaTt(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
              ),
              makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
              makeDeclarationNode_xYlaTt(
                "--tw-mask-linear",
                "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)"
              )];

              for (let side_RZUIdp of ["top", "right", "bottom", "left"])
              sides_OdmvJR[side_RZUIdp] && (
              outArr_tfKsAt.push(
                makeDeclarationNode_xYlaTt(
                  `--tw-mask-${side_RZUIdp}`,
                  `linear-gradient(to ${side_RZUIdp}, var(--tw-mask-${side_RZUIdp}-from-color) var(--tw-mask-${side_RZUIdp}-from-position), var(--tw-mask-${side_RZUIdp}-to-color) var(--tw-mask-${side_RZUIdp}-to-position))`
                )
              ),
              outArr_tfKsAt.push(
                makeAtRootNode_uVreCe([
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_RZUIdp}-from-position`, "0%"),
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_RZUIdp}-to-position`, "100%"),
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_RZUIdp}-from-color`, "black"),
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_RZUIdp}-to-color`, "transparent")]
                )
              ),
              outArr_tfKsAt.push(makeDeclarationNode_xYlaTt(`--tw-mask-${side_RZUIdp}-${dir_AQqUGT}-color`, colorVal_DezxOR)));
              return outArr_tfKsAt;
            },
            position(posVal_iGYusp) {
              let outArr_MHDtrp = [
              makeMaskVarsInit_AgvOng(),
              makeMaskSideVarsInit_AYSJsC(),
              makeDeclarationNode_xYlaTt(
                "mask-image",
                "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
              ),
              makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
              makeDeclarationNode_xYlaTt(
                "--tw-mask-linear",
                "var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top)"
              )];

              for (let side_YDpJKw of ["top", "right", "bottom", "left"])
              sides_OdmvJR[side_YDpJKw] && (
              outArr_MHDtrp.push(
                makeDeclarationNode_xYlaTt(
                  `--tw-mask-${side_YDpJKw}`,
                  `linear-gradient(to ${side_YDpJKw}, var(--tw-mask-${side_YDpJKw}-from-color) var(--tw-mask-${side_YDpJKw}-from-position), var(--tw-mask-${side_YDpJKw}-to-color) var(--tw-mask-${side_YDpJKw}-to-position))`
                )
              ),
              outArr_MHDtrp.push(
                makeAtRootNode_uVreCe([
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_YDpJKw}-from-position`, "0%"),
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_YDpJKw}-to-position`, "100%"),
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_YDpJKw}-from-color`, "black"),
                makeAtPropertyNode_DIaSSt(`--tw-mask-${side_YDpJKw}-to-color`, "transparent")]
                )
              ),
              outArr_MHDtrp.push(makeDeclarationNode_xYlaTt(`--tw-mask-${side_YDpJKw}-${dir_AQqUGT}-position`, posVal_iGYusp)));
              return outArr_MHDtrp;
            }
          });
        }
        registerDirectionalMaskLinearUtility_zTEqNr("mask-x-from", "from", { top: !1, right: !0, bottom: !1, left: !0 }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-x-to", "to", { top: !1, right: !0, bottom: !1, left: !0 }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-y-from", "from", {
          top: !0,
          right: !1,
          bottom: !0,
          left: !1
        }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-y-to", "to", { top: !0, right: !1, bottom: !0, left: !1 }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-t-from", "from", {
          top: !0,
          right: !1,
          bottom: !1,
          left: !1
        }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-t-to", "to", { top: !0, right: !1, bottom: !1, left: !1 }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-r-from", "from", {
          top: !1,
          right: !0,
          bottom: !1,
          left: !1
        }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-r-to", "to", { top: !1, right: !0, bottom: !1, left: !1 }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-b-from", "from", {
          top: !1,
          right: !1,
          bottom: !0,
          left: !1
        }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-b-to", "to", { top: !1, right: !1, bottom: !0, left: !1 }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-l-from", "from", {
          top: !1,
          right: !1,
          bottom: !1,
          left: !0
        }),
        registerDirectionalMaskLinearUtility_zTEqNr("mask-l-to", "to", { top: !1, right: !1, bottom: !1, left: !0 });
        let makeMaskLinearVarsInit_ScXLIs = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-mask-linear-position", "0deg"),
        makeAtPropertyNode_DIaSSt("--tw-mask-linear-from-position", "0%"),
        makeAtPropertyNode_DIaSSt("--tw-mask-linear-to-position", "100%"),
        makeAtPropertyNode_DIaSSt("--tw-mask-linear-from-color", "black"),
        makeAtPropertyNode_DIaSSt("--tw-mask-linear-to-color", "transparent")]
        );
        registerFunctionalHandler_VuzNfs("mask-linear", {
          defaultValue: null,
          supportsNegative: !0,
          supportsFractions: !1,
          handleBareValue: (arg_vyAuiK) =>
          isNonNegativeInteger_QISFSJ(arg_vyAuiK.value) ? `calc(1deg * ${arg_vyAuiK.value})` : null,
          handleNegativeBareValue: (arg_fFNxwC) =>
          isNonNegativeInteger_QISFSJ(arg_fFNxwC.value) ? `calc(1deg * -${arg_fFNxwC.value})` : null,
          handle: (v_mDHhLz) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskLinearVarsInit_ScXLIs(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear",
            "linear-gradient(var(--tw-mask-linear-stops, var(--tw-mask-linear-position)))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-linear-position", v_mDHhLz)]

        }),
        registerCompletions_VddGyH("mask-linear", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"]
        }]
        ),
        registerMaskLinearUtility_mTpptc("mask-linear-from", {
          color: (colorVal_ogCQuD) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskLinearVarsInit_ScXLIs(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear",
            "linear-gradient(var(--tw-mask-linear-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-linear-from-color", colorVal_ogCQuD)],

          position: (posVal_YyJKvJ) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskLinearVarsInit_ScXLIs(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear",
            "linear-gradient(var(--tw-mask-linear-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-linear-from-position", posVal_YyJKvJ)]

        }),
        registerMaskLinearUtility_mTpptc("mask-linear-to", {
          color: (colorVal_MpsnUc) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskLinearVarsInit_ScXLIs(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear",
            "linear-gradient(var(--tw-mask-linear-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-linear-to-color", colorVal_MpsnUc)],

          position: (posVal_IEvkQt) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskLinearVarsInit_ScXLIs(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear-stops",
            "var(--tw-mask-linear-position), var(--tw-mask-linear-from-color) var(--tw-mask-linear-from-position), var(--tw-mask-linear-to-color) var(--tw-mask-linear-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-linear",
            "linear-gradient(var(--tw-mask-linear-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-linear-to-position", posVal_IEvkQt)]

        });
        let makeMaskRadialVarsInit_JFnMvx = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-from-position", "0%"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-to-position", "100%"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-from-color", "black"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-to-color", "transparent"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-shape", "ellipse"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-size", "farthest-corner"),
        makeAtPropertyNode_DIaSSt("--tw-mask-radial-position", "center")]
        );
        registerStaticUtility_zeqrZG("mask-circle", [["--tw-mask-radial-shape", "circle"]]),
        registerStaticUtility_zeqrZG("mask-ellipse", [["--tw-mask-radial-shape", "ellipse"]]),
        registerStaticUtility_zeqrZG("mask-radial-closest-side", [
        ["--tw-mask-radial-size", "closest-side"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-farthest-side", [
        ["--tw-mask-radial-size", "farthest-side"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-closest-corner", [
        ["--tw-mask-radial-size", "closest-corner"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-farthest-corner", [
        ["--tw-mask-radial-size", "farthest-corner"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-at-top", [["--tw-mask-radial-position", "top"]]),
        registerStaticUtility_zeqrZG("mask-radial-at-top-left", [
        ["--tw-mask-radial-position", "top left"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-at-top-right", [
        ["--tw-mask-radial-position", "top right"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-at-bottom", [["--tw-mask-radial-position", "bottom"]]),
        registerStaticUtility_zeqrZG("mask-radial-at-bottom-left", [
        ["--tw-mask-radial-position", "bottom left"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-at-bottom-right", [
        ["--tw-mask-radial-position", "bottom right"]]
        ),
        registerStaticUtility_zeqrZG("mask-radial-at-left", [["--tw-mask-radial-position", "left"]]),
        registerStaticUtility_zeqrZG("mask-radial-at-right", [["--tw-mask-radial-position", "right"]]),
        registerStaticUtility_zeqrZG("mask-radial-at-center", [["--tw-mask-radial-position", "center"]]),
        registerFunctionalHandler_VuzNfs("mask-radial-at", {
          defaultValue: null,
          supportsNegative: !1,
          supportsFractions: !1,
          handle: (v_GiTnfo) => [makeDeclarationNode_xYlaTt("--tw-mask-radial-position", v_GiTnfo)]
        }),
        registerFunctionalHandler_VuzNfs("mask-radial", {
          defaultValue: null,
          supportsNegative: !1,
          supportsFractions: !1,
          handle: (v_jcTKyy) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskRadialVarsInit_JFnMvx(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial",
            "radial-gradient(var(--tw-mask-radial-stops, var(--tw-mask-radial-size)))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-radial-size", v_jcTKyy)]

        }),
        registerMaskLinearUtility_mTpptc("mask-radial-from", {
          color: (colorVal_aydeuq) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskRadialVarsInit_JFnMvx(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial",
            "radial-gradient(var(--tw-mask-radial-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-radial-from-color", colorVal_aydeuq)],

          position: (posVal_geCMtw) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskRadialVarsInit_JFnMvx(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial",
            "radial-gradient(var(--tw-mask-radial-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-radial-from-position", posVal_geCMtw)]

        }),
        registerMaskLinearUtility_mTpptc("mask-radial-to", {
          color: (colorVal_YHgsHQ) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskRadialVarsInit_JFnMvx(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial",
            "radial-gradient(var(--tw-mask-radial-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-radial-to-color", colorVal_YHgsHQ)],

          position: (posVal_TtZfVy) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskRadialVarsInit_JFnMvx(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial-stops",
            "var(--tw-mask-radial-shape) var(--tw-mask-radial-size) at var(--tw-mask-radial-position), var(--tw-mask-radial-from-color) var(--tw-mask-radial-from-position), var(--tw-mask-radial-to-color) var(--tw-mask-radial-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-radial",
            "radial-gradient(var(--tw-mask-radial-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-radial-to-position", posVal_TtZfVy)]

        });
        let makeMaskConicVarsInit_WDWMPu = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-mask-conic-position", "0deg"),
        makeAtPropertyNode_DIaSSt("--tw-mask-conic-from-position", "0%"),
        makeAtPropertyNode_DIaSSt("--tw-mask-conic-to-position", "100%"),
        makeAtPropertyNode_DIaSSt("--tw-mask-conic-from-color", "black"),
        makeAtPropertyNode_DIaSSt("--tw-mask-conic-to-color", "transparent")]
        );
        registerFunctionalHandler_VuzNfs("mask-conic", {
          defaultValue: null,
          supportsNegative: !0,
          supportsFractions: !1,
          handleBareValue: (arg_dPWFsO) =>
          isNonNegativeInteger_QISFSJ(arg_dPWFsO.value) ? `calc(1deg * ${arg_dPWFsO.value})` : null,
          handleNegativeBareValue: (arg_nSGKdl) =>
          isNonNegativeInteger_QISFSJ(arg_nSGKdl.value) ? `calc(1deg * -${arg_nSGKdl.value})` : null,
          handle: (v_XYmwJh) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskConicVarsInit_WDWMPu(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic",
            "conic-gradient(var(--tw-mask-conic-stops, var(--tw-mask-conic-position)))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-conic-position", v_XYmwJh)]

        }),
        registerCompletions_VddGyH("mask-conic", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "3", "6", "12", "45", "90", "180"]
        }]
        ),
        registerMaskLinearUtility_mTpptc("mask-conic-from", {
          color: (colorVal_wmabye) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskConicVarsInit_WDWMPu(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic",
            "conic-gradient(var(--tw-mask-conic-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-conic-from-color", colorVal_wmabye)],

          position: (posVal_JgMbwK) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskConicVarsInit_WDWMPu(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic",
            "conic-gradient(var(--tw-mask-conic-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-conic-from-position", posVal_JgMbwK)]

        }),
        registerMaskLinearUtility_mTpptc("mask-conic-to", {
          color: (colorVal_PGkDpx) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskConicVarsInit_WDWMPu(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic",
            "conic-gradient(var(--tw-mask-conic-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-conic-to-color", colorVal_PGkDpx)],

          position: (posVal_KhllZd) => [
          makeMaskVarsInit_AgvOng(),
          makeMaskConicVarsInit_WDWMPu(),
          makeDeclarationNode_xYlaTt(
            "mask-image",
            "var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic)"
          ),
          makeDeclarationNode_xYlaTt("mask-composite", "intersect"),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic-stops",
            "from var(--tw-mask-conic-position), var(--tw-mask-conic-from-color) var(--tw-mask-conic-from-position), var(--tw-mask-conic-to-color) var(--tw-mask-conic-to-position)"
          ),
          makeDeclarationNode_xYlaTt(
            "--tw-mask-conic",
            "conic-gradient(var(--tw-mask-conic-stops))"
          ),
          makeDeclarationNode_xYlaTt("--tw-mask-conic-to-position", posVal_KhllZd)]

        }),
        registerStaticUtility_zeqrZG("box-decoration-slice", [
        ["-webkit-box-decoration-break", "slice"],
        ["box-decoration-break", "slice"]]
        ),
        registerStaticUtility_zeqrZG("box-decoration-clone", [
        ["-webkit-box-decoration-break", "clone"],
        ["box-decoration-break", "clone"]]
        ),
        registerStaticUtility_zeqrZG("bg-clip-text", [["background-clip", "text"]]),
        registerStaticUtility_zeqrZG("bg-clip-border", [["background-clip", "border-box"]]),
        registerStaticUtility_zeqrZG("bg-clip-padding", [["background-clip", "padding-box"]]),
        registerStaticUtility_zeqrZG("bg-clip-content", [["background-clip", "content-box"]]),
        registerStaticUtility_zeqrZG("bg-origin-border", [["background-origin", "border-box"]]),
        registerStaticUtility_zeqrZG("bg-origin-padding", [["background-origin", "padding-box"]]),
        registerStaticUtility_zeqrZG("bg-origin-content", [["background-origin", "content-box"]]);
        for (let val_OLTpGN of [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity"])

        registerStaticUtility_zeqrZG(`bg-blend-${val_OLTpGN}`, [["background-blend-mode", val_OLTpGN]]),
        registerStaticUtility_zeqrZG(`mix-blend-${val_OLTpGN}`, [["mix-blend-mode", val_OLTpGN]]);
        registerStaticUtility_zeqrZG("mix-blend-plus-darker", [["mix-blend-mode", "plus-darker"]]),
        registerStaticUtility_zeqrZG("mix-blend-plus-lighter", [["mix-blend-mode", "plus-lighter"]]),
        registerStaticUtility_zeqrZG("fill-none", [["fill", "none"]]),
        utilityRegistry_fatAmE.functional("fill", (arg_ygCiGw) => {
          if (!arg_ygCiGw.value) return;
          if ("arbitrary" === arg_ygCiGw.value.kind) {
            let val_cDmYSd = applyOpacityToColor_qFFjzR(arg_ygCiGw.value.value, arg_ygCiGw.modifier, themeVarMap_nHCGUd);
            return null === val_cDmYSd ? void 0 : [makeDeclarationNode_xYlaTt("fill", val_cDmYSd)];
          }
          let fillVal_BkpyZp = mapStaticThemeColor_GNTWCf(arg_ygCiGw, themeVarMap_nHCGUd, ["--fill", "--color"]);
          return fillVal_BkpyZp ? [makeDeclarationNode_xYlaTt("fill", fillVal_BkpyZp)] : void 0;
        }),
        registerCompletions_VddGyH("fill", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--fill", "--color"],
          modifiers: Array.from({ length: 21 }, (unusedVal_MDVkVf, idx_rsZYyR) => "" + 5 * idx_rsZYyR)
        }]
        ),
        registerStaticUtility_zeqrZG("stroke-none", [["stroke", "none"]]),
        utilityRegistry_fatAmE.functional("stroke", (arg_uYKfHe) => {
          if (arg_uYKfHe.value) {
            if ("arbitrary" === arg_uYKfHe.value.kind) {
              let val_upksHg = arg_uYKfHe.value.value;
              switch (
              arg_uYKfHe.value.dataType ??
              resolveCssType_DhcVtf(val_upksHg, ["color", "number", "length", "percentage"])) {

                case "number":
                case "length":
                case "percentage":
                  return arg_uYKfHe.modifier ? void 0 : [makeDeclarationNode_xYlaTt("stroke-width", val_upksHg)];
                default:
                  return (
                    val_upksHg = applyOpacityToColor_qFFjzR(arg_uYKfHe.value.value, arg_uYKfHe.modifier, themeVarMap_nHCGUd),
                    null === val_upksHg ? void 0 : [makeDeclarationNode_xYlaTt("stroke", val_upksHg)]);

              }
            }
            {
              let strokeColor_kJHKMs = mapStaticThemeColor_GNTWCf(arg_uYKfHe, themeVarMap_nHCGUd, ["--stroke", "--color"]);
              if (strokeColor_kJHKMs) return [makeDeclarationNode_xYlaTt("stroke", strokeColor_kJHKMs)];
            }
            {
              let resolvedWidth_pItYcE = themeVarMap_nHCGUd.resolve(arg_uYKfHe.value.value, ["--stroke-width"]);
              if (resolvedWidth_pItYcE) return [makeDeclarationNode_xYlaTt("stroke-width", resolvedWidth_pItYcE)];
              if (isNonNegativeInteger_QISFSJ(arg_uYKfHe.value.value))
              return [makeDeclarationNode_xYlaTt("stroke-width", arg_uYKfHe.value.value)];
            }
          }
        }),
        registerCompletions_VddGyH("stroke", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--stroke", "--color"],
          modifiers: Array.from({ length: 21 }, (unusedVal_KeORWK, idx_IuBEom) => "" + 5 * idx_IuBEom)
        },
        {
          values: ["0", "1", "2", "3"],
          valueThemeKeys: ["--stroke-width"]
        }]
        ),
        registerStaticUtility_zeqrZG("object-contain", [["object-fit", "contain"]]),
        registerStaticUtility_zeqrZG("object-cover", [["object-fit", "cover"]]),
        registerStaticUtility_zeqrZG("object-fill", [["object-fit", "fill"]]),
        registerStaticUtility_zeqrZG("object-none", [["object-fit", "none"]]),
        registerStaticUtility_zeqrZG("object-scale-down", [["object-fit", "scale-down"]]),
        registerStaticUtility_zeqrZG("object-top", [["object-position", "top"]]),
        registerStaticUtility_zeqrZG("object-top-left", [["object-position", "left top"]]),
        registerStaticUtility_zeqrZG("object-top-right", [["object-position", "right top"]]),
        registerStaticUtility_zeqrZG("object-bottom", [["object-position", "bottom"]]),
        registerStaticUtility_zeqrZG("object-bottom-left", [["object-position", "left bottom"]]),
        registerStaticUtility_zeqrZG("object-bottom-right", [["object-position", "right bottom"]]),
        registerStaticUtility_zeqrZG("object-left", [["object-position", "left"]]),
        registerStaticUtility_zeqrZG("object-right", [["object-position", "right"]]),
        registerStaticUtility_zeqrZG("object-center", [["object-position", "center"]]),
        registerFunctionalHandler_VuzNfs("object", {
          themeKeys: ["--object-position"],
          handle: (v_MxtMYy) => [makeDeclarationNode_xYlaTt("object-position", v_MxtMYy)]
        });
        for (let [utilKey_NwGpPf, cssProp_yMdZtj] of [
        ["p", "padding"],
        ["px", "padding-inline"],
        ["py", "padding-block"],
        ["ps", "padding-inline-start"],
        ["pe", "padding-inline-end"],
        ["pt", "padding-top"],
        ["pr", "padding-right"],
        ["pb", "padding-bottom"],
        ["pl", "padding-left"]])

        registerSpacingUtility_YCMYBk(utilKey_NwGpPf, ["--padding", "--spacing"], (v_JBgFPK) => [makeDeclarationNode_xYlaTt(cssProp_yMdZtj, v_JBgFPK)]);
        registerStaticUtility_zeqrZG("text-left", [["text-align", "left"]]),
        registerStaticUtility_zeqrZG("text-center", [["text-align", "center"]]),
        registerStaticUtility_zeqrZG("text-right", [["text-align", "right"]]),
        registerStaticUtility_zeqrZG("text-justify", [["text-align", "justify"]]),
        registerStaticUtility_zeqrZG("text-start", [["text-align", "start"]]),
        registerStaticUtility_zeqrZG("text-end", [["text-align", "end"]]),
        registerSpacingUtility_YCMYBk(
          "indent",
          ["--text-indent", "--spacing"],
          (v_FyQheC) => [makeDeclarationNode_xYlaTt("text-indent", v_FyQheC)],
          { supportsNegative: !0 }
        ),
        registerStaticUtility_zeqrZG("align-baseline", [["vertical-align", "baseline"]]),
        registerStaticUtility_zeqrZG("align-top", [["vertical-align", "top"]]),
        registerStaticUtility_zeqrZG("align-middle", [["vertical-align", "middle"]]),
        registerStaticUtility_zeqrZG("align-bottom", [["vertical-align", "bottom"]]),
        registerStaticUtility_zeqrZG("align-text-top", [["vertical-align", "text-top"]]),
        registerStaticUtility_zeqrZG("align-text-bottom", [["vertical-align", "text-bottom"]]),
        registerStaticUtility_zeqrZG("align-sub", [["vertical-align", "sub"]]),
        registerStaticUtility_zeqrZG("align-super", [["vertical-align", "super"]]),
        registerFunctionalHandler_VuzNfs("align", {
          themeKeys: [],
          handle: (v_kehYwV) => [makeDeclarationNode_xYlaTt("vertical-align", v_kehYwV)]
        }),
        utilityRegistry_fatAmE.functional("font", (arg_wZcTYj) => {
          if (arg_wZcTYj.value && !arg_wZcTYj.modifier) {
            if ("arbitrary" === arg_wZcTYj.value.kind) {
              let val_ciUTGj = arg_wZcTYj.value.value;
              switch (
              arg_wZcTYj.value.dataType ??
              resolveCssType_DhcVtf(val_ciUTGj, ["number", "generic-name", "family-name"])) {

                case "generic-name":
                case "family-name":
                  return [makeDeclarationNode_xYlaTt("font-family", val_ciUTGj)];
                default:
                  return [
                  makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-font-weight")]),
                  makeDeclarationNode_xYlaTt("--tw-font-weight", val_ciUTGj),
                  makeDeclarationNode_xYlaTt("font-weight", val_ciUTGj)];

              }
            }
            {
              let fontResult_iGYHhK = themeVarMap_nHCGUd.resolveWith(
                arg_wZcTYj.value.value,
                ["--font"],
                ["--font-feature-settings", "--font-variation-settings"]
              );
              if (fontResult_iGYHhK) {
                let [family_zhjWYp, featureObj_YvFhrY = {}] = fontResult_iGYHhK;
                return [
                makeDeclarationNode_xYlaTt("font-family", family_zhjWYp),
                makeDeclarationNode_xYlaTt("font-feature-settings", featureObj_YvFhrY["--font-feature-settings"]),
                makeDeclarationNode_xYlaTt(
                  "font-variation-settings",
                  featureObj_YvFhrY["--font-variation-settings"]
                )];

              }
            }
            {
              let weight_MjcWhu = themeVarMap_nHCGUd.resolve(arg_wZcTYj.value.value, ["--font-weight"]);
              if (weight_MjcWhu)
              return [
              makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-font-weight")]),
              makeDeclarationNode_xYlaTt("--tw-font-weight", weight_MjcWhu),
              makeDeclarationNode_xYlaTt("font-weight", weight_MjcWhu)];

            }
          }
        }),
        registerCompletions_VddGyH("font", () => [
        { values: [], valueThemeKeys: ["--font"] },
        { values: [], valueThemeKeys: ["--font-weight"] }]
        ),
        registerStaticUtility_zeqrZG("uppercase", [["text-transform", "uppercase"]]),
        registerStaticUtility_zeqrZG("lowercase", [["text-transform", "lowercase"]]),
        registerStaticUtility_zeqrZG("capitalize", [["text-transform", "capitalize"]]),
        registerStaticUtility_zeqrZG("normal-case", [["text-transform", "none"]]),
        registerStaticUtility_zeqrZG("italic", [["font-style", "italic"]]),
        registerStaticUtility_zeqrZG("not-italic", [["font-style", "normal"]]),
        registerStaticUtility_zeqrZG("underline", [["text-decoration-line", "underline"]]),
        registerStaticUtility_zeqrZG("overline", [["text-decoration-line", "overline"]]),
        registerStaticUtility_zeqrZG("line-through", [["text-decoration-line", "line-through"]]),
        registerStaticUtility_zeqrZG("no-underline", [["text-decoration-line", "none"]]),
        registerStaticUtility_zeqrZG("font-stretch-normal", [["font-stretch", "normal"]]),
        registerStaticUtility_zeqrZG("font-stretch-ultra-condensed", [
        ["font-stretch", "ultra-condensed"]]
        ),
        registerStaticUtility_zeqrZG("font-stretch-extra-condensed", [
        ["font-stretch", "extra-condensed"]]
        ),
        registerStaticUtility_zeqrZG("font-stretch-condensed", [["font-stretch", "condensed"]]),
        registerStaticUtility_zeqrZG("font-stretch-semi-condensed", [
        ["font-stretch", "semi-condensed"]]
        ),
        registerStaticUtility_zeqrZG("font-stretch-semi-expanded", [["font-stretch", "semi-expanded"]]),
        registerStaticUtility_zeqrZG("font-stretch-expanded", [["font-stretch", "expanded"]]),
        registerStaticUtility_zeqrZG("font-stretch-extra-expanded", [
        ["font-stretch", "extra-expanded"]]
        ),
        registerStaticUtility_zeqrZG("font-stretch-ultra-expanded", [
        ["font-stretch", "ultra-expanded"]]
        ),
        registerFunctionalHandler_VuzNfs("font-stretch", {
          handleBareValue: ({ value: val_nlaFXd }) => {
            if (!val_nlaFXd.endsWith("%")) return null;
            let percentNum_ZTzYPr = Number(val_nlaFXd.slice(0, -1));
            return !isNonNegativeInteger_QISFSJ(percentNum_ZTzYPr) || Number.isNaN(percentNum_ZTzYPr) || percentNum_ZTzYPr < 50 || percentNum_ZTzYPr > 200 ? null : val_nlaFXd;
          },
          handle: (v_nIwtxF) => [makeDeclarationNode_xYlaTt("font-stretch", v_nIwtxF)]
        }),
        registerCompletions_VddGyH("font-stretch", () => [
        {
          values: [
          "50%",
          "75%",
          "90%",
          "95%",
          "100%",
          "105%",
          "110%",
          "125%",
          "150%",
          "200%"]

        }]
        ),
        registerColorUtility_uMaiuB("placeholder", {
          themeKeys: ["--background-color", "--color"],
          handle: (colorVal_IApPcl) => [
          makeRuleNode_PDClCj("&::placeholder", [
          makeDeclarationNode_xYlaTt("--tw-sort", "placeholder-color"),
          makeDeclarationNode_xYlaTt("color", colorVal_IApPcl)]
          )]

        }),
        registerStaticUtility_zeqrZG("decoration-solid", [["text-decoration-style", "solid"]]),
        registerStaticUtility_zeqrZG("decoration-double", [["text-decoration-style", "double"]]),
        registerStaticUtility_zeqrZG("decoration-dotted", [["text-decoration-style", "dotted"]]),
        registerStaticUtility_zeqrZG("decoration-dashed", [["text-decoration-style", "dashed"]]),
        registerStaticUtility_zeqrZG("decoration-wavy", [["text-decoration-style", "wavy"]]),
        registerStaticUtility_zeqrZG("decoration-auto", [["text-decoration-thickness", "auto"]]),
        registerStaticUtility_zeqrZG("decoration-from-font", [
        ["text-decoration-thickness", "from-font"]]
        ),
        utilityRegistry_fatAmE.functional("decoration", (arg_povsfz) => {
          if (arg_povsfz.value) {
            if ("arbitrary" === arg_povsfz.value.kind) {
              let val_XrfQAX = arg_povsfz.value.value;
              switch (
              arg_povsfz.value.dataType ??
              resolveCssType_DhcVtf(val_XrfQAX, ["color", "length", "percentage"])) {

                case "length":
                case "percentage":
                  return arg_povsfz.modifier ?
                  void 0 :
                  [makeDeclarationNode_xYlaTt("text-decoration-thickness", val_XrfQAX)];
                default:
                  return (
                    val_XrfQAX = applyOpacityToColor_qFFjzR(val_XrfQAX, arg_povsfz.modifier, themeVarMap_nHCGUd),
                    null === val_XrfQAX ? void 0 : [makeDeclarationNode_xYlaTt("text-decoration-color", val_XrfQAX)]);

              }
            }
            {
              let resolvedThickness_GAscMk = themeVarMap_nHCGUd.resolve(arg_povsfz.value.value, [
              "--text-decoration-thickness"]
              );
              if (resolvedThickness_GAscMk)
              return arg_povsfz.modifier ?
              void 0 :
              [makeDeclarationNode_xYlaTt("text-decoration-thickness", resolvedThickness_GAscMk)];
              if (isNonNegativeInteger_QISFSJ(arg_povsfz.value.value))
              return arg_povsfz.modifier ?
              void 0 :
              [makeDeclarationNode_xYlaTt("text-decoration-thickness", `${arg_povsfz.value.value}px`)];
            }
            {
              let colorVal_WyFlFv = mapStaticThemeColor_GNTWCf(arg_povsfz, themeVarMap_nHCGUd, ["--text-decoration-color", "--color"]);
              if (colorVal_WyFlFv) return [makeDeclarationNode_xYlaTt("text-decoration-color", colorVal_WyFlFv)];
            }
          }
        }),
        registerCompletions_VddGyH("decoration", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--text-decoration-color", "--color"],
          modifiers: Array.from({ length: 21 }, (unusedVal_npLYrP, idx_BhZBer) => "" + 5 * idx_BhZBer)
        },
        {
          values: ["0", "1", "2"],
          valueThemeKeys: ["--text-decoration-thickness"]
        }]
        ),
        registerStaticUtility_zeqrZG("animate-none", [["animation", "none"]]),
        registerFunctionalHandler_VuzNfs("animate", {
          themeKeys: ["--animate"],
          handle: (v_CkcHHP) => [makeDeclarationNode_xYlaTt("animation", v_CkcHHP)]
        });
        {
          let baseFilterVarsString_AxbzSN = [
            "var(--tw-blur,)",
            "var(--tw-brightness,)",
            "var(--tw-contrast,)",
            "var(--tw-grayscale,)",
            "var(--tw-hue-rotate,)",
            "var(--tw-invert,)",
            "var(--tw-saturate,)",
            "var(--tw-sepia,)",
            "var(--tw-drop-shadow,)"].
            join(" "),
            baseBackdropVarsString_uFmXBw = [
            "var(--tw-backdrop-blur,)",
            "var(--tw-backdrop-brightness,)",
            "var(--tw-backdrop-contrast,)",
            "var(--tw-backdrop-grayscale,)",
            "var(--tw-backdrop-hue-rotate,)",
            "var(--tw-backdrop-invert,)",
            "var(--tw-backdrop-opacity,)",
            "var(--tw-backdrop-saturate,)",
            "var(--tw-backdrop-sepia,)"].
            join(" "),
            makeFilterVarInit_zWnqAr = () =>
            makeAtRootNode_uVreCe([
            makeAtPropertyNode_DIaSSt("--tw-blur"),
            makeAtPropertyNode_DIaSSt("--tw-brightness"),
            makeAtPropertyNode_DIaSSt("--tw-contrast"),
            makeAtPropertyNode_DIaSSt("--tw-grayscale"),
            makeAtPropertyNode_DIaSSt("--tw-hue-rotate"),
            makeAtPropertyNode_DIaSSt("--tw-invert"),
            makeAtPropertyNode_DIaSSt("--tw-opacity"),
            makeAtPropertyNode_DIaSSt("--tw-saturate"),
            makeAtPropertyNode_DIaSSt("--tw-sepia"),
            makeAtPropertyNode_DIaSSt("--tw-drop-shadow"),
            makeAtPropertyNode_DIaSSt("--tw-drop-shadow-color"),
            makeAtPropertyNode_DIaSSt("--tw-drop-shadow-alpha", "100%", "<percentage>"),
            makeAtPropertyNode_DIaSSt("--tw-drop-shadow-size")]
            ),
            makeBackdropVarInit_Wwebef = () =>
            makeAtRootNode_uVreCe([
            makeAtPropertyNode_DIaSSt("--tw-backdrop-blur"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-brightness"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-contrast"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-grayscale"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-hue-rotate"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-invert"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-opacity"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-saturate"),
            makeAtPropertyNode_DIaSSt("--tw-backdrop-sepia")]
            );
          utilityRegistry_fatAmE.functional("filter", (arg_jABRuE) => {
            if (!arg_jABRuE.modifier) {
              if (null === arg_jABRuE.value) return [makeFilterVarInit_zWnqAr(), makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)];
              if ("arbitrary" === arg_jABRuE.value.kind)
              return [makeDeclarationNode_xYlaTt("filter", arg_jABRuE.value.value)];
              if ("none" === arg_jABRuE.value.value) return [makeDeclarationNode_xYlaTt("filter", "none")];
            }
          }),
          utilityRegistry_fatAmE.functional("backdrop-filter", (arg_FvwlWJ) => {
            if (!arg_FvwlWJ.modifier) {
              if (null === arg_FvwlWJ.value)
              return [
              makeBackdropVarInit_Wwebef(),
              makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
              makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)];

              if ("arbitrary" === arg_FvwlWJ.value.kind)
              return [
              makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", arg_FvwlWJ.value.value),
              makeDeclarationNode_xYlaTt("backdrop-filter", arg_FvwlWJ.value.value)];

              if ("none" === arg_FvwlWJ.value.value)
              return [
              makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", "none"),
              makeDeclarationNode_xYlaTt("backdrop-filter", "none")];

            }
          }),
          registerFunctionalHandler_VuzNfs("blur", {
            themeKeys: ["--blur"],
            handle: (v_heIrut) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-blur", `blur(${v_heIrut})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerStaticUtility_zeqrZG("blur-none", [makeFilterVarInit_zWnqAr, ["--tw-blur", " "], ["filter", baseFilterVarsString_AxbzSN]]),
          registerFunctionalHandler_VuzNfs("backdrop-blur", {
            themeKeys: ["--backdrop-blur", "--blur"],
            handle: (v_KeVNxo) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-blur", `blur(${v_KeVNxo})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerStaticUtility_zeqrZG("backdrop-blur-none", [
          makeBackdropVarInit_Wwebef,
          ["--tw-backdrop-blur", " "],
          ["-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw],
          ["backdrop-filter", baseBackdropVarsString_uFmXBw]]
          ),
          registerFunctionalHandler_VuzNfs("brightness", {
            themeKeys: ["--brightness"],
            handleBareValue: ({ value: val_OcSGNu }) => isNonNegativeInteger_QISFSJ(val_OcSGNu) ? `${val_OcSGNu}%` : null,
            handle: (v_PiCzAP) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-brightness", `brightness(${v_PiCzAP})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-brightness", {
            themeKeys: ["--backdrop-brightness", "--brightness"],
            handleBareValue: ({ value: val_zXxUVA }) => isNonNegativeInteger_QISFSJ(val_zXxUVA) ? `${val_zXxUVA}%` : null,
            handle: (v_KmPRUf) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-brightness", `brightness(${v_KmPRUf})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("brightness", () => [
          {
            values: [
            "0",
            "50",
            "75",
            "90",
            "95",
            "100",
            "105",
            "110",
            "125",
            "150",
            "200"],

            valueThemeKeys: ["--brightness"]
          }]
          ),
          registerCompletions_VddGyH("backdrop-brightness", () => [
          {
            values: [
            "0",
            "50",
            "75",
            "90",
            "95",
            "100",
            "105",
            "110",
            "125",
            "150",
            "200"],

            valueThemeKeys: ["--backdrop-brightness", "--brightness"]
          }]
          ),
          registerFunctionalHandler_VuzNfs("contrast", {
            themeKeys: ["--contrast"],
            handleBareValue: ({ value: val_axAbLF }) => isNonNegativeInteger_QISFSJ(val_axAbLF) ? `${val_axAbLF}%` : null,
            handle: (v_bjvyVm) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-contrast", `contrast(${v_bjvyVm})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-contrast", {
            themeKeys: ["--backdrop-contrast", "--contrast"],
            handleBareValue: ({ value: val_pNJrZt }) => isNonNegativeInteger_QISFSJ(val_pNJrZt) ? `${val_pNJrZt}%` : null,
            handle: (v_YujRbW) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-contrast", `contrast(${v_YujRbW})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("contrast", () => [
          {
            values: ["0", "50", "75", "100", "125", "150", "200"],
            valueThemeKeys: ["--contrast"]
          }]
          ),
          registerCompletions_VddGyH("backdrop-contrast", () => [
          {
            values: ["0", "50", "75", "100", "125", "150", "200"],
            valueThemeKeys: ["--backdrop-contrast", "--contrast"]
          }]
          ),
          registerFunctionalHandler_VuzNfs("grayscale", {
            themeKeys: ["--grayscale"],
            handleBareValue: ({ value: val_gmpkrf }) => isNonNegativeInteger_QISFSJ(val_gmpkrf) ? `${val_gmpkrf}%` : null,
            defaultValue: "100%",
            handle: (v_GRNstk) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-grayscale", `grayscale(${v_GRNstk})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-grayscale", {
            themeKeys: ["--backdrop-grayscale", "--grayscale"],
            handleBareValue: ({ value: val_jJwFYt }) => isNonNegativeInteger_QISFSJ(val_jJwFYt) ? `${val_jJwFYt}%` : null,
            defaultValue: "100%",
            handle: (v_Untwha) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-grayscale", `grayscale(${v_Untwha})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("grayscale", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--grayscale"],
            hasDefaultValue: !0
          }]
          ),
          registerCompletions_VddGyH("backdrop-grayscale", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--backdrop-grayscale", "--grayscale"],
            hasDefaultValue: !0
          }]
          ),
          registerFunctionalHandler_VuzNfs("hue-rotate", {
            supportsNegative: !0,
            themeKeys: ["--hue-rotate"],
            handleBareValue: ({ value: val_czMvmB }) => isNonNegativeInteger_QISFSJ(val_czMvmB) ? `${val_czMvmB}deg` : null,
            handle: (v_GcIJOX) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-hue-rotate", `hue-rotate(${v_GcIJOX})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-hue-rotate", {
            supportsNegative: !0,
            themeKeys: ["--backdrop-hue-rotate", "--hue-rotate"],
            handleBareValue: ({ value: val_CPYHQQ }) => isNonNegativeInteger_QISFSJ(val_CPYHQQ) ? `${val_CPYHQQ}deg` : null,
            handle: (v_naxvmG) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-hue-rotate", `hue-rotate(${v_naxvmG})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("hue-rotate", () => [
          {
            values: ["0", "15", "30", "60", "90", "180"],
            valueThemeKeys: ["--hue-rotate"]
          }]
          ),
          registerCompletions_VddGyH("backdrop-hue-rotate", () => [
          {
            values: ["0", "15", "30", "60", "90", "180"],
            valueThemeKeys: ["--backdrop-hue-rotate", "--hue-rotate"]
          }]
          ),
          registerFunctionalHandler_VuzNfs("invert", {
            themeKeys: ["--invert"],
            handleBareValue: ({ value: val_OfIenW }) => isNonNegativeInteger_QISFSJ(val_OfIenW) ? `${val_OfIenW}%` : null,
            defaultValue: "100%",
            handle: (v_YEwagh) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-invert", `invert(${v_YEwagh})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-invert", {
            themeKeys: ["--backdrop-invert", "--invert"],
            handleBareValue: ({ value: val_fsYnVr }) => isNonNegativeInteger_QISFSJ(val_fsYnVr) ? `${val_fsYnVr}%` : null,
            defaultValue: "100%",
            handle: (v_bXOHeu) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-invert", `invert(${v_bXOHeu})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("invert", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--invert"],
            hasDefaultValue: !0
          }]
          ),
          registerCompletions_VddGyH("backdrop-invert", () => [
          {
            values: ["0", "25", "50", "75", "100"],
            valueThemeKeys: ["--backdrop-invert", "--invert"],
            hasDefaultValue: !0
          }]
          ),
          registerFunctionalHandler_VuzNfs("saturate", {
            themeKeys: ["--saturate"],
            handleBareValue: ({ value: val_HvoYdR }) => isNonNegativeInteger_QISFSJ(val_HvoYdR) ? `${val_HvoYdR}%` : null,
            handle: (v_JVZHtq) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-saturate", `saturate(${v_JVZHtq})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-saturate", {
            themeKeys: ["--backdrop-saturate", "--saturate"],
            handleBareValue: ({ value: val_LrCiWL }) => isNonNegativeInteger_QISFSJ(val_LrCiWL) ? `${val_LrCiWL}%` : null,
            handle: (v_JEeKYP) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-saturate", `saturate(${v_JEeKYP})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("saturate", () => [
          {
            values: ["0", "50", "100", "150", "200"],
            valueThemeKeys: ["--saturate"]
          }]
          ),
          registerCompletions_VddGyH("backdrop-saturate", () => [
          {
            values: ["0", "50", "100", "150", "200"],
            valueThemeKeys: ["--backdrop-saturate", "--saturate"]
          }]
          ),
          registerFunctionalHandler_VuzNfs("sepia", {
            themeKeys: ["--sepia"],
            handleBareValue: ({ value: val_joAfoh }) => isNonNegativeInteger_QISFSJ(val_joAfoh) ? `${val_joAfoh}%` : null,
            defaultValue: "100%",
            handle: (v_SvOFdR) => [
            makeFilterVarInit_zWnqAr(),
            makeDeclarationNode_xYlaTt("--tw-sepia", `sepia(${v_SvOFdR})`),
            makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)]

          }),
          registerFunctionalHandler_VuzNfs("backdrop-sepia", {
            themeKeys: ["--backdrop-sepia", "--sepia"],
            handleBareValue: ({ value: val_uTlPne }) => isNonNegativeInteger_QISFSJ(val_uTlPne) ? `${val_uTlPne}%` : null,
            defaultValue: "100%",
            handle: (v_KPCdZB) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-sepia", `sepia(${v_KPCdZB})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("sepia", () => [
          {
            values: ["0", "50", "100"],
            valueThemeKeys: ["--sepia"],
            hasDefaultValue: !0
          }]
          ),
          registerCompletions_VddGyH("backdrop-sepia", () => [
          {
            values: ["0", "50", "100"],
            valueThemeKeys: ["--backdrop-sepia", "--sepia"],
            hasDefaultValue: !0
          }]
          ),
          registerStaticUtility_zeqrZG("drop-shadow-none", [
          makeFilterVarInit_zWnqAr,
          ["--tw-drop-shadow", " "],
          ["filter", baseFilterVarsString_AxbzSN]]
          ),
          utilityRegistry_fatAmE.functional("drop-shadow", (arg_wiPpGb) => {
            let alpha_bFvNWm;
            if (
            arg_wiPpGb.modifier && (
            "arbitrary" === arg_wiPpGb.modifier.kind ?
            alpha_bFvNWm = arg_wiPpGb.modifier.value :
            isNonNegativeInteger_QISFSJ(arg_wiPpGb.modifier.value) && (alpha_bFvNWm = `${arg_wiPpGb.modifier.value}%`)),
            !arg_wiPpGb.value)
            {
              let dropShadowVar_iDXYIJ = themeVarMap_nHCGUd.get(["--drop-shadow"]),
                resolvedDropShadow_hNaIdK = themeVarMap_nHCGUd.resolve(null, ["--drop-shadow"]);
              return null === dropShadowVar_iDXYIJ || null === resolvedDropShadow_hNaIdK ?
              void 0 :
              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow-alpha", alpha_bFvNWm),
              ...dropShadowWithOpacity_aQNJTQ(
                "--tw-drop-shadow-size",
                dropShadowVar_iDXYIJ,
                alpha_bFvNWm,
                (shadowColor_DeQfsW) => `var(--tw-drop-shadow-color, ${shadowColor_DeQfsW})`
              ),
              makeDeclarationNode_xYlaTt(
                "--tw-drop-shadow",
                splitOnTopLevel_EfBwUv(resolvedDropShadow_hNaIdK, ",").
                map((dropShadowSegment_uenQou) => `drop-shadow(${dropShadowSegment_uenQou})`).
                join(" ")
              ),
              makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)];

            }
            if ("arbitrary" === arg_wiPpGb.value.kind) {
              let val_Vfgkhl = arg_wiPpGb.value.value;
              return "color" === (arg_wiPpGb.value.dataType ?? resolveCssType_DhcVtf(val_Vfgkhl, ["color"])) ? (
              val_Vfgkhl = applyOpacityToColor_qFFjzR(val_Vfgkhl, arg_wiPpGb.modifier, themeVarMap_nHCGUd),
              null === val_Vfgkhl ?
              void 0 :
              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt(
                "--tw-drop-shadow-color",
                colorWithOpacityValue_xdDGmk(val_Vfgkhl, "var(--tw-drop-shadow-alpha)")
              ),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow", "var(--tw-drop-shadow-size)")]) :

              arg_wiPpGb.modifier && !alpha_bFvNWm ?
              void 0 :
              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow-alpha", alpha_bFvNWm),
              ...dropShadowWithOpacity_aQNJTQ(
                "--tw-drop-shadow-size",
                val_Vfgkhl,
                alpha_bFvNWm,
                (shadowColor_KLizLr) => `var(--tw-drop-shadow-color, ${shadowColor_KLizLr})`
              ),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
              makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)];

            }
            {
              let dropShadowSize_Btlkkh = themeVarMap_nHCGUd.get([`--drop-shadow-${arg_wiPpGb.value.value}`]),
                resolved_xFkzKi = themeVarMap_nHCGUd.resolve(arg_wiPpGb.value.value, ["--drop-shadow"]);
              if (dropShadowSize_Btlkkh && resolved_xFkzKi)
              return arg_wiPpGb.modifier && !alpha_bFvNWm ?
              void 0 :
              alpha_bFvNWm ?
              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow-alpha", alpha_bFvNWm),
              ...dropShadowWithOpacity_aQNJTQ(
                "--tw-drop-shadow-size",
                dropShadowSize_Btlkkh,
                alpha_bFvNWm,
                (shadowColor_gNahPi) => `var(--tw-drop-shadow-color, ${shadowColor_gNahPi})`
              ),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow", "var(--tw-drop-shadow-size)"),
              makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)] :

              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow-alpha", alpha_bFvNWm),
              ...dropShadowWithOpacity_aQNJTQ(
                "--tw-drop-shadow-size",
                dropShadowSize_Btlkkh,
                alpha_bFvNWm,
                (shadowColor_QnsMbR) => `var(--tw-drop-shadow-color, ${shadowColor_QnsMbR})`
              ),
              makeDeclarationNode_xYlaTt(
                "--tw-drop-shadow",
                splitOnTopLevel_EfBwUv(resolved_xFkzKi, ",").
                map((segment_YcvhFv) => `drop-shadow(${segment_YcvhFv})`).
                join(" ")
              ),
              makeDeclarationNode_xYlaTt("filter", baseFilterVarsString_AxbzSN)];

            }
            {
              let colorValue_IcgBNY = mapStaticThemeColor_GNTWCf(arg_wiPpGb, themeVarMap_nHCGUd, ["--drop-shadow-color", "--color"]);
              if (colorValue_IcgBNY)
              return "inherit" === colorValue_IcgBNY ?
              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow-color", "inherit"),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow", "var(--tw-drop-shadow-size)")] :

              [
              makeFilterVarInit_zWnqAr(),
              makeDeclarationNode_xYlaTt(
                "--tw-drop-shadow-color",
                colorWithOpacityValue_xdDGmk(colorValue_IcgBNY, "var(--tw-drop-shadow-alpha)")
              ),
              makeDeclarationNode_xYlaTt("--tw-drop-shadow", "var(--tw-drop-shadow-size)")];

            }
          }),
          registerCompletions_VddGyH("drop-shadow", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--drop-shadow-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedValue_iVQVrw, idx_dGtdHD) => "" + 5 * idx_dGtdHD)
          },
          { valueThemeKeys: ["--drop-shadow"] }]
          ),
          registerFunctionalHandler_VuzNfs("backdrop-opacity", {
            themeKeys: ["--backdrop-opacity", "--opacity"],
            handleBareValue: ({ value: backdropOpacityValue_AdevWk }) => isQuarterStepAlt_ypENnF(backdropOpacityValue_AdevWk) ? `${backdropOpacityValue_AdevWk}%` : null,
            handle: (backdropOpacityResolved_QpQBmg) => [
            makeBackdropVarInit_Wwebef(),
            makeDeclarationNode_xYlaTt("--tw-backdrop-opacity", `opacity(${backdropOpacityResolved_QpQBmg})`),
            makeDeclarationNode_xYlaTt("-webkit-backdrop-filter", baseBackdropVarsString_uFmXBw),
            makeDeclarationNode_xYlaTt("backdrop-filter", baseBackdropVarsString_uFmXBw)]

          }),
          registerCompletions_VddGyH("backdrop-opacity", () => [
          {
            values: Array.from({ length: 21 }, (unusedBackdropModifierValue_IDMzpP, backdropModifierIndex_OEORrg) => "" + 5 * backdropModifierIndex_OEORrg),
            valueThemeKeys: ["--backdrop-opacity", "--opacity"]
          }]
          );
        }
        {
          let transitionEaseDefault_Adtvss = `var(--tw-ease, ${themeVarMap_nHCGUd.resolve(null, ["--default-transition-timing-function"]) ?? "ease"})`,
            transitionDurationDefault_qvzKsy = `var(--tw-duration, ${themeVarMap_nHCGUd.resolve(null, ["--default-transition-duration"]) ?? "0s"})`;
          registerStaticUtility_zeqrZG("transition-none", [["transition-property", "none"]]),
          registerStaticUtility_zeqrZG("transition-all", [
          ["transition-property", "all"],
          ["transition-timing-function", transitionEaseDefault_Adtvss],
          ["transition-duration", transitionDurationDefault_qvzKsy]]
          ),
          registerStaticUtility_zeqrZG("transition-colors", [
          [
          "transition-property",
          "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to"],

          ["transition-timing-function", transitionEaseDefault_Adtvss],
          ["transition-duration", transitionDurationDefault_qvzKsy]]
          ),
          registerStaticUtility_zeqrZG("transition-opacity", [
          ["transition-property", "opacity"],
          ["transition-timing-function", transitionEaseDefault_Adtvss],
          ["transition-duration", transitionDurationDefault_qvzKsy]]
          ),
          registerStaticUtility_zeqrZG("transition-shadow", [
          ["transition-property", "box-shadow"],
          ["transition-timing-function", transitionEaseDefault_Adtvss],
          ["transition-duration", transitionDurationDefault_qvzKsy]]
          ),
          registerStaticUtility_zeqrZG("transition-transform", [
          ["transition-property", "transform, translate, scale, rotate"],
          ["transition-timing-function", transitionEaseDefault_Adtvss],
          ["transition-duration", transitionDurationDefault_qvzKsy]]
          ),
          registerFunctionalHandler_VuzNfs("transition", {
            defaultValue:
            "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, visibility, content-visibility, overlay, pointer-events",
            themeKeys: ["--transition-property"],
            handle: (transitionPropertyValue_KHvLxT) => [
            makeDeclarationNode_xYlaTt("transition-property", transitionPropertyValue_KHvLxT),
            makeDeclarationNode_xYlaTt("transition-timing-function", transitionEaseDefault_Adtvss),
            makeDeclarationNode_xYlaTt("transition-duration", transitionDurationDefault_qvzKsy)]

          }),
          registerStaticUtility_zeqrZG("transition-discrete", [
          ["transition-behavior", "allow-discrete"]]
          ),
          registerStaticUtility_zeqrZG("transition-normal", [["transition-behavior", "normal"]]),
          registerFunctionalHandler_VuzNfs("delay", {
            handleBareValue: ({ value: val_zakBYD }) => isNonNegativeInteger_QISFSJ(val_zakBYD) ? `${val_zakBYD}ms` : null,
            themeKeys: ["--transition-delay"],
            handle: (v_LuTEAu) => [makeDeclarationNode_xYlaTt("transition-delay", v_LuTEAu)]
          });
          {
            let makeDurationVarInit_MrDjiC = () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-duration")]);
            registerStaticUtility_zeqrZG("duration-initial", [makeDurationVarInit_MrDjiC, ["--tw-duration", "initial"]]),
            utilityRegistry_fatAmE.functional("duration", (arg_PYBvBY) => {
              if (arg_PYBvBY.modifier || !arg_PYBvBY.value) return;
              let resolvedVal_QonRgq = null;
              return (
                "arbitrary" === arg_PYBvBY.value.kind ?
                resolvedVal_QonRgq = arg_PYBvBY.value.value : (
                resolvedVal_QonRgq = themeVarMap_nHCGUd.resolve(arg_PYBvBY.value.fraction ?? arg_PYBvBY.value.value, [
                "--transition-duration"]
                ),
                null === resolvedVal_QonRgq &&
                isNonNegativeInteger_QISFSJ(arg_PYBvBY.value.value) && (
                resolvedVal_QonRgq = `${arg_PYBvBY.value.value}ms`)),
                null !== resolvedVal_QonRgq ?
                [makeDurationVarInit_MrDjiC(), makeDeclarationNode_xYlaTt("--tw-duration", resolvedVal_QonRgq), makeDeclarationNode_xYlaTt("transition-duration", resolvedVal_QonRgq)] :
                void 0);

            });
          }
          registerCompletions_VddGyH("delay", () => [
          {
            values: ["75", "100", "150", "200", "300", "500", "700", "1000"],
            valueThemeKeys: ["--transition-delay"]
          }]
          ),
          registerCompletions_VddGyH("duration", () => [
          {
            values: [
            "75",
            "100",
            "150",
            "200",
            "300",
            "500",
            "700",
            "1000"],

            valueThemeKeys: ["--transition-duration"]
          }]
          );
        }
        {
          let makeEaseVarInit_yXPvlw = () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-ease")]);
          registerStaticUtility_zeqrZG("ease-initial", [makeEaseVarInit_yXPvlw, ["--tw-ease", "initial"]]),
          registerStaticUtility_zeqrZG("ease-linear", [
          makeEaseVarInit_yXPvlw,
          ["--tw-ease", "linear"],
          ["transition-timing-function", "linear"]]
          ),
          registerFunctionalHandler_VuzNfs("ease", {
            themeKeys: ["--ease"],
            handle: (v_HRjCWX) => [
            makeEaseVarInit_yXPvlw(),
            makeDeclarationNode_xYlaTt("--tw-ease", v_HRjCWX),
            makeDeclarationNode_xYlaTt("transition-timing-function", v_HRjCWX)]

          });
        }
        registerStaticUtility_zeqrZG("will-change-auto", [["will-change", "auto"]]),
        registerStaticUtility_zeqrZG("will-change-scroll", [["will-change", "scroll-position"]]),
        registerStaticUtility_zeqrZG("will-change-contents", [["will-change", "contents"]]),
        registerStaticUtility_zeqrZG("will-change-transform", [["will-change", "transform"]]),
        registerFunctionalHandler_VuzNfs("will-change", {
          themeKeys: [],
          handle: (v_SIUVRv) => [makeDeclarationNode_xYlaTt("will-change", v_SIUVRv)]
        }),
        registerStaticUtility_zeqrZG("content-none", [
        ["--tw-content", "none"],
        ["content", "none"]]
        ),
        registerFunctionalHandler_VuzNfs("content", {
          themeKeys: [],
          handle: (v_BxVStE) => [
          makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-content", '""')]),
          makeDeclarationNode_xYlaTt("--tw-content", v_BxVStE),
          makeDeclarationNode_xYlaTt("content", "var(--tw-content)")]

        });
        {
          let containVarsString_bFmEmh =
            "var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,)",
            makeContainVarInit_ZydGwo = () =>
            makeAtRootNode_uVreCe([
            makeAtPropertyNode_DIaSSt("--tw-contain-size"),
            makeAtPropertyNode_DIaSSt("--tw-contain-layout"),
            makeAtPropertyNode_DIaSSt("--tw-contain-paint"),
            makeAtPropertyNode_DIaSSt("--tw-contain-style")]
            );
          registerStaticUtility_zeqrZG("contain-none", [["contain", "none"]]),
          registerStaticUtility_zeqrZG("contain-content", [["contain", "content"]]),
          registerStaticUtility_zeqrZG("contain-strict", [["contain", "strict"]]),
          registerStaticUtility_zeqrZG("contain-size", [
          makeContainVarInit_ZydGwo,
          ["--tw-contain-size", "size"],
          ["contain", containVarsString_bFmEmh]]
          ),
          registerStaticUtility_zeqrZG("contain-inline-size", [
          makeContainVarInit_ZydGwo,
          ["--tw-contain-size", "inline-size"],
          ["contain", containVarsString_bFmEmh]]
          ),
          registerStaticUtility_zeqrZG("contain-layout", [
          makeContainVarInit_ZydGwo,
          ["--tw-contain-layout", "layout"],
          ["contain", containVarsString_bFmEmh]]
          ),
          registerStaticUtility_zeqrZG("contain-paint", [
          makeContainVarInit_ZydGwo,
          ["--tw-contain-paint", "paint"],
          ["contain", containVarsString_bFmEmh]]
          ),
          registerStaticUtility_zeqrZG("contain-style", [
          makeContainVarInit_ZydGwo,
          ["--tw-contain-style", "style"],
          ["contain", containVarsString_bFmEmh]]
          ),
          registerFunctionalHandler_VuzNfs("contain", { themeKeys: [], handle: (v_mSWVCM) => [makeDeclarationNode_xYlaTt("contain", v_mSWVCM)] });
        }
        registerStaticUtility_zeqrZG("forced-color-adjust-none", [["forced-color-adjust", "none"]]),
        registerStaticUtility_zeqrZG("forced-color-adjust-auto", [["forced-color-adjust", "auto"]]),
        registerStaticUtility_zeqrZG("leading-none", [
        () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-leading")]),
        ["--tw-leading", "1"],
        ["line-height", "1"]]
        ),
        registerSpacingUtility_YCMYBk("leading", ["--leading", "--spacing"], (v_vffMuj) => [
        makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-leading")]),
        makeDeclarationNode_xYlaTt("--tw-leading", v_vffMuj),
        makeDeclarationNode_xYlaTt("line-height", v_vffMuj)]
        ),
        registerFunctionalHandler_VuzNfs("tracking", {
          supportsNegative: !0,
          themeKeys: ["--tracking"],
          handle: (v_SvQMii) => [
          makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-tracking")]),
          makeDeclarationNode_xYlaTt("--tw-tracking", v_SvQMii),
          makeDeclarationNode_xYlaTt("letter-spacing", v_SvQMii)]

        }),
        registerStaticUtility_zeqrZG("antialiased", [
        ["-webkit-font-smoothing", "antialiased"],
        ["-moz-osx-font-smoothing", "grayscale"]]
        ),
        registerStaticUtility_zeqrZG("subpixel-antialiased", [
        ["-webkit-font-smoothing", "auto"],
        ["-moz-osx-font-smoothing", "auto"]]
        );
        {
          let fontVariantNumericVarsString_vvZwim =
            "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)",
            makeFontVariantNumericVarsInit_NMYjIz = () =>
            makeAtRootNode_uVreCe([
            makeAtPropertyNode_DIaSSt("--tw-ordinal"),
            makeAtPropertyNode_DIaSSt("--tw-slashed-zero"),
            makeAtPropertyNode_DIaSSt("--tw-numeric-figure"),
            makeAtPropertyNode_DIaSSt("--tw-numeric-spacing"),
            makeAtPropertyNode_DIaSSt("--tw-numeric-fraction")]
            );
          registerStaticUtility_zeqrZG("normal-nums", [["font-variant-numeric", "normal"]]),
          registerStaticUtility_zeqrZG("ordinal", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-ordinal", "ordinal"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("slashed-zero", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-slashed-zero", "slashed-zero"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("lining-nums", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-numeric-figure", "lining-nums"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("oldstyle-nums", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-numeric-figure", "oldstyle-nums"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("proportional-nums", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-numeric-spacing", "proportional-nums"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("tabular-nums", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-numeric-spacing", "tabular-nums"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("diagonal-fractions", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-numeric-fraction", "diagonal-fractions"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          ),
          registerStaticUtility_zeqrZG("stacked-fractions", [
          makeFontVariantNumericVarsInit_NMYjIz,
          ["--tw-numeric-fraction", "stacked-fractions"],
          ["font-variant-numeric", fontVariantNumericVarsString_vvZwim]]
          );
        }
        {
          let makeOutlineSolidVarInit_dcWtNi = () => makeAtRootNode_uVreCe([makeAtPropertyNode_DIaSSt("--tw-outline-style", "solid")]);
          utilityRegistry_fatAmE.static("outline-hidden", () => [
          makeDeclarationNode_xYlaTt("--tw-outline-style", "none"),
          makeDeclarationNode_xYlaTt("outline-style", "none"),
          processAtRule_lWgxgY("@media", "(forced-colors: active)", [
          makeDeclarationNode_xYlaTt("outline", "2px solid transparent"),
          makeDeclarationNode_xYlaTt("outline-offset", "2px")]
          )]
          ),
          registerStaticUtility_zeqrZG("outline-none", [
          ["--tw-outline-style", "none"],
          ["outline-style", "none"]]
          ),
          registerStaticUtility_zeqrZG("outline-solid", [
          ["--tw-outline-style", "solid"],
          ["outline-style", "solid"]]
          ),
          registerStaticUtility_zeqrZG("outline-dashed", [
          ["--tw-outline-style", "dashed"],
          ["outline-style", "dashed"]]
          ),
          registerStaticUtility_zeqrZG("outline-dotted", [
          ["--tw-outline-style", "dotted"],
          ["outline-style", "dotted"]]
          ),
          registerStaticUtility_zeqrZG("outline-double", [
          ["--tw-outline-style", "double"],
          ["outline-style", "double"]]
          ),
          utilityRegistry_fatAmE.functional("outline", (arg_INqLTT) => {
            if (null === arg_INqLTT.value) {
              if (arg_INqLTT.modifier) return;
              let outlineWidth_kgXHEW = themeVarMap_nHCGUd.get(["--default-outline-width"]) ?? "1px";
              return [
              makeOutlineSolidVarInit_dcWtNi(),
              makeDeclarationNode_xYlaTt("outline-style", "var(--tw-outline-style)"),
              makeDeclarationNode_xYlaTt("outline-width", outlineWidth_kgXHEW)];

            }
            if ("arbitrary" === arg_INqLTT.value.kind) {
              let val_HMNyQI = arg_INqLTT.value.value;
              switch (
              arg_INqLTT.value.dataType ??
              resolveCssType_DhcVtf(val_HMNyQI, ["color", "length", "number", "percentage"])) {

                case "length":
                case "number":
                case "percentage":
                  return arg_INqLTT.modifier ?
                  void 0 :
                  [
                  makeOutlineSolidVarInit_dcWtNi(),
                  makeDeclarationNode_xYlaTt("outline-style", "var(--tw-outline-style)"),
                  makeDeclarationNode_xYlaTt("outline-width", val_HMNyQI)];

                default:
                  return (
                    val_HMNyQI = applyOpacityToColor_qFFjzR(val_HMNyQI, arg_INqLTT.modifier, themeVarMap_nHCGUd),
                    null === val_HMNyQI ? void 0 : [makeDeclarationNode_xYlaTt("outline-color", val_HMNyQI)]);

              }
            }
            {
              let colorValue_iFFqYw = mapStaticThemeColor_GNTWCf(arg_INqLTT, themeVarMap_nHCGUd, ["--outline-color", "--color"]);
              if (colorValue_iFFqYw) return [makeDeclarationNode_xYlaTt("outline-color", colorValue_iFFqYw)];
            }
            {
              if (arg_INqLTT.modifier) return;
              let resolvedWidth_NGAklo = themeVarMap_nHCGUd.resolve(arg_INqLTT.value.value, ["--outline-width"]);
              if (resolvedWidth_NGAklo)
              return [
              makeOutlineSolidVarInit_dcWtNi(),
              makeDeclarationNode_xYlaTt("outline-style", "var(--tw-outline-style)"),
              makeDeclarationNode_xYlaTt("outline-width", resolvedWidth_NGAklo)];

              if (isNonNegativeInteger_QISFSJ(arg_INqLTT.value.value))
              return [
              makeOutlineSolidVarInit_dcWtNi(),
              makeDeclarationNode_xYlaTt("outline-style", "var(--tw-outline-style)"),
              makeDeclarationNode_xYlaTt("outline-width", `${arg_INqLTT.value.value}px`)];

            }
          }),
          registerCompletions_VddGyH("outline", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--outline-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedValue_OfPdai, idx_akdUHE) => "" + 5 * idx_akdUHE),
            hasDefaultValue: !0
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--outline-width"]
          }]
          ),
          registerFunctionalHandler_VuzNfs("outline-offset", {
            supportsNegative: !0,
            themeKeys: ["--outline-offset"],
            handleBareValue: ({ value: val_fHsJyV }) => isNonNegativeInteger_QISFSJ(val_fHsJyV) ? `${val_fHsJyV}px` : null,
            handle: (v_lATfgP) => [makeDeclarationNode_xYlaTt("outline-offset", v_lATfgP)]
          }),
          registerCompletions_VddGyH("outline-offset", () => [
          {
            supportsNegative: !0,
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--outline-offset"]
          }]
          );
        }
        registerFunctionalHandler_VuzNfs("opacity", {
          themeKeys: ["--opacity"],
          handleBareValue: ({ value: val_eJdQYF }) => isQuarterStepAlt_ypENnF(val_eJdQYF) ? `${val_eJdQYF}%` : null,
          handle: (v_fhHYxT) => [makeDeclarationNode_xYlaTt("opacity", v_fhHYxT)]
        }),
        registerCompletions_VddGyH("opacity", () => [
        {
          values: Array.from({ length: 21 }, (unusedValue_rhKyph, idx_lfVVBC) => "" + 5 * idx_lfVVBC),
          valueThemeKeys: ["--opacity"]
        }]
        ),
        registerStaticUtility_zeqrZG("underline-offset-auto", [["text-underline-offset", "auto"]]),
        registerFunctionalHandler_VuzNfs("underline-offset", {
          supportsNegative: !0,
          themeKeys: ["--text-underline-offset"],
          handleBareValue: ({ value: val_yqRxjl }) => isNonNegativeInteger_QISFSJ(val_yqRxjl) ? `${val_yqRxjl}px` : null,
          handle: (v_rcPOmE) => [makeDeclarationNode_xYlaTt("text-underline-offset", v_rcPOmE)]
        }),
        registerCompletions_VddGyH("underline-offset", () => [
        {
          supportsNegative: !0,
          values: ["0", "1", "2", "4", "8"],
          valueThemeKeys: ["--text-underline-offset"]
        }]
        ),
        utilityRegistry_fatAmE.functional("text", (arg_VCkcuo) => {
          if (arg_VCkcuo.value) {
            if ("arbitrary" === arg_VCkcuo.value.kind) {
              let val_wXgIqb = arg_VCkcuo.value.value;
              switch (
              arg_VCkcuo.value.dataType ??
              resolveCssType_DhcVtf(val_wXgIqb, [
              "color",
              "length",
              "percentage",
              "absolute-size",
              "relative-size"]
              )) {

                case "size":
                case "length":
                case "percentage":
                case "absolute-size":
                case "relative-size":
                  if (arg_VCkcuo.modifier) {
                    let resolvedLeading_NaNRxz =
                    "arbitrary" === arg_VCkcuo.modifier.kind ?
                    arg_VCkcuo.modifier.value :
                    themeVarMap_nHCGUd.resolve(arg_VCkcuo.modifier.value, ["--leading"]);
                    if (!resolvedLeading_NaNRxz && isQuarterStep_WkCuTa(arg_VCkcuo.modifier.value)) {
                      let spacingVar_bdxLAx = themeVarMap_nHCGUd.resolve(null, ["--spacing"]);
                      if (!spacingVar_bdxLAx) return null;
                      resolvedLeading_NaNRxz = `calc(${spacingVar_bdxLAx} * ${arg_VCkcuo.modifier.value})`;
                    }
                    return (
                      !resolvedLeading_NaNRxz && "none" === arg_VCkcuo.modifier.value && (resolvedLeading_NaNRxz = "1"),
                      resolvedLeading_NaNRxz ? [makeDeclarationNode_xYlaTt("font-size", val_wXgIqb), makeDeclarationNode_xYlaTt("line-height", resolvedLeading_NaNRxz)] : null);

                  }
                  return [makeDeclarationNode_xYlaTt("font-size", val_wXgIqb)];
                default:
                  return (
                    val_wXgIqb = applyOpacityToColor_qFFjzR(val_wXgIqb, arg_VCkcuo.modifier, themeVarMap_nHCGUd),
                    null === val_wXgIqb ? void 0 : [makeDeclarationNode_xYlaTt("color", val_wXgIqb)]);

              }
            }
            {
              let colorValue_VGlXWg = mapStaticThemeColor_GNTWCf(arg_VCkcuo, themeVarMap_nHCGUd, ["--text-color", "--color"]);
              if (colorValue_VGlXWg) return [makeDeclarationNode_xYlaTt("color", colorValue_VGlXWg)];
            }
            {
              let resolvedFontProps_GtkPVg = themeVarMap_nHCGUd.resolveWith(
                arg_VCkcuo.value.value,
                ["--text"],
                ["--line-height", "--letter-spacing", "--font-weight"]
              );
              if (resolvedFontProps_GtkPVg) {
                let [fontSize_YXQLJm, fontProps_jUtpPg = {}] = Array.isArray(resolvedFontProps_GtkPVg) ? resolvedFontProps_GtkPVg : [resolvedFontProps_GtkPVg];
                if (arg_VCkcuo.modifier) {
                  let resolvedLeading_mVmGwx =
                  "arbitrary" === arg_VCkcuo.modifier.kind ?
                  arg_VCkcuo.modifier.value :
                  themeVarMap_nHCGUd.resolve(arg_VCkcuo.modifier.value, ["--leading"]);
                  if (!resolvedLeading_mVmGwx && isQuarterStep_WkCuTa(arg_VCkcuo.modifier.value)) {
                    let spacingVar_rtkqaN = themeVarMap_nHCGUd.resolve(null, ["--spacing"]);
                    if (!spacingVar_rtkqaN) return null;
                    resolvedLeading_mVmGwx = `calc(${spacingVar_rtkqaN} * ${arg_VCkcuo.modifier.value})`;
                  }
                  if (!resolvedLeading_mVmGwx && "none" === arg_VCkcuo.modifier.value && (resolvedLeading_mVmGwx = "1"), !resolvedLeading_mVmGwx)
                  return null;
                  let resultArr_OsjihI = [makeDeclarationNode_xYlaTt("font-size", fontSize_YXQLJm)];
                  return resolvedLeading_mVmGwx && resultArr_OsjihI.push(makeDeclarationNode_xYlaTt("line-height", resolvedLeading_mVmGwx)), resultArr_OsjihI;
                }
                return "string" == typeof fontProps_jUtpPg ?
                [makeDeclarationNode_xYlaTt("font-size", fontSize_YXQLJm), makeDeclarationNode_xYlaTt("line-height", fontProps_jUtpPg)] :
                [
                makeDeclarationNode_xYlaTt("font-size", fontSize_YXQLJm),
                makeDeclarationNode_xYlaTt(
                  "line-height",
                  fontProps_jUtpPg["--line-height"] ?
                  `var(--tw-leading, ${fontProps_jUtpPg["--line-height"]})` :
                  void 0
                ),
                makeDeclarationNode_xYlaTt(
                  "letter-spacing",
                  fontProps_jUtpPg["--letter-spacing"] ?
                  `var(--tw-tracking, ${fontProps_jUtpPg["--letter-spacing"]})` :
                  void 0
                ),
                makeDeclarationNode_xYlaTt(
                  "font-weight",
                  fontProps_jUtpPg["--font-weight"] ?
                  `var(--tw-font-weight, ${fontProps_jUtpPg["--font-weight"]})` :
                  void 0
                )];

              }
            }
          }
        }),
        registerCompletions_VddGyH("text", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--text-color", "--color"],
          modifiers: Array.from({ length: 21 }, (unusedVal_znvALL, idx_qAhWOu) => "" + 5 * idx_qAhWOu)
        },
        {
          values: [],
          valueThemeKeys: ["--text"],
          modifiers: [],
          modifierThemeKeys: ["--leading"]
        }]
        );
        let makeTextShadowVarInit_fIruHx = () =>
        makeAtRootNode_uVreCe([
        makeAtPropertyNode_DIaSSt("--tw-text-shadow-color"),
        makeAtPropertyNode_DIaSSt("--tw-text-shadow-alpha", "100%", "<percentage>")]
        );
        registerStaticUtility_zeqrZG("text-shadow-initial", [makeTextShadowVarInit_fIruHx, ["--tw-text-shadow-color", "initial"]]),
        utilityRegistry_fatAmE.functional("text-shadow", (arg_hrOsyF) => {
          let alpha_ZwtClx;
          if (
          arg_hrOsyF.modifier && (
          "arbitrary" === arg_hrOsyF.modifier.kind ?
          alpha_ZwtClx = arg_hrOsyF.modifier.value :
          isNonNegativeInteger_QISFSJ(arg_hrOsyF.modifier.value) && (alpha_ZwtClx = `${arg_hrOsyF.modifier.value}%`)),
          !arg_hrOsyF.value)
          {
            let shadowVar_fVYEHE = themeVarMap_nHCGUd.get(["--text-shadow"]);
            return null === shadowVar_fVYEHE ?
            void 0 :
            [
            makeTextShadowVarInit_fIruHx(),
            makeDeclarationNode_xYlaTt("--tw-text-shadow-alpha", alpha_ZwtClx),
            ...propertyValueWithOpacity_yhXIiM(
              "text-shadow",
              shadowVar_fVYEHE,
              alpha_ZwtClx,
              (shadowColor_MmYUEE) => `var(--tw-text-shadow-color, ${shadowColor_MmYUEE})`
            )];

          }
          if ("arbitrary" === arg_hrOsyF.value.kind) {
            let val_gEhqRa = arg_hrOsyF.value.value;
            return "color" === (arg_hrOsyF.value.dataType ?? resolveCssType_DhcVtf(val_gEhqRa, ["color"])) ? (
            val_gEhqRa = applyOpacityToColor_qFFjzR(val_gEhqRa, arg_hrOsyF.modifier, themeVarMap_nHCGUd),
            null === val_gEhqRa ?
            void 0 :
            [
            makeTextShadowVarInit_fIruHx(),
            makeDeclarationNode_xYlaTt(
              "--tw-text-shadow-color",
              colorWithOpacityValue_xdDGmk(val_gEhqRa, "var(--tw-text-shadow-alpha)")
            )]) :

            [
            makeTextShadowVarInit_fIruHx(),
            makeDeclarationNode_xYlaTt("--tw-text-shadow-alpha", alpha_ZwtClx),
            ...propertyValueWithOpacity_yhXIiM(
              "text-shadow",
              val_gEhqRa,
              alpha_ZwtClx,
              (shadowColor_joJNIi) => `var(--tw-text-shadow-color, ${shadowColor_joJNIi})`
            )];

          }
          switch (arg_hrOsyF.value.value) {
            case "none":
              return arg_hrOsyF.modifier ? void 0 : [makeTextShadowVarInit_fIruHx(), makeDeclarationNode_xYlaTt("text-shadow", "none")];
            case "inherit":
              return arg_hrOsyF.modifier ?
              void 0 :
              [makeTextShadowVarInit_fIruHx(), makeDeclarationNode_xYlaTt("--tw-text-shadow-color", "inherit")];
          }
          {
            let modShadowVar_NjWAfB = themeVarMap_nHCGUd.get([`--text-shadow-${arg_hrOsyF.value.value}`]);
            if (modShadowVar_NjWAfB)
            return [
            makeTextShadowVarInit_fIruHx(),
            makeDeclarationNode_xYlaTt("--tw-text-shadow-alpha", alpha_ZwtClx),
            ...propertyValueWithOpacity_yhXIiM(
              "text-shadow",
              modShadowVar_NjWAfB,
              alpha_ZwtClx,
              (shadowColor_jWVBGZ) => `var(--tw-text-shadow-color, ${shadowColor_jWVBGZ})`
            )];

          }
          {
            let colorVal_lQNFxX = mapStaticThemeColor_GNTWCf(arg_hrOsyF, themeVarMap_nHCGUd, ["--text-shadow-color", "--color"]);
            if (colorVal_lQNFxX)
            return [
            makeTextShadowVarInit_fIruHx(),
            makeDeclarationNode_xYlaTt(
              "--tw-text-shadow-color",
              colorWithOpacityValue_xdDGmk(colorVal_lQNFxX, "var(--tw-text-shadow-alpha)")
            )];

          }
        }),
        registerCompletions_VddGyH("text-shadow", () => [
        {
          values: ["current", "inherit", "transparent"],
          valueThemeKeys: ["--text-shadow-color", "--color"],
          modifiers: Array.from({ length: 21 }, (unusedValue_NnDlTi, idx_oGKuSy) => "" + 5 * idx_oGKuSy)
        },
        { values: ["none"] },
        {
          valueThemeKeys: ["--text-shadow"],
          modifiers: Array.from({ length: 21 }, (unusedValue_hXBkpY, idx_DpMacZ) => "" + 5 * idx_DpMacZ),
          hasDefaultValue: null !== themeVarMap_nHCGUd.get(["--text-shadow"])
        }]
        );
        {
          let getRingShadow_HGlOTB = function (radius_sttMzx) {
              return `var(--tw-ring-inset,) 0 0 0 calc(${radius_sttMzx} + var(--tw-ring-offset-width)) var(--tw-ring-color, ${ringColorValue_Ugcthz})`;
            },
            getInsetRingShadow_AlHhYl = function (radius_TbxSUd) {
              return `inset 0 0 0 ${radius_TbxSUd} var(--tw-inset-ring-color, currentcolor)`;
            },
            boxShadowVarsString_vyolJn = [
            "var(--tw-inset-shadow)",
            "var(--tw-inset-ring-shadow)",
            "var(--tw-ring-offset-shadow)",
            "var(--tw-ring-shadow)",
            "var(--tw-shadow)"].
            join(", "),
            noShadowVar_KbGvHQ = "0 0 #0000",
            makeShadowVarInit_gGGBcr = () =>
            makeAtRootNode_uVreCe([
            makeAtPropertyNode_DIaSSt("--tw-shadow", noShadowVar_KbGvHQ),
            makeAtPropertyNode_DIaSSt("--tw-shadow-color"),
            makeAtPropertyNode_DIaSSt("--tw-shadow-alpha", "100%", "<percentage>"),
            makeAtPropertyNode_DIaSSt("--tw-inset-shadow", noShadowVar_KbGvHQ),
            makeAtPropertyNode_DIaSSt("--tw-inset-shadow-color"),
            makeAtPropertyNode_DIaSSt("--tw-inset-shadow-alpha", "100%", "<percentage>"),
            makeAtPropertyNode_DIaSSt("--tw-ring-color"),
            makeAtPropertyNode_DIaSSt("--tw-ring-shadow", noShadowVar_KbGvHQ),
            makeAtPropertyNode_DIaSSt("--tw-inset-ring-color"),
            makeAtPropertyNode_DIaSSt("--tw-inset-ring-shadow", noShadowVar_KbGvHQ),
            makeAtPropertyNode_DIaSSt("--tw-ring-inset"),
            makeAtPropertyNode_DIaSSt("--tw-ring-offset-width", "0px", "<length>"),
            makeAtPropertyNode_DIaSSt("--tw-ring-offset-color", "#fff"),
            makeAtPropertyNode_DIaSSt("--tw-ring-offset-shadow", noShadowVar_KbGvHQ)]
            );
          registerStaticUtility_zeqrZG("shadow-initial", [makeShadowVarInit_gGGBcr, ["--tw-shadow-color", "initial"]]),
          utilityRegistry_fatAmE.functional("shadow", (arg_dmaLfN) => {
            let alpha_yeIMza;
            if (
            arg_dmaLfN.modifier && (
            "arbitrary" === arg_dmaLfN.modifier.kind ?
            alpha_yeIMza = arg_dmaLfN.modifier.value :
            isNonNegativeInteger_QISFSJ(arg_dmaLfN.modifier.value) && (alpha_yeIMza = `${arg_dmaLfN.modifier.value}%`)),
            !arg_dmaLfN.value)
            {
              let shadowVar_zsMxfk = themeVarMap_nHCGUd.get(["--shadow"]);
              return null === shadowVar_zsMxfk ?
              void 0 :
              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-shadow-alpha", alpha_yeIMza),
              ...propertyValueWithOpacity_yhXIiM(
                "--tw-shadow",
                shadowVar_zsMxfk,
                alpha_yeIMza,
                (shadowColor_ZpIXzq) => `var(--tw-shadow-color, ${shadowColor_ZpIXzq})`
              ),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
            if ("arbitrary" === arg_dmaLfN.value.kind) {
              let val_BmVhEA = arg_dmaLfN.value.value;
              return "color" === (arg_dmaLfN.value.dataType ?? resolveCssType_DhcVtf(val_BmVhEA, ["color"])) ? (
              val_BmVhEA = applyOpacityToColor_qFFjzR(val_BmVhEA, arg_dmaLfN.modifier, themeVarMap_nHCGUd),
              null === val_BmVhEA ?
              void 0 :
              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt(
                "--tw-shadow-color",
                colorWithOpacityValue_xdDGmk(val_BmVhEA, "var(--tw-shadow-alpha)")
              )]) :

              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-shadow-alpha", alpha_yeIMza),
              ...propertyValueWithOpacity_yhXIiM(
                "--tw-shadow",
                val_BmVhEA,
                alpha_yeIMza,
                (shadowColor_sjzOBe) => `var(--tw-shadow-color, ${shadowColor_sjzOBe})`
              ),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
            switch (arg_dmaLfN.value.value) {
              case "none":
                return arg_dmaLfN.modifier ?
                void 0 :
                [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-shadow", noShadowVar_KbGvHQ), makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];
              case "inherit":
                return arg_dmaLfN.modifier ?
                void 0 :
                [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-shadow-color", "inherit")];
            }
            {
              let modShadowVar_VjXUiC = themeVarMap_nHCGUd.get([`--shadow-${arg_dmaLfN.value.value}`]);
              if (modShadowVar_VjXUiC)
              return [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-shadow-alpha", alpha_yeIMza),
              ...propertyValueWithOpacity_yhXIiM(
                "--tw-shadow",
                modShadowVar_VjXUiC,
                alpha_yeIMza,
                (shadowColor_sQdYEk) => `var(--tw-shadow-color, ${shadowColor_sQdYEk})`
              ),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
            {
              let colorVal_SFXZAA = mapStaticThemeColor_GNTWCf(arg_dmaLfN, themeVarMap_nHCGUd, ["--box-shadow-color", "--color"]);
              if (colorVal_SFXZAA)
              return [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-shadow-color", colorWithOpacityValue_xdDGmk(colorVal_SFXZAA, "var(--tw-shadow-alpha)"))];

            }
          }),
          registerCompletions_VddGyH("shadow", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--box-shadow-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedValue_famUXB, idx_KSgwzS) => "" + 5 * idx_KSgwzS)
          },
          { values: ["none"] },
          {
            valueThemeKeys: ["--shadow"],
            modifiers: Array.from({ length: 21 }, (unusedValue_GRQjkU, idx_cbbEyW) => "" + 5 * idx_cbbEyW),
            hasDefaultValue: null !== themeVarMap_nHCGUd.get(["--shadow"])
          }]
          ),
          registerStaticUtility_zeqrZG("inset-shadow-initial", [
          makeShadowVarInit_gGGBcr,
          ["--tw-inset-shadow-color", "initial"]]
          ),
          utilityRegistry_fatAmE.functional("inset-shadow", (arg_ZMURDH) => {
            let alpha_tebvlY;
            if (
            arg_ZMURDH.modifier && (
            "arbitrary" === arg_ZMURDH.modifier.kind ?
            alpha_tebvlY = arg_ZMURDH.modifier.value :
            isNonNegativeInteger_QISFSJ(arg_ZMURDH.modifier.value) && (alpha_tebvlY = `${arg_ZMURDH.modifier.value}%`)),
            !arg_ZMURDH.value)
            {
              let shadowVar_ZhupOr = themeVarMap_nHCGUd.get(["--inset-shadow"]);
              return null === shadowVar_ZhupOr ?
              void 0 :
              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-inset-shadow-alpha", alpha_tebvlY),
              ...propertyValueWithOpacity_yhXIiM(
                "--tw-inset-shadow",
                shadowVar_ZhupOr,
                alpha_tebvlY,
                (shadowColor_PDJIsX) => `var(--tw-inset-shadow-color, ${shadowColor_PDJIsX})`
              ),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
            if ("arbitrary" === arg_ZMURDH.value.kind) {
              let val_mDeWHD = arg_ZMURDH.value.value;
              return "color" === (arg_ZMURDH.value.dataType ?? resolveCssType_DhcVtf(val_mDeWHD, ["color"])) ? (
              val_mDeWHD = applyOpacityToColor_qFFjzR(val_mDeWHD, arg_ZMURDH.modifier, themeVarMap_nHCGUd),
              null === val_mDeWHD ?
              void 0 :
              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt(
                "--tw-inset-shadow-color",
                colorWithOpacityValue_xdDGmk(val_mDeWHD, "var(--tw-inset-shadow-alpha)")
              )]) :

              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-inset-shadow-alpha", alpha_tebvlY),
              ...propertyValueWithOpacity_yhXIiM(
                "--tw-inset-shadow",
                val_mDeWHD,
                alpha_tebvlY,
                (shadowColor_nyTZRT) => `var(--tw-inset-shadow-color, ${shadowColor_nyTZRT})`,
                "inset "
              ),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
            switch (arg_ZMURDH.value.value) {
              case "none":
                return arg_ZMURDH.modifier ?
                void 0 :
                [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-inset-shadow", noShadowVar_KbGvHQ), makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];
              case "inherit":
                return arg_ZMURDH.modifier ?
                void 0 :
                [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-inset-shadow-color", "inherit")];
            }
            {
              let modInsetShadowVar_dnyVvk = themeVarMap_nHCGUd.get([`--inset-shadow-${arg_ZMURDH.value.value}`]);
              if (modInsetShadowVar_dnyVvk)
              return [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-inset-shadow-alpha", alpha_tebvlY),
              ...propertyValueWithOpacity_yhXIiM(
                "--tw-inset-shadow",
                modInsetShadowVar_dnyVvk,
                alpha_tebvlY,
                (shadowColor_KZjjid) => `var(--tw-inset-shadow-color, ${shadowColor_KZjjid})`
              ),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
            {
              let colorVal_sCgKsY = mapStaticThemeColor_GNTWCf(arg_ZMURDH, themeVarMap_nHCGUd, ["--box-shadow-color", "--color"]);
              if (colorVal_sCgKsY)
              return [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt(
                "--tw-inset-shadow-color",
                colorWithOpacityValue_xdDGmk(colorVal_sCgKsY, "var(--tw-inset-shadow-alpha)")
              )];

            }
          }),
          registerCompletions_VddGyH("inset-shadow", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--box-shadow-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedVal_wPFxDf, idx_oSIGor) => "" + 5 * idx_oSIGor)
          },
          { values: ["none"] },
          {
            valueThemeKeys: ["--inset-shadow"],
            modifiers: Array.from({ length: 21 }, (unusedVal_cuaicU, idx_OjFHzj) => "" + 5 * idx_OjFHzj),
            hasDefaultValue: null !== themeVarMap_nHCGUd.get(["--inset-shadow"])
          }]
          ),
          registerStaticUtility_zeqrZG("ring-inset", [makeShadowVarInit_gGGBcr, ["--tw-ring-inset", "inset"]]);
          let ringColorValue_Ugcthz = themeVarMap_nHCGUd.get(["--default-ring-color"]) ?? "currentcolor";
          utilityRegistry_fatAmE.functional("ring", (arg_AylGJb) => {
            if (!arg_AylGJb.value) {
              if (arg_AylGJb.modifier) return;
              let defaultRingWidth_ZvSgts = themeVarMap_nHCGUd.get(["--default-ring-width"]) ?? "1px";
              return [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-ring-shadow", getRingShadow_HGlOTB(defaultRingWidth_ZvSgts)), makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];
            }
            if ("arbitrary" === arg_AylGJb.value.kind) {
              let val_sESPph = arg_AylGJb.value.value;
              return "length" === (
              arg_AylGJb.value.dataType ?? resolveCssType_DhcVtf(val_sESPph, ["color", "length"])) ?
              arg_AylGJb.modifier ?
              void 0 :
              [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-ring-shadow", getRingShadow_HGlOTB(val_sESPph)), makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)] : (
              val_sESPph = applyOpacityToColor_qFFjzR(val_sESPph, arg_AylGJb.modifier, themeVarMap_nHCGUd),
              null === val_sESPph ? void 0 : [makeDeclarationNode_xYlaTt("--tw-ring-color", val_sESPph)]);
            }
            {
              let colorValue_yUnYSi = mapStaticThemeColor_GNTWCf(arg_AylGJb, themeVarMap_nHCGUd, ["--ring-color", "--color"]);
              if (colorValue_yUnYSi) return [makeDeclarationNode_xYlaTt("--tw-ring-color", colorValue_yUnYSi)];
            }
            {
              if (arg_AylGJb.modifier) return;
              let resolvedRingWidth_WHTnWz = themeVarMap_nHCGUd.resolve(arg_AylGJb.value.value, ["--ring-width"]);
              if (
              null === resolvedRingWidth_WHTnWz && isNonNegativeInteger_QISFSJ(arg_AylGJb.value.value) && (resolvedRingWidth_WHTnWz = `${arg_AylGJb.value.value}px`),
              resolvedRingWidth_WHTnWz)

              return [makeShadowVarInit_gGGBcr(), makeDeclarationNode_xYlaTt("--tw-ring-shadow", getRingShadow_HGlOTB(resolvedRingWidth_WHTnWz)), makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];
            }
          }),
          registerCompletions_VddGyH("ring", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--ring-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedVal_LokXoK, idx_oZIPEY) => "" + 5 * idx_oZIPEY)
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--ring-width"],
            hasDefaultValue: !0
          }]
          ),
          utilityRegistry_fatAmE.functional("inset-ring", (arg_lgDLdz) => {
            if (!arg_lgDLdz.value)
            return arg_lgDLdz.modifier ?
            void 0 :
            [
            makeShadowVarInit_gGGBcr(),
            makeDeclarationNode_xYlaTt("--tw-inset-ring-shadow", getInsetRingShadow_AlHhYl("1px")),
            makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            if ("arbitrary" === arg_lgDLdz.value.kind) {
              let val_KmMKHd = arg_lgDLdz.value.value;
              return "length" === (
              arg_lgDLdz.value.dataType ?? resolveCssType_DhcVtf(val_KmMKHd, ["color", "length"])) ?
              arg_lgDLdz.modifier ?
              void 0 :
              [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-inset-ring-shadow", getInsetRingShadow_AlHhYl(val_KmMKHd)),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)] : (

              val_KmMKHd = applyOpacityToColor_qFFjzR(val_KmMKHd, arg_lgDLdz.modifier, themeVarMap_nHCGUd),
              null === val_KmMKHd ? void 0 : [makeDeclarationNode_xYlaTt("--tw-inset-ring-color", val_KmMKHd)]);
            }
            {
              let colorValue_piBozZ = mapStaticThemeColor_GNTWCf(arg_lgDLdz, themeVarMap_nHCGUd, ["--ring-color", "--color"]);
              if (colorValue_piBozZ) return [makeDeclarationNode_xYlaTt("--tw-inset-ring-color", colorValue_piBozZ)];
            }
            {
              if (arg_lgDLdz.modifier) return;
              let resolvedRingWidth_IamMzt = themeVarMap_nHCGUd.resolve(arg_lgDLdz.value.value, ["--ring-width"]);
              if (
              null === resolvedRingWidth_IamMzt &&
              isNonNegativeInteger_QISFSJ(arg_lgDLdz.value.value) && (
              resolvedRingWidth_IamMzt = `${arg_lgDLdz.value.value}px`),
              resolvedRingWidth_IamMzt)

              return [
              makeShadowVarInit_gGGBcr(),
              makeDeclarationNode_xYlaTt("--tw-inset-ring-shadow", getInsetRingShadow_AlHhYl(resolvedRingWidth_IamMzt)),
              makeDeclarationNode_xYlaTt("box-shadow", boxShadowVarsString_vyolJn)];

            }
          }),
          registerCompletions_VddGyH("inset-ring", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--ring-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedVal_hTsxhi, idx_NeYTFZ) => "" + 5 * idx_NeYTFZ)
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--ring-width"],
            hasDefaultValue: !0
          }]
          );
          let ringOffsetVarsString_RbahZo =
          "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)";
          utilityRegistry_fatAmE.functional("ring-offset", (arg_KJxLvL) => {
            if (arg_KJxLvL.value) {
              if ("arbitrary" === arg_KJxLvL.value.kind) {
                let val_CcWJXi = arg_KJxLvL.value.value;
                return "length" === (
                arg_KJxLvL.value.dataType ?? resolveCssType_DhcVtf(val_CcWJXi, ["color", "length"])) ?
                arg_KJxLvL.modifier ?
                void 0 :
                [
                makeDeclarationNode_xYlaTt("--tw-ring-offset-width", val_CcWJXi),
                makeDeclarationNode_xYlaTt("--tw-ring-offset-shadow", ringOffsetVarsString_RbahZo)] : (

                val_CcWJXi = applyOpacityToColor_qFFjzR(val_CcWJXi, arg_KJxLvL.modifier, themeVarMap_nHCGUd),
                null === val_CcWJXi ? void 0 : [makeDeclarationNode_xYlaTt("--tw-ring-offset-color", val_CcWJXi)]);
              }
              {
                let resolvedOffset_xEiolS = themeVarMap_nHCGUd.resolve(arg_KJxLvL.value.value, ["--ring-offset-width"]);
                if (resolvedOffset_xEiolS)
                return arg_KJxLvL.modifier ?
                void 0 :
                [
                makeDeclarationNode_xYlaTt("--tw-ring-offset-width", resolvedOffset_xEiolS),
                makeDeclarationNode_xYlaTt("--tw-ring-offset-shadow", ringOffsetVarsString_RbahZo)];

                if (isNonNegativeInteger_QISFSJ(arg_KJxLvL.value.value))
                return arg_KJxLvL.modifier ?
                void 0 :
                [
                makeDeclarationNode_xYlaTt("--tw-ring-offset-width", `${arg_KJxLvL.value.value}px`),
                makeDeclarationNode_xYlaTt("--tw-ring-offset-shadow", ringOffsetVarsString_RbahZo)];

              }
              {
                let colorValue_OhIAEu = mapStaticThemeColor_GNTWCf(arg_KJxLvL, themeVarMap_nHCGUd, ["--ring-offset-color", "--color"]);
                if (colorValue_OhIAEu) return [makeDeclarationNode_xYlaTt("--tw-ring-offset-color", colorValue_OhIAEu)];
              }
            }
          });
        }
        return (
          registerCompletions_VddGyH("ring-offset", () => [
          {
            values: ["current", "inherit", "transparent"],
            valueThemeKeys: ["--ring-offset-color", "--color"],
            modifiers: Array.from({ length: 21 }, (unusedVal_SzlKHM, idx_hBjWkR) => "" + 5 * idx_hBjWkR)
          },
          {
            values: ["0", "1", "2", "4", "8"],
            valueThemeKeys: ["--ring-offset-width"]
          }]
          ),
          utilityRegistry_fatAmE.functional("@container", (arg_FgiZzp) => {
            let containerType_pClslC = null;
            if (
            null === arg_FgiZzp.value ?
            containerType_pClslC = "inline-size" :
            "arbitrary" === arg_FgiZzp.value.kind ?
            containerType_pClslC = arg_FgiZzp.value.value :
            "named" === arg_FgiZzp.value.kind &&
            "normal" === arg_FgiZzp.value.value && (
            containerType_pClslC = "normal"),
            null !== containerType_pClslC)

            return arg_FgiZzp.modifier ?
            [
            makeDeclarationNode_xYlaTt("container-type", containerType_pClslC),
            makeDeclarationNode_xYlaTt("container-name", arg_FgiZzp.modifier.value)] :

            [makeDeclarationNode_xYlaTt("container-type", containerType_pClslC)];
          }),
          registerCompletions_VddGyH("@container", () => [
          { values: ["normal"], valueThemeKeys: [], hasDefaultValue: !0 }]
          ),
          utilityRegistry_fatAmE);

      }(themeData_dCZPaX),
      variantRegistryFactory_DVdnzp = function (config_ZEIZGS) {
        let variantRegistry_vDXJfe = new VariantRegistry_aSbSqe();
        function registerStaticVariant_eMhLyt(variantKey_ewtpxH, cssList_gmVHNa, { compounds: compounds_tKyAdd } = {}) {
          compounds_tKyAdd = compounds_tKyAdd ?? getCompoundsNumber_NglmcN(cssList_gmVHNa),
          variantRegistry_vDXJfe.static(
            variantKey_ewtpxH,
            (astNode_eAXnfF) => {
              astNode_eAXnfF.nodes = cssList_gmVHNa.map((cssString_ZhiYSR) => parseCSSRule_QVgHxe(cssString_ZhiYSR, astNode_eAXnfF.nodes));
            },
            { compounds: compounds_tKyAdd }
          );
        }
        function mapNegatedSelectors_rKtCPd(atRuleName_RniQfU, selectorList_HPmxEQ) {
          return selectorList_HPmxEQ.map((selector_dYpnBP) => {
            let selectorParts_BHsqGy = splitOnTopLevel_EfBwUv(selector_dYpnBP = selector_dYpnBP.trim(), " ");
            return "not" === selectorParts_BHsqGy[0] ?
            selectorParts_BHsqGy.slice(1).join(" ") :
            "@container" === atRuleName_RniQfU ?
            "(" === selectorParts_BHsqGy[0][0] ?
            `not ${selector_dYpnBP}` :
            "not" === selectorParts_BHsqGy[1] ?
            `${selectorParts_BHsqGy[0]} ${selectorParts_BHsqGy.slice(2).join(" ")}` :
            `${selectorParts_BHsqGy[0]} not ${selectorParts_BHsqGy.slice(1).join(" ")}` :
            `not ${selector_dYpnBP}`;
          });
        }
        registerStaticVariant_eMhLyt("*", [":is(& > *)"], { compounds: 0 }),
        registerStaticVariant_eMhLyt("**", [":is(& *)"], { compounds: 0 });
        let containerAtRules_xVUrNj = ["@media", "@supports", "@container"];
        function handleContainerAtRule_UTPsuz(atRule_shtRfO) {
          for (let containerType_RbaoeY of containerAtRules_xVUrNj) {
            if (containerType_RbaoeY !== atRule_shtRfO.name) continue;
            let paramsList_vCPtYJ = splitOnTopLevel_EfBwUv(atRule_shtRfO.params, ",");
            return paramsList_vCPtYJ.length > 1 ?
            null : (
            paramsList_vCPtYJ = mapNegatedSelectors_rKtCPd(atRule_shtRfO.name, paramsList_vCPtYJ), processAtRule_lWgxgY(atRule_shtRfO.name, paramsList_vCPtYJ.join(", ")));
          }
          return null;
        }
        function negateSelector_Knfspd(selector_WlBvRl) {
          return selector_WlBvRl.includes("::") ?
          null :
          `&:not(${splitOnTopLevel_EfBwUv(selector_WlBvRl, ",").
          map((segment_egkBsm) => segment_egkBsm.replaceAll("&", "*")).
          join(", ")})`;
        }
        variantRegistry_vDXJfe.compound("not", 3, (astNode_caTMmo, context_MsGHGB) => {
          if (
          "arbitrary" === context_MsGHGB.variant.kind && context_MsGHGB.variant.relative ||
          context_MsGHGB.modifier)

          return null;
          let done_sUgzNb = !1;
          return (
            walkASTRecursive_YoBVFs([astNode_caTMmo], (node_dkQOfy, { path: path_MzaQMk }) => {
              if ("rule" !== node_dkQOfy.kind && "at-rule" !== node_dkQOfy.kind) return 0;
              if (node_dkQOfy.nodes.length > 0) return 0;
              let atRulesInPath_miWBkW = [],
                rulesInPath_YyOhHj = [];
              for (let n_jwWTJO of path_MzaQMk)
              "at-rule" === n_jwWTJO.kind ?
              atRulesInPath_miWBkW.push(n_jwWTJO) :
              "rule" === n_jwWTJO.kind && rulesInPath_YyOhHj.push(n_jwWTJO);
              if (atRulesInPath_miWBkW.length > 1) return 2;
              if (rulesInPath_YyOhHj.length > 1) return 2;
              let notNodes_NZRQWG = [];
              for (let r_fcMFYH of rulesInPath_YyOhHj) {
                let negated_JxnuIP = negateSelector_Knfspd(r_fcMFYH.selector);
                if (!negated_JxnuIP) return done_sUgzNb = !1, 2;
                notNodes_NZRQWG.push(makeRuleNode_PDClCj(negated_JxnuIP, []));
              }
              for (let a_EoguYw of atRulesInPath_miWBkW) {
                let handledAtRule_yCPyQU = handleContainerAtRule_UTPsuz(a_EoguYw);
                if (!handledAtRule_yCPyQU) return done_sUgzNb = !1, 2;
                notNodes_NZRQWG.push(handledAtRule_yCPyQU);
              }
              return Object.assign(astNode_caTMmo, makeRuleNode_PDClCj("&", notNodes_NZRQWG)), done_sUgzNb = !0, 1;
            }),
            "rule" === astNode_caTMmo.kind &&
            "&" === astNode_caTMmo.selector &&
            1 === astNode_caTMmo.nodes.length &&
            Object.assign(astNode_caTMmo, astNode_caTMmo.nodes[0]),
            done_sUgzNb ? void 0 : null);

        }),
        variantRegistry_vDXJfe.suggest("not", () =>
        Array.from(variantRegistry_vDXJfe.keys()).filter((variantKey_guEIkI) => variantRegistry_vDXJfe.compoundsWith("not", variantKey_guEIkI))
        ),
        variantRegistry_vDXJfe.compound("group", 2, (groupAstNode_ebkMLN, groupContext_dEBetm) => {
          if ("arbitrary" === groupContext_dEBetm.variant.kind && groupContext_dEBetm.variant.relative)
          return null;
          let groupSelector_qWqkrA = groupContext_dEBetm.modifier ?
            `:where(.${config_ZEIZGS.prefix ? `${config_ZEIZGS.prefix}\\:` : ""}group\\/${groupContext_dEBetm.modifier.value})` :
            `:where(.${config_ZEIZGS.prefix ? `${config_ZEIZGS.prefix}\\:` : ""}group)`,
            matched_GgPAYK = !1;
          return (
            walkASTRecursive_YoBVFs([groupAstNode_ebkMLN], (astRule_sfsVcb, { path: ancestors_IvGJsP }) => {
              if ("rule" !== astRule_sfsVcb.kind) return 0;
              for (let ancestorNode_IJATyO of ancestors_IvGJsP.slice(0, -1))
              if ("rule" === ancestorNode_IJATyO.kind) return matched_GgPAYK = !1, 2;
              let replacedSelector_aUoihX = astRule_sfsVcb.selector.replaceAll("&", groupSelector_qWqkrA);
              splitOnTopLevel_EfBwUv(replacedSelector_aUoihX, ",").length > 1 && (replacedSelector_aUoihX = `:is(${replacedSelector_aUoihX})`),
              astRule_sfsVcb.selector = `&:is(${replacedSelector_aUoihX} *)`,
              matched_GgPAYK = !0;
            }),
            matched_GgPAYK ? void 0 : null);

        }),
        variantRegistry_vDXJfe.suggest("group", () =>
        Array.from(variantRegistry_vDXJfe.keys()).filter((variantKey_SWBaQo) => variantRegistry_vDXJfe.compoundsWith("group", variantKey_SWBaQo))
        ),
        variantRegistry_vDXJfe.compound("peer", 2, (astNode_lgDErp, context_CcCYRQ) => {
          if ("arbitrary" === context_CcCYRQ.variant.kind && context_CcCYRQ.variant.relative)
          return null;
          let peerSelector_cdqQVS = context_CcCYRQ.modifier ?
            `:where(.${config_ZEIZGS.prefix ? `${config_ZEIZGS.prefix}\\:` : ""}peer\\/${context_CcCYRQ.modifier.value})` :
            `:where(.${config_ZEIZGS.prefix ? `${config_ZEIZGS.prefix}\\:` : ""}peer)`,
            found_cMYYyA = !1;
          return (
            walkASTRecursive_YoBVFs([astNode_lgDErp], (astRule_jtxjTg, { path: ancestors_qeviUC }) => {
              if ("rule" !== astRule_jtxjTg.kind) return 0;
              for (let ancestorNode_joDWDS of ancestors_qeviUC.slice(0, -1))
              if ("rule" === ancestorNode_joDWDS.kind) return found_cMYYyA = !1, 2;
              let replacedSelector_yFpAnx = astRule_jtxjTg.selector.replaceAll("&", peerSelector_cdqQVS);
              splitOnTopLevel_EfBwUv(replacedSelector_yFpAnx, ",").length > 1 && (replacedSelector_yFpAnx = `:is(${replacedSelector_yFpAnx})`),
              astRule_jtxjTg.selector = `&:is(${replacedSelector_yFpAnx} ~ *)`,
              found_cMYYyA = !0;
            }),
            found_cMYYyA ? void 0 : null);

        }),
        variantRegistry_vDXJfe.suggest("peer", () =>
        Array.from(variantRegistry_vDXJfe.keys()).filter((peerVariantKey_WtaUuw) => variantRegistry_vDXJfe.compoundsWith("peer", peerVariantKey_WtaUuw))
        ),
        registerStaticVariant_eMhLyt("first-letter", ["&::first-letter"]),
        registerStaticVariant_eMhLyt("first-line", ["&::first-line"]),
        registerStaticVariant_eMhLyt("marker", [
        "& *::marker",
        "&::marker",
        "& *::-webkit-details-marker",
        "&::-webkit-details-marker"]
        ),
        registerStaticVariant_eMhLyt("selection", ["& *::selection", "&::selection"]),
        registerStaticVariant_eMhLyt("file", ["&::file-selector-button"]),
        registerStaticVariant_eMhLyt("placeholder", ["&::placeholder"]),
        registerStaticVariant_eMhLyt("backdrop", ["&::backdrop"]),
        registerStaticVariant_eMhLyt("details-content", ["&::details-content"]);
        {
          let makeBeforeAfterVarInit_FTOHrH = function () {
            return makeAtRootNode_uVreCe([
            processAtRule_lWgxgY("@property", "--tw-content", [
            makeDeclarationNode_xYlaTt("syntax", '"*"'),
            makeDeclarationNode_xYlaTt("initial-value", '""'),
            makeDeclarationNode_xYlaTt("inherits", "false")]
            )]
            );
          };
          variantRegistry_vDXJfe.static(
            "before",
            (node_CPxNIN) => {
              node_CPxNIN.nodes = [
              makeRuleNode_PDClCj("&::before", [
              makeBeforeAfterVarInit_FTOHrH(),
              makeDeclarationNode_xYlaTt("content", "var(--tw-content)"),
              ...node_CPxNIN.nodes]
              )];

            },
            { compounds: 0 }
          ),
          variantRegistry_vDXJfe.static(
            "after",
            (node_muNoOf) => {
              node_muNoOf.nodes = [
              makeRuleNode_PDClCj("&::after", [
              makeBeforeAfterVarInit_FTOHrH(),
              makeDeclarationNode_xYlaTt("content", "var(--tw-content)"),
              ...node_muNoOf.nodes]
              )];

            },
            { compounds: 0 }
          );
        }
        registerStaticVariant_eMhLyt("first", ["&:first-child"]),
        registerStaticVariant_eMhLyt("last", ["&:last-child"]),
        registerStaticVariant_eMhLyt("only", ["&:only-child"]),
        registerStaticVariant_eMhLyt("odd", ["&:nth-child(odd)"]),
        registerStaticVariant_eMhLyt("even", ["&:nth-child(even)"]),
        registerStaticVariant_eMhLyt("first-of-type", ["&:first-of-type"]),
        registerStaticVariant_eMhLyt("last-of-type", ["&:last-of-type"]),
        registerStaticVariant_eMhLyt("only-of-type", ["&:only-of-type"]),
        registerStaticVariant_eMhLyt("visited", ["&:visited"]),
        registerStaticVariant_eMhLyt("target", ["&:target"]),
        registerStaticVariant_eMhLyt("open", ["&:is([open], :popover-open, :open)"]),
        registerStaticVariant_eMhLyt("default", ["&:default"]),
        registerStaticVariant_eMhLyt("checked", ["&:checked"]),
        registerStaticVariant_eMhLyt("indeterminate", ["&:indeterminate"]),
        registerStaticVariant_eMhLyt("placeholder-shown", ["&:placeholder-shown"]),
        registerStaticVariant_eMhLyt("autofill", ["&:autofill"]),
        registerStaticVariant_eMhLyt("optional", ["&:optional"]),
        registerStaticVariant_eMhLyt("required", ["&:required"]),
        registerStaticVariant_eMhLyt("valid", ["&:valid"]),
        registerStaticVariant_eMhLyt("invalid", ["&:invalid"]),
        registerStaticVariant_eMhLyt("user-valid", ["&:user-valid"]),
        registerStaticVariant_eMhLyt("user-invalid", ["&:user-invalid"]),
        registerStaticVariant_eMhLyt("in-range", ["&:in-range"]),
        registerStaticVariant_eMhLyt("out-of-range", ["&:out-of-range"]),
        registerStaticVariant_eMhLyt("read-only", ["&:read-only"]),
        registerStaticVariant_eMhLyt("empty", ["&:empty"]),
        registerStaticVariant_eMhLyt("focus-within", ["&:focus-within"]),
        variantRegistry_vDXJfe.static("hover", (hoverAstNode_pjXfsj) => {
          hoverAstNode_pjXfsj.nodes = [makeRuleNode_PDClCj("&:hover", [processAtRule_lWgxgY("@media", "(hover: hover)", hoverAstNode_pjXfsj.nodes)])];
        }),
        registerStaticVariant_eMhLyt("focus", ["&:focus"]),
        registerStaticVariant_eMhLyt("focus-visible", ["&:focus-visible"]),
        registerStaticVariant_eMhLyt("active", ["&:active"]),
        registerStaticVariant_eMhLyt("enabled", ["&:enabled"]),
        registerStaticVariant_eMhLyt("disabled", ["&:disabled"]),
        registerStaticVariant_eMhLyt("inert", ["&:is([inert], [inert] *)"]),
        variantRegistry_vDXJfe.compound("in", 2, (node_PFvLkN, args_tbMNwm) => {
          if (args_tbMNwm.modifier) return null;
          let found_JeOfHb = !1;
          return (
            walkASTRecursive_YoBVFs([node_PFvLkN], (ruleNode_JCUqes, { path: path_yxYsrI }) => {
              if ("rule" !== ruleNode_JCUqes.kind) return 0;
              for (let node_BmrHKZ of path_yxYsrI.slice(0, -1))
              if ("rule" === node_BmrHKZ.kind) return found_JeOfHb = !1, 2;
              ruleNode_JCUqes.selector = `:where(${ruleNode_JCUqes.selector.replaceAll("&", "*")}) &`,
              found_JeOfHb = !0;
            }),
            found_JeOfHb ? void 0 : null);

        }),
        variantRegistry_vDXJfe.suggest("in", () =>
        Array.from(variantRegistry_vDXJfe.keys()).filter((inVariantKey_QBBzhK) => variantRegistry_vDXJfe.compoundsWith("in", inVariantKey_QBBzhK))
        ),
        variantRegistry_vDXJfe.compound("has", 2, (node_BmDHTL, args_vsFMPg) => {
          if (args_vsFMPg.modifier) return null;
          let found_RspYuW = !1;
          return (
            walkASTRecursive_YoBVFs([node_BmDHTL], (ruleNode_QSqvWD, { path: path_cOHtvp }) => {
              if ("rule" !== ruleNode_QSqvWD.kind) return 0;
              for (let node_SyIppG of path_cOHtvp.slice(0, -1))
              if ("rule" === node_SyIppG.kind) return found_RspYuW = !1, 2;
              ruleNode_QSqvWD.selector = `&:has(${ruleNode_QSqvWD.selector.replaceAll("&", "*")})`,
              found_RspYuW = !0;
            }),
            found_RspYuW ? void 0 : null);

        }),
        variantRegistry_vDXJfe.suggest("has", () =>
        Array.from(variantRegistry_vDXJfe.keys()).filter((hasVariantKey_XSbqOB) => variantRegistry_vDXJfe.compoundsWith("has", hasVariantKey_XSbqOB))
        ),
        variantRegistry_vDXJfe.functional("aria", (node_oHNCsw, args_SteyFc) => {
          if (!args_SteyFc.value || args_SteyFc.modifier) return null;
          "arbitrary" === args_SteyFc.value.kind ?
          node_oHNCsw.nodes = [makeRuleNode_PDClCj(`&[aria-${quoteIfNeeded_KWDqOx(args_SteyFc.value.value)}]`, node_oHNCsw.nodes)] :
          node_oHNCsw.nodes = [makeRuleNode_PDClCj(`&[aria-${args_SteyFc.value.value}="true"]`, node_oHNCsw.nodes)];
        }),
        variantRegistry_vDXJfe.suggest("aria", () => [
        "busy",
        "checked",
        "disabled",
        "expanded",
        "hidden",
        "pressed",
        "readonly",
        "required",
        "selected"]
        ),
        variantRegistry_vDXJfe.functional("data", (node_eyVjen, args_kEzEWh) => {
          if (!args_kEzEWh.value || args_kEzEWh.modifier) return null;
          node_eyVjen.nodes = [makeRuleNode_PDClCj(`&[data-${quoteIfNeeded_KWDqOx(args_kEzEWh.value.value)}]`, node_eyVjen.nodes)];
        }),
        variantRegistry_vDXJfe.functional("nth", (node_XaExCZ, args_yvPBFq) => {
          if (
          !args_yvPBFq.value ||
          args_yvPBFq.modifier ||
          "named" === args_yvPBFq.value.kind && !isNonNegativeInteger_QISFSJ(args_yvPBFq.value.value))

          return null;
          node_XaExCZ.nodes = [makeRuleNode_PDClCj(`&:nth-child(${args_yvPBFq.value.value})`, node_XaExCZ.nodes)];
        }),
        variantRegistry_vDXJfe.functional("nth-last", (node_ijkzGY, args_RwIGRX) => {
          if (
          !args_RwIGRX.value ||
          args_RwIGRX.modifier ||
          "named" === args_RwIGRX.value.kind && !isNonNegativeInteger_QISFSJ(args_RwIGRX.value.value))

          return null;
          node_ijkzGY.nodes = [makeRuleNode_PDClCj(`&:nth-last-child(${args_RwIGRX.value.value})`, node_ijkzGY.nodes)];
        }),
        variantRegistry_vDXJfe.functional("nth-of-type", (node_LgdqWc, args_gVLebJ) => {
          if (
          !args_gVLebJ.value ||
          args_gVLebJ.modifier ||
          "named" === args_gVLebJ.value.kind && !isNonNegativeInteger_QISFSJ(args_gVLebJ.value.value))

          return null;
          node_LgdqWc.nodes = [makeRuleNode_PDClCj(`&:nth-of-type(${args_gVLebJ.value.value})`, node_LgdqWc.nodes)];
        }),
        variantRegistry_vDXJfe.functional("nth-last-of-type", (node_kDTxAR, args_amzneB) => {
          if (
          !args_amzneB.value ||
          args_amzneB.modifier ||
          "named" === args_amzneB.value.kind && !isNonNegativeInteger_QISFSJ(args_amzneB.value.value))

          return null;
          node_kDTxAR.nodes = [makeRuleNode_PDClCj(`&:nth-last-of-type(${args_amzneB.value.value})`, node_kDTxAR.nodes)];
        }),
        variantRegistry_vDXJfe.functional(
          "supports",
          (node_nQsfWh, args_znlhhk) => {
            if (!args_znlhhk.value || args_znlhhk.modifier) return null;
            let supportsValue_sEAapq = args_znlhhk.value.value;
            if (null === supportsValue_sEAapq) return null;
            if (/^[\w-]*\s*\(/.test(supportsValue_sEAapq)) {
              let supportsFixedValue_pQYSZo = supportsValue_sEAapq.replace(/\b(and|or|not)\b/g, " $1 ");
              node_nQsfWh.nodes = [processAtRule_lWgxgY("@supports", supportsFixedValue_pQYSZo, node_nQsfWh.nodes)];
            } else
            supportsValue_sEAapq.includes(":") || (supportsValue_sEAapq = `${supportsValue_sEAapq}: var(--tw)`),
            ("(" !== supportsValue_sEAapq[0] || ")" !== supportsValue_sEAapq[supportsValue_sEAapq.length - 1]) && (supportsValue_sEAapq = `(${supportsValue_sEAapq})`),
            node_nQsfWh.nodes = [processAtRule_lWgxgY("@supports", supportsValue_sEAapq, node_nQsfWh.nodes)];
          },
          { compounds: 1 }
        ),
        registerStaticVariant_eMhLyt("motion-safe", ["@media (prefers-reduced-motion: no-preference)"]),
        registerStaticVariant_eMhLyt("motion-reduce", ["@media (prefers-reduced-motion: reduce)"]),
        registerStaticVariant_eMhLyt("contrast-more", ["@media (prefers-contrast: more)"]),
        registerStaticVariant_eMhLyt("contrast-less", ["@media (prefers-contrast: less)"]);
        {
          let compareBreakpoints_TqCVnT = function (a_AHMFcT, b_DqHfjy, order_pSqmJE, map_zkTMXq) {
            if (a_AHMFcT === b_DqHfjy) return 0;
            let aResolved_ICZkYA = map_zkTMXq.get(a_AHMFcT);
            if (null === aResolved_ICZkYA) return "asc" === order_pSqmJE ? -1 : 1;
            let bResolved_rqlbXS = map_zkTMXq.get(b_DqHfjy);
            return null === bResolved_rqlbXS ? "asc" === order_pSqmJE ? 1 : -1 : compareWithOrder_AnSyON(aResolved_ICZkYA, bResolved_rqlbXS, order_pSqmJE);
          };
          {
            let breakpointNamespace_bOfRCf = config_ZEIZGS.namespace("--breakpoint"),
              breakpointMap_nDbpfJ = new DefaultMap_bDuRsR((entry_VJycGn) => {
                switch (entry_VJycGn.kind) {
                  case "static":
                    return config_ZEIZGS.resolveValue(entry_VJycGn.root, ["--breakpoint"]) ?? null;
                  case "functional":{
                      if (!entry_VJycGn.value || entry_VJycGn.modifier) return null;
                      let resolved_LsPEbA = null;
                      return (
                        "arbitrary" === entry_VJycGn.value.kind ?
                        resolved_LsPEbA = entry_VJycGn.value.value :
                        "named" === entry_VJycGn.value.kind && (
                        resolved_LsPEbA = config_ZEIZGS.resolveValue(entry_VJycGn.value.value, ["--breakpoint"])),
                        !resolved_LsPEbA || resolved_LsPEbA.includes("var(") ? null : resolved_LsPEbA);

                    }
                  case "arbitrary":
                  case "compound":
                    return null;
                }
              });
            variantRegistry_vDXJfe.group(
              () => {
                variantRegistry_vDXJfe.functional(
                  "max",
                  (node_hglolG, args_fkPONd) => {
                    if (args_fkPONd.modifier) return null;
                    let breakpointValue_BdYSGh = breakpointMap_nDbpfJ.get(args_fkPONd);
                    if (null === breakpointValue_BdYSGh) return null;
                    node_hglolG.nodes = [processAtRule_lWgxgY("@media", `(width < ${breakpointValue_BdYSGh})`, node_hglolG.nodes)];
                  },
                  { compounds: 1 }
                );
              },
              (breakpointA_HlDHyZ, breakpointB_SbxIFE) => compareBreakpoints_TqCVnT(breakpointA_HlDHyZ, breakpointB_SbxIFE, "desc", breakpointMap_nDbpfJ)
            ),
            variantRegistry_vDXJfe.suggest("max", () =>
            Array.from(breakpointNamespace_bOfRCf.keys()).filter((maxVariantKey_DfGuzN) => null !== maxVariantKey_DfGuzN)
            ),
            variantRegistry_vDXJfe.group(
              () => {
                for (let [breakpointName_KloUJU, breakpointValue_toaYkW] of config_ZEIZGS.namespace("--breakpoint"))
                null !== breakpointName_KloUJU &&
                variantRegistry_vDXJfe.static(
                  breakpointName_KloUJU,
                  (node_QMIYQu) => {
                    node_QMIYQu.nodes = [processAtRule_lWgxgY("@media", `(width >= ${breakpointValue_toaYkW})`, node_QMIYQu.nodes)];
                  },
                  { compounds: 1 }
                );
                variantRegistry_vDXJfe.functional(
                  "min",
                  (node_FwKSYz, args_SVNLkO) => {
                    if (args_SVNLkO.modifier) return null;
                    let breakpointValue_JrJymU = breakpointMap_nDbpfJ.get(args_SVNLkO);
                    if (null === breakpointValue_JrJymU) return null;
                    node_FwKSYz.nodes = [processAtRule_lWgxgY("@media", `(width >= ${breakpointValue_JrJymU})`, node_FwKSYz.nodes)];
                  },
                  { compounds: 1 }
                );
              },
              (a_LbSdAG, b_wzFdPN) => compareBreakpoints_TqCVnT(a_LbSdAG, b_wzFdPN, "asc", breakpointMap_nDbpfJ)
            ),
            variantRegistry_vDXJfe.suggest("min", () =>
            Array.from(breakpointNamespace_bOfRCf.keys()).filter((key_RKFlYU) => null !== key_RKFlYU)
            );
          }
          {
            let containerNamespace_HwBTsj = config_ZEIZGS.namespace("--container"),
              containerMap_LBLGhT = new DefaultMap_bDuRsR((entry_awhBCz) => {
                switch (entry_awhBCz.kind) {
                  case "functional":{
                      if (null === entry_awhBCz.value) return null;
                      let resolved_fWqXDG = null;
                      return (
                        "arbitrary" === entry_awhBCz.value.kind ?
                        resolved_fWqXDG = entry_awhBCz.value.value :
                        "named" === entry_awhBCz.value.kind && (
                        resolved_fWqXDG = config_ZEIZGS.resolveValue(entry_awhBCz.value.value, ["--container"])),
                        !resolved_fWqXDG || resolved_fWqXDG.includes("var(") ? null : resolved_fWqXDG);

                    }
                  case "static":
                  case "arbitrary":
                  case "compound":
                    return null;
                }
              });
            variantRegistry_vDXJfe.group(
              () => {
                variantRegistry_vDXJfe.functional(
                  "@max",
                  (node_unOYzc, args_wYxVdH) => {
                    let containerValue_sPVDVJ = containerMap_LBLGhT.get(args_wYxVdH);
                    if (null === containerValue_sPVDVJ) return null;
                    node_unOYzc.nodes = [
                    processAtRule_lWgxgY(
                      "@container",
                      args_wYxVdH.modifier ?
                      `${args_wYxVdH.modifier.value} (width < ${containerValue_sPVDVJ})` :
                      `(width < ${containerValue_sPVDVJ})`,
                      node_unOYzc.nodes
                    )];

                  },
                  { compounds: 1 }
                );
              },
              (a_lHmTIa, b_JmMJAM) => compareBreakpoints_TqCVnT(a_lHmTIa, b_JmMJAM, "desc", containerMap_LBLGhT)
            ),
            variantRegistry_vDXJfe.suggest("@max", () =>
            Array.from(containerNamespace_HwBTsj.keys()).filter((key_VexINC) => null !== key_VexINC)
            ),
            variantRegistry_vDXJfe.group(
              () => {
                variantRegistry_vDXJfe.functional(
                  "@",
                  (node_iuDGEs, args_UtTsCs) => {
                    let containerVal_naJfTz = containerMap_LBLGhT.get(args_UtTsCs);
                    if (null === containerVal_naJfTz) return null;
                    node_iuDGEs.nodes = [
                    processAtRule_lWgxgY(
                      "@container",
                      args_UtTsCs.modifier ?
                      `${args_UtTsCs.modifier.value} (width >= ${containerVal_naJfTz})` :
                      `(width >= ${containerVal_naJfTz})`,
                      node_iuDGEs.nodes
                    )];

                  },
                  { compounds: 1 }
                ),
                variantRegistry_vDXJfe.functional(
                  "@min",
                  (node_aPQETl, args_MHZedZ) => {
                    let containerVal_PUKTSo = containerMap_LBLGhT.get(args_MHZedZ);
                    if (null === containerVal_PUKTSo) return null;
                    node_aPQETl.nodes = [
                    processAtRule_lWgxgY(
                      "@container",
                      args_MHZedZ.modifier ?
                      `${args_MHZedZ.modifier.value} (width >= ${containerVal_PUKTSo})` :
                      `(width >= ${containerVal_PUKTSo})`,
                      node_aPQETl.nodes
                    )];

                  },
                  { compounds: 1 }
                );
              },
              (a_auQxxI, b_FsiPLg) => compareBreakpoints_TqCVnT(a_auQxxI, b_FsiPLg, "asc", containerMap_LBLGhT)
            ),
            variantRegistry_vDXJfe.suggest("@min", () =>
            Array.from(containerNamespace_HwBTsj.keys()).filter((key_tlAhAJ) => null !== key_tlAhAJ)
            ),
            variantRegistry_vDXJfe.suggest("@", () =>
            Array.from(containerNamespace_HwBTsj.keys()).filter((key_bTqejI) => null !== key_bTqejI)
            );
          }
        }
        return (
          registerStaticVariant_eMhLyt("portrait", ["@media (orientation: portrait)"]),
          registerStaticVariant_eMhLyt("landscape", ["@media (orientation: landscape)"]),
          registerStaticVariant_eMhLyt("ltr", ['&:where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)']),
          registerStaticVariant_eMhLyt("rtl", ['&:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)']),
          registerStaticVariant_eMhLyt("dark", ["@media (prefers-color-scheme: dark)"]),
          registerStaticVariant_eMhLyt("starting", ["@starting-style"]),
          registerStaticVariant_eMhLyt("print", ["@media print"]),
          registerStaticVariant_eMhLyt("forced-colors", ["@media (forced-colors: active)"]),
          registerStaticVariant_eMhLyt("inverted-colors", ["@media (inverted-colors: inverted)"]),
          registerStaticVariant_eMhLyt("pointer-none", ["@media (pointer: none)"]),
          registerStaticVariant_eMhLyt("pointer-coarse", ["@media (pointer: coarse)"]),
          registerStaticVariant_eMhLyt("pointer-fine", ["@media (pointer: fine)"]),
          registerStaticVariant_eMhLyt("any-pointer-none", ["@media (any-pointer: none)"]),
          registerStaticVariant_eMhLyt("any-pointer-coarse", ["@media (any-pointer: coarse)"]),
          registerStaticVariant_eMhLyt("any-pointer-fine", ["@media (any-pointer: fine)"]),
          registerStaticVariant_eMhLyt("noscript", ["@media (scripting: none)"]),
          variantRegistry_vDXJfe);

      }(themeData_dCZPaX),
      variantParseMap_dvxrNs = new DefaultMap_bDuRsR((input_SdNlMk) =>
      function (input_sJEwwu, ctx_sRARaB) {
        if ("[" === input_sJEwwu[0] && "]" === input_sJEwwu[input_sJEwwu.length - 1]) {
          if ("@" === input_sJEwwu[1] && input_sJEwwu.includes("&")) return null;
          let expr_oiwBsp = fixFunctionSpacing_FixkVT(input_sJEwwu.slice(1, -1));
          if (!checkBracketsBalanced_ewuhFR(expr_oiwBsp) || 0 === expr_oiwBsp.length || 0 === expr_oiwBsp.trim().length) return null;
          let relative_rPjbjw = ">" === expr_oiwBsp[0] || "+" === expr_oiwBsp[0] || "~" === expr_oiwBsp[0];
          return (
            !relative_rPjbjw && "@" !== expr_oiwBsp[0] && !expr_oiwBsp.includes("&") && (expr_oiwBsp = `&:is(${expr_oiwBsp})`),
            { kind: "arbitrary", selector: expr_oiwBsp, relative: relative_rPjbjw });

        }
        {
          let [part_gHIpPE, modifier_Sbaqdy = null, maybeMore_oryhut] = splitOnTopLevel_EfBwUv(input_sJEwwu, "/");
          if (maybeMore_oryhut) return null;
          let parsed_pldbNp = yieldDashSplits_LQETCA(part_gHIpPE, (variantNameCandidate_NAgHjW) => ctx_sRARaB.variants.has(variantNameCandidate_NAgHjW));
          for (let [root_HggjLS, value_SimoBa] of parsed_pldbNp)
          switch (ctx_sRARaB.variants.kind(root_HggjLS)) {
            case "static":
              return null !== value_SimoBa || null !== modifier_Sbaqdy ?
              null :
              { kind: "static", root: root_HggjLS };
            case "functional":{
                let modifierResult_yQqDZq = null === modifier_Sbaqdy ? null : parseArbitraryValue_XsMbou(modifier_Sbaqdy);
                if (null !== modifier_Sbaqdy && null === modifierResult_yQqDZq) return null;
                if (null === value_SimoBa)
                return {
                  kind: "functional",
                  root: root_HggjLS,
                  modifier: modifierResult_yQqDZq,
                  value: null
                };
                if ("]" === value_SimoBa[value_SimoBa.length - 1]) {
                  if ("[" !== value_SimoBa[0]) continue;
                  let arbitraryValue_mjgvUX = fixFunctionSpacing_FixkVT(value_SimoBa.slice(1, -1));
                  return checkBracketsBalanced_ewuhFR(arbitraryValue_mjgvUX) && 0 !== arbitraryValue_mjgvUX.length && 0 !== arbitraryValue_mjgvUX.trim().length ?
                  {
                    kind: "functional",
                    root: root_HggjLS,
                    modifier: modifierResult_yQqDZq,
                    value: { kind: "arbitrary", value: arbitraryValue_mjgvUX }
                  } :
                  null;
                }
                if (")" === value_SimoBa[value_SimoBa.length - 1]) {
                  if ("(" !== value_SimoBa[0]) continue;
                  let varValue_KmMGsZ = fixFunctionSpacing_FixkVT(value_SimoBa.slice(1, -1));
                  return !checkBracketsBalanced_ewuhFR(varValue_KmMGsZ) ||
                  0 === varValue_KmMGsZ.length ||
                  0 === varValue_KmMGsZ.trim().length ||
                  "-" !== varValue_KmMGsZ[0] && "-" !== varValue_KmMGsZ[1] ?
                  null :
                  {
                    kind: "functional",
                    root: root_HggjLS,
                    modifier: modifierResult_yQqDZq,
                    value: { kind: "arbitrary", value: `var(${varValue_KmMGsZ})` }
                  };
                }
                return {
                  kind: "functional",
                  root: root_HggjLS,
                  modifier: modifierResult_yQqDZq,
                  value: { kind: "named", value: value_SimoBa }
                };
              }
            case "compound":{
                if (null === value_SimoBa) return null;
                let compoundVal_stiRuP = ctx_sRARaB.parseVariant(value_SimoBa);
                if (null === compoundVal_stiRuP || !ctx_sRARaB.variants.compoundsWith(root_HggjLS, compoundVal_stiRuP))
                return null;
                let modifierResult_vzAywI = null === modifier_Sbaqdy ? null : parseArbitraryValue_XsMbou(modifier_Sbaqdy);
                return null !== modifier_Sbaqdy && null === modifierResult_vzAywI ?
                null :
                { kind: "compound", root: root_HggjLS, modifier: modifierResult_vzAywI, variant: compoundVal_stiRuP };
              }
          }
        }
        return null;
      }(input_SdNlMk, runtimeContext_qJxRwz)
      ),
      candidateParseMap_oKHMKP = new DefaultMap_bDuRsR((input_xXxQOV) =>
      Array.from(
        function* (rawInput_JZjeYP, ctx_ABlJsb) {
          let prefix = tailwind.config?.prefix;
          let outprefix = prefix?.startsWith('.');
          if (!outprefix && prefix && !rawInput_JZjeYP.startsWith(prefix)) return null;
          else if (!outprefix && prefix) rawInput_JZjeYP = rawInput_JZjeYP.slice(prefix.length);
          let parts_beNzyf = splitOnTopLevel_EfBwUv(rawInput_JZjeYP, ":");
          if (ctx_ABlJsb.theme.prefix) {
            if (1 === parts_beNzyf.length || parts_beNzyf[0] !== ctx_ABlJsb.theme.prefix) return null;
            parts_beNzyf.shift();
          }
          let utility_vEDROf = parts_beNzyf.pop(),
            variants_LArEKp = [];
          for (let i_BvGqXf = parts_beNzyf.length - 1; i_BvGqXf >= 0; --i_BvGqXf) {
            let variantVal_nOzidw = ctx_ABlJsb.parseVariant(parts_beNzyf[i_BvGqXf]);
            if (null === variantVal_nOzidw) return;
            variants_LArEKp.push(variantVal_nOzidw);
          }
          let important_sEgNFB = !1;
          "!" === utility_vEDROf[utility_vEDROf.length - 1] ? (
          important_sEgNFB = !0, utility_vEDROf = utility_vEDROf.slice(0, -1)) :
          "!" === utility_vEDROf[0] && (important_sEgNFB = !0, utility_vEDROf = utility_vEDROf.slice(1)),
          ctx_ABlJsb.utilities.has(utility_vEDROf, "static") &&
          !utility_vEDROf.includes("[") && (
          yield {
            kind: "static",
            root: utility_vEDROf,
            variants: variants_LArEKp,
            important: important_sEgNFB,
            raw: rawInput_JZjeYP
          });
          let [base_ftqAjV, modifier_kasVCz = null, maybeMore_PObhbL] = splitOnTopLevel_EfBwUv(utility_vEDROf, "/");
          if (maybeMore_PObhbL) return;
          let functionalUtilityTuples_wHfhlm,
            modifierResult_kWZWqz = null === modifier_kasVCz ? null : parseArbitraryValue_XsMbou(modifier_kasVCz);
          if (null === modifier_kasVCz || null !== modifierResult_kWZWqz)
          if ("[" !== base_ftqAjV[0]) {
            if ("]" === base_ftqAjV[base_ftqAjV.length - 1]) {
              let arbitraryIdx_EEtrBg = base_ftqAjV.indexOf("-[");
              if (-1 === arbitraryIdx_EEtrBg) return;
              let baseName_AOLGZI = base_ftqAjV.slice(0, arbitraryIdx_EEtrBg);
              if (!ctx_ABlJsb.utilities.has(baseName_AOLGZI, "functional")) return;
              functionalUtilityTuples_wHfhlm = [[baseName_AOLGZI, base_ftqAjV.slice(arbitraryIdx_EEtrBg + 1)]];
            } else if (")" === base_ftqAjV[base_ftqAjV.length - 1]) {
              let parenIdx_ZgDKDd = base_ftqAjV.indexOf("-(");
              if (-1 === parenIdx_ZgDKDd) return;
              let baseName_PmlQYP = base_ftqAjV.slice(0, parenIdx_ZgDKDd);
              if (!ctx_ABlJsb.utilities.has(baseName_PmlQYP, "functional")) return;
              let varContent_fHExWs = base_ftqAjV.slice(parenIdx_ZgDKDd + 2, -1),
                maybeFractionParts_mpjPdf = splitOnTopLevel_EfBwUv(varContent_fHExWs, ":"),
                fraction_SSDwos = null;
              if (
              2 === maybeFractionParts_mpjPdf.length && (fraction_SSDwos = maybeFractionParts_mpjPdf[0], varContent_fHExWs = maybeFractionParts_mpjPdf[1]),
              "-" !== varContent_fHExWs[0] && "-" !== varContent_fHExWs[1])

              return;
              functionalUtilityTuples_wHfhlm = [[baseName_PmlQYP, null === fraction_SSDwos ? `[var(${varContent_fHExWs})]` : `[${fraction_SSDwos}:var(${varContent_fHExWs})]`]];
            } else functionalUtilityTuples_wHfhlm = yieldDashSplits_LQETCA(base_ftqAjV, (utilityNameCandidate_Vsuiza) => ctx_ABlJsb.utilities.has(utilityNameCandidate_Vsuiza, "functional"));
            for (let [root_apLeWe, value_NCdGaA] of functionalUtilityTuples_wHfhlm) {
              let ruleObj_yziQwD = {
                kind: "functional",
                root: root_apLeWe,
                modifier: modifierResult_kWZWqz,
                value: null,
                variants: variants_LArEKp,
                important: important_sEgNFB,
                raw: rawInput_JZjeYP
              };
              if (null !== value_NCdGaA) {
                {
                  let arbitraryIndex_JitetH = value_NCdGaA.indexOf("[");
                  if (-1 !== arbitraryIndex_JitetH) {
                    if ("]" !== value_NCdGaA[value_NCdGaA.length - 1]) return;
                    let arbitraryValue_igvPQh = fixFunctionSpacing_FixkVT(value_NCdGaA.slice(arbitraryIndex_JitetH + 1, -1));
                    if (!checkBracketsBalanced_ewuhFR(arbitraryValue_igvPQh)) continue;
                    let dataType_pMGCcz = "";
                    for (let j_gXxNcN = 0; j_gXxNcN < arbitraryValue_igvPQh.length; j_gXxNcN++) {
                      let chCode_YtdqSA = arbitraryValue_igvPQh.charCodeAt(j_gXxNcN);
                      if (58 === chCode_YtdqSA) {
                        dataType_pMGCcz = arbitraryValue_igvPQh.slice(0, j_gXxNcN), arbitraryValue_igvPQh = arbitraryValue_igvPQh.slice(j_gXxNcN + 1);
                        break;
                      }
                      if (!(45 === chCode_YtdqSA || chCode_YtdqSA >= 97 && chCode_YtdqSA <= 122)) break;
                    }
                    if (0 === arbitraryValue_igvPQh.length || 0 === arbitraryValue_igvPQh.trim().length) continue;
                    ruleObj_yziQwD.value = {
                      kind: "arbitrary",
                      dataType: dataType_pMGCcz || null,
                      value: arbitraryValue_igvPQh
                    };
                  } else {
                    let fractionOfModifier_wKQYfv =
                    null === modifier_kasVCz || "arbitrary" === ruleObj_yziQwD.modifier?.kind ?
                    null :
                    `${value_NCdGaA}/${modifier_kasVCz}`;
                    ruleObj_yziQwD.value = { kind: "named", value: value_NCdGaA, fraction: fractionOfModifier_wKQYfv };
                  }
                }
                yield ruleObj_yziQwD;
              } else yield ruleObj_yziQwD;
            }
          } else {
            if ("]" !== base_ftqAjV[base_ftqAjV.length - 1]) return;
            let code1_XGuEWW = base_ftqAjV.charCodeAt(1);
            if (45 !== code1_XGuEWW && !(code1_XGuEWW >= 97 && code1_XGuEWW <= 122)) return;
            base_ftqAjV = base_ftqAjV.slice(1, -1);
            let colonIdx_RjhRGT = base_ftqAjV.indexOf(":");
            if (-1 === colonIdx_RjhRGT || 0 === colonIdx_RjhRGT || colonIdx_RjhRGT === base_ftqAjV.length - 1) return;
            let property_hkdcSi = base_ftqAjV.slice(0, colonIdx_RjhRGT),
              propertyValue_SiUkAT = fixFunctionSpacing_FixkVT(base_ftqAjV.slice(colonIdx_RjhRGT + 1));
            if (!checkBracketsBalanced_ewuhFR(propertyValue_SiUkAT)) return;
            yield {
              kind: "arbitrary",
              property: property_hkdcSi,
              value: propertyValue_SiUkAT,
              modifier: modifierResult_kWZWqz,
              variants: variants_LArEKp,
              important: important_sEgNFB,
              raw: rawInput_JZjeYP
            };
          }
        }(input_xXxQOV, runtimeContext_qJxRwz)
      )
      ),
      compileAstMap_VhLuXK = new DefaultMap_bDuRsR((ruleObj_VAuDfr) => {
        let compileRule_MnhpkI = function (ruleObj_VMQMFL, runtimeContext_HXYsrF) {
          let relevantUtilityMatches_reIQem = function (utilityRuleObj_RoGokM, utilityRuntimeContext_roijbx) {
            if ("arbitrary" === utilityRuleObj_RoGokM.kind) {
              let utilityValueWithOpacity_CmBwfy = utilityRuleObj_RoGokM.value;
              return (
                utilityRuleObj_RoGokM.modifier && (utilityValueWithOpacity_CmBwfy = applyOpacityToColor_qFFjzR(utilityValueWithOpacity_CmBwfy, utilityRuleObj_RoGokM.modifier, utilityRuntimeContext_roijbx.theme)),
                null === utilityValueWithOpacity_CmBwfy ? [] : [[makeDeclarationNode_xYlaTt(utilityRuleObj_RoGokM.property, utilityValueWithOpacity_CmBwfy)]]);

            }
            let utilityVariants_nKMrqt = utilityRuntimeContext_roijbx.utilities.get(utilityRuleObj_RoGokM.root) ?? [],
              compiledNodes_OuqAho = [],
              nonWildcardUtilities_XGswkM = utilityVariants_nKMrqt.filter((utilityObj_xjyttE) => !isWildcardTypeUtility_OuxkQi(utilityObj_xjyttE));
            for (let utilityCandidate_qdTBiN of nonWildcardUtilities_XGswkM) {
              if (utilityCandidate_qdTBiN.kind !== utilityRuleObj_RoGokM.kind) continue;
              let utilityCompileResult_KLIHTt = utilityCandidate_qdTBiN.compileFn(utilityRuleObj_RoGokM);
              if (void 0 !== utilityCompileResult_KLIHTt) {
                if (null === utilityCompileResult_KLIHTt) return compiledNodes_OuqAho;
                compiledNodes_OuqAho.push(utilityCompileResult_KLIHTt);
              }
            }
            if (compiledNodes_OuqAho.length > 0) return compiledNodes_OuqAho;
            let wildcardUtilities_cHYysj = utilityVariants_nKMrqt.filter((wildcardUtilityCandidateObj_jBbvSl) => isWildcardTypeUtility_OuxkQi(wildcardUtilityCandidateObj_jBbvSl));
            for (let wildcardUtilityCandidate_TECzzT of wildcardUtilities_cHYysj) {
              if (wildcardUtilityCandidate_TECzzT.kind !== utilityRuleObj_RoGokM.kind) continue;
              let wildcardUtilityCompileResult_BNLIJs = wildcardUtilityCandidate_TECzzT.compileFn(utilityRuleObj_RoGokM);
              if (void 0 !== wildcardUtilityCompileResult_BNLIJs) {
                if (null === wildcardUtilityCompileResult_BNLIJs) return compiledNodes_OuqAho;
                compiledNodes_OuqAho.push(wildcardUtilityCompileResult_BNLIJs);
              }
            }
            return compiledNodes_OuqAho;
          }(ruleObj_VMQMFL, runtimeContext_HXYsrF);
          if (0 === relevantUtilityMatches_reIQem.length) return [];
          let prefix = tailwind.config?.prefix;
          let outprefix = prefix?.startsWith('.');
          let compiledResults_CCMbrZ = [],
            cssClassSelector_zJiVnM = (outprefix ? prefix : '') + `.${cssEscape_aDBdYz((!outprefix && prefix ? prefix : '') + ruleObj_VMQMFL.raw)}`;
          for (let resultNodeList_kKoGvq of relevantUtilityMatches_reIQem) {
            let propertySortOrder_lmpphp = collectPropertySorting_qOTWaZ(resultNodeList_kKoGvq);
            (ruleObj_VMQMFL.important || runtimeContext_HXYsrF.important) && markDeclarationsImportant_QjLUQq(resultNodeList_kKoGvq);
            let selectorRuleNode_VvdbjS = { kind: "rule", selector: cssClassSelector_zJiVnM, nodes: resultNodeList_kKoGvq };
            for (let variantObj_voNRyo of ruleObj_VMQMFL.variants)
            if (null === applyVariant_avuaSo(selectorRuleNode_VvdbjS, variantObj_voNRyo, runtimeContext_HXYsrF.variants)) return [];
            compiledResults_CCMbrZ.push({ node: selectorRuleNode_VvdbjS, propertySort: propertySortOrder_lmpphp });
          }
          return compiledResults_CCMbrZ;
        }(ruleObj_VAuDfr, runtimeContext_qJxRwz);
        try {
          evaluateThemeFunctions_XAqelQ(
            compileRule_MnhpkI.map(({ node: node_KsoHTA }) => node_KsoHTA),
            runtimeContext_qJxRwz
          );
        } catch {
          return [];
        }
        return compileRule_MnhpkI;
      }),
      trackUsedVarMap_IjNXix = new DefaultMap_bDuRsR((value_blepfa) => {
        for (let v_lsQcEy of extractVarFunctions_UtccmO(value_blepfa)) themeData_dCZPaX.markUsedVariable(v_lsQcEy);
      }),
      runtimeContext_qJxRwz = {
        theme: themeData_dCZPaX,
        utilities: registerCoreUtilities_tgdQGQ,
        variants: variantRegistryFactory_DVdnzp,
        invalidCandidates: new Set(),
        important: !1,
        candidatesToCss(classes_smZNlW) {
          let results_jubCew = [];
          for (let className_fiNHEG of classes_smZNlW) {
            let invalid_TqJwaa = !1,
              { astNodes: astNodes_AasJSp } = resolveCandidatesToAst_xoVMHU([className_fiNHEG], this, {
                onInvalidCandidate() {
                  invalid_TqJwaa = !0;
                }
              });
            astNodes_AasJSp = collectStyleData_TDFsgx(astNodes_AasJSp, runtimeContext_qJxRwz, 0), 0 === astNodes_AasJSp.length || invalid_TqJwaa ? results_jubCew.push(null) : results_jubCew.push(astNodesToCss_kEgwyH(astNodes_AasJSp));
          }
          return results_jubCew;
        },
        getClassOrder(classList_XAOigi) {
          return function (ctx_kTKynw, classList_EbdgOk) {
            let { astNodes: astNodes_yYXNoa, nodeSorting: sortingMap_uvChMy } = resolveCandidatesToAst_xoVMHU(Array.from(classList_EbdgOk), ctx_kTKynw),
              orderMap_pruyed = new Map(classList_EbdgOk.map((className_buhSkX) => [className_buhSkX, null])),
              orderCounter_ENKcIq = 0n;
            for (let node_MVDNfE of astNodes_yYXNoa) {
              let candidate_dzHnVa = sortingMap_uvChMy.get(node_MVDNfE)?.candidate;
              candidate_dzHnVa && orderMap_pruyed.set(candidate_dzHnVa, orderMap_pruyed.get(candidate_dzHnVa) ?? orderCounter_ENKcIq++);
            }
            return classList_EbdgOk.map((className_ZJfXjx) => [className_ZJfXjx, orderMap_pruyed.get(className_ZJfXjx) ?? null]);
          }(this, classList_XAOigi);
        },
        getClassList() {
          return generateUtilityGroups_MKErBh(this);
        },
        getVariants() {
          return function (ctx_rbzDSi) {
            let variantArr_yDntat = [];
            for (let [name_tvsARi, variantObj_fwTtdl] of ctx_rbzDSi.variants.entries()) {
              let getSelectors_mlnnPy = function ({ value: value_sGBQiZ, modifier: modifier_VbIQYz } = {}) {
                let variantStr_MqQqQm = name_tvsARi;
                value_sGBQiZ && (variantStr_MqQqQm += hasDash_kIbXRL ? `-${value_sGBQiZ}` : value_sGBQiZ), modifier_VbIQYz && (variantStr_MqQqQm += `/${modifier_VbIQYz}`);
                let variant_ExoQIQ = ctx_rbzDSi.parseVariant(variantStr_MqQqQm);
                if (!variant_ExoQIQ) return [];
                let rootNode_HcDplz = makeRuleNode_PDClCj(".__placeholder__", []);
                if (null === applyVariant_avuaSo(rootNode_HcDplz, variant_ExoQIQ, ctx_rbzDSi.variants)) return [];
                let selectorArr_aPeCVX = [];
                return (
                  walkFlatAST_ZsjfLR(rootNode_HcDplz.nodes, (node_TuHIlv, { path: path_oeyHsW }) => {
                    if (
                    "rule" !== node_TuHIlv.kind && "at-rule" !== node_TuHIlv.kind ||
                    node_TuHIlv.nodes.length > 0)

                    return;
                    path_oeyHsW.sort((a_EPwQpC, b_dXvYPe) => {
                      let aIsAtRule_NGfaJA = "at-rule" === a_EPwQpC.kind,
                        bIsAtRule_aSmcfF = "at-rule" === b_dXvYPe.kind;
                      return aIsAtRule_NGfaJA && !bIsAtRule_aSmcfF ? -1 : !aIsAtRule_NGfaJA && bIsAtRule_aSmcfF ? 1 : 0;
                    });
                    let selectors_kOzexm = path_oeyHsW.flatMap((node_XNuIhD) =>
                      "rule" === node_XNuIhD.kind ?
                      "&" === node_XNuIhD.selector ?
                      [] :
                      [node_XNuIhD.selector] :
                      "at-rule" === node_XNuIhD.kind ?
                      [`${node_XNuIhD.name} ${node_XNuIhD.params}`] :
                      []
                      ),
                      selectorString_LuNTJN = "";
                    for (let i_QefXOq = selectors_kOzexm.length - 1; i_QefXOq >= 0; i_QefXOq--)
                    selectorString_LuNTJN = "" === selectorString_LuNTJN ? selectors_kOzexm[i_QefXOq] : `${selectors_kOzexm[i_QefXOq]} { ${selectorString_LuNTJN} }`;
                    selectorArr_aPeCVX.push(selectorString_LuNTJN);
                  }),
                  selectorArr_aPeCVX);

              };
              if ("arbitrary" === variantObj_fwTtdl.kind) continue;
              let hasDash_kIbXRL = "@" !== name_tvsARi,
                values_fknvmX = ctx_rbzDSi.variants.getCompletions(name_tvsARi);
              switch (variantObj_fwTtdl.kind) {
                case "static":
                  variantArr_yDntat.push({
                    name: name_tvsARi,
                    values: values_fknvmX,
                    isArbitrary: !1,
                    hasDash: hasDash_kIbXRL,
                    selectors: getSelectors_mlnnPy
                  });
                  break;
                case "functional":
                case "compound":
                  variantArr_yDntat.push({
                    name: name_tvsARi,
                    values: values_fknvmX,
                    isArbitrary: !0,
                    hasDash: hasDash_kIbXRL,
                    selectors: getSelectors_mlnnPy
                  });
              }
            }
            return variantArr_yDntat;
          }(this);
        },
        parseCandidate: (candidateInput_XMqKnH) => candidateParseMap_oKHMKP.get(candidateInput_XMqKnH),
        parseVariant: (variantStr_PzLvzm) => variantParseMap_dvxrNs.get(variantStr_PzLvzm),
        compileAstNodes: (astNodes_Lksrar) => compileAstMap_VhLuXK.get(astNodes_Lksrar),
        getVariantOrder() {
          let allVariants_QuPfQK = Array.from(variantParseMap_dvxrNs.values());
          allVariants_QuPfQK.sort((a_yEiFUd, b_YynHrj) => this.variants.compare(a_yEiFUd, b_YynHrj));
          let lastVariant_vTKGqE,
            orderMap_UzvwSV = new Map(),
            currentOrder_LLqGyg = 0;
          for (let variant_lEJJWi of allVariants_QuPfQK)
          null !== variant_lEJJWi && (
          void 0 !== lastVariant_vTKGqE && 0 !== this.variants.compare(lastVariant_vTKGqE, variant_lEJJWi) && currentOrder_LLqGyg++,
          orderMap_UzvwSV.set(variant_lEJJWi, currentOrder_LLqGyg),
          lastVariant_vTKGqE = variant_lEJJWi);
          return orderMap_UzvwSV;
        },
        resolveThemeValue(themeKey_pPqses, resolveVar_ROwQdJ = !0) {
          let slashIdx_nHhnHf = themeKey_pPqses.lastIndexOf("/"),
            modifier_PqhaZm = null;
          -1 !== slashIdx_nHhnHf && (modifier_PqhaZm = themeKey_pPqses.slice(slashIdx_nHhnHf + 1).trim(), themeKey_pPqses = themeKey_pPqses.slice(0, slashIdx_nHhnHf).trim());
          let val_EIuSWD = themeData_dCZPaX.resolve(null, [themeKey_pPqses], resolveVar_ROwQdJ ? 1 : 0) ?? void 0;
          return modifier_PqhaZm && val_EIuSWD ? colorWithOpacityValue_xdDGmk(val_EIuSWD, modifier_PqhaZm) : val_EIuSWD;
        },
        trackUsedVariables(className_XUUckb) {
          trackUsedVarMap_IjNXix.get(className_XUUckb);
        }
      };
    return runtimeContext_qJxRwz;
  }
  var propertySortOrder_nRolHg = [
  "container-type",
  "pointer-events",
  "visibility",
  "position",
  "inset",
  "inset-inline",
  "inset-block",
  "inset-inline-start",
  "inset-inline-end",
  "top",
  "right",
  "bottom",
  "left",
  "isolation",
  "z-index",
  "order",
  "grid-column",
  "grid-column-start",
  "grid-column-end",
  "grid-row",
  "grid-row-start",
  "grid-row-end",
  "float",
  "clear",
  "--tw-container-component",
  "margin",
  "margin-inline",
  "margin-block",
  "margin-inline-start",
  "margin-inline-end",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "box-sizing",
  "display",
  "field-sizing",
  "aspect-ratio",
  "height",
  "max-height",
  "min-height",
  "width",
  "max-width",
  "min-width",
  "flex",
  "flex-shrink",
  "flex-grow",
  "flex-basis",
  "table-layout",
  "caption-side",
  "border-collapse",
  "border-spacing",
  "transform-origin",
  "translate",
  "--tw-translate-x",
  "--tw-translate-y",
  "--tw-translate-z",
  "scale",
  "--tw-scale-x",
  "--tw-scale-y",
  "--tw-scale-z",
  "rotate",
  "--tw-rotate-x",
  "--tw-rotate-y",
  "--tw-rotate-z",
  "--tw-skew-x",
  "--tw-skew-y",
  "transform",
  "animation",
  "cursor",
  "touch-action",
  "--tw-pan-x",
  "--tw-pan-y",
  "--tw-pinch-zoom",
  "resize",
  "scroll-snap-type",
  "--tw-scroll-snap-strictness",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-margin",
  "scroll-margin-inline",
  "scroll-margin-block",
  "scroll-margin-inline-start",
  "scroll-margin-inline-end",
  "scroll-margin-top",
  "scroll-margin-right",
  "scroll-margin-bottom",
  "scroll-margin-left",
  "scroll-padding",
  "scroll-padding-inline",
  "scroll-padding-block",
  "scroll-padding-inline-start",
  "scroll-padding-inline-end",
  "scroll-padding-top",
  "scroll-padding-right",
  "scroll-padding-bottom",
  "scroll-padding-left",
  "list-style-position",
  "list-style-type",
  "list-style-image",
  "appearance",
  "columns",
  "break-before",
  "break-inside",
  "break-after",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-template-columns",
  "grid-template-rows",
  "flex-direction",
  "flex-wrap",
  "place-content",
  "place-items",
  "align-content",
  "align-items",
  "justify-content",
  "justify-items",
  "gap",
  "column-gap",
  "row-gap",
  "--tw-space-x-reverse",
  "--tw-space-y-reverse",
  "divide-x-width",
  "divide-y-width",
  "--tw-divide-y-reverse",
  "divide-style",
  "divide-color",
  "place-self",
  "align-self",
  "justify-self",
  "overflow",
  "overflow-x",
  "overflow-y",
  "overscroll-behavior",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "scroll-behavior",
  "border-radius",
  "border-start-radius",
  "border-end-radius",
  "border-top-radius",
  "border-right-radius",
  "border-bottom-radius",
  "border-left-radius",
  "border-start-start-radius",
  "border-start-end-radius",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "border-width",
  "border-inline-width",
  "border-block-width",
  "border-inline-start-width",
  "border-inline-end-width",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "border-style",
  "border-inline-style",
  "border-block-style",
  "border-inline-start-style",
  "border-inline-end-style",
  "border-top-style",
  "border-right-style",
  "border-bottom-style",
  "border-left-style",
  "border-color",
  "border-inline-color",
  "border-block-color",
  "border-inline-start-color",
  "border-inline-end-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "background-color",
  "background-image",
  "--tw-gradient-position",
  "--tw-gradient-stops",
  "--tw-gradient-via-stops",
  "--tw-gradient-from",
  "--tw-gradient-from-position",
  "--tw-gradient-via",
  "--tw-gradient-via-position",
  "--tw-gradient-to",
  "--tw-gradient-to-position",
  "mask-image",
  "--tw-mask-top",
  "--tw-mask-top-from-color",
  "--tw-mask-top-from-position",
  "--tw-mask-top-to-color",
  "--tw-mask-top-to-position",
  "--tw-mask-right",
  "--tw-mask-right-from-color",
  "--tw-mask-right-from-position",
  "--tw-mask-right-to-color",
  "--tw-mask-right-to-position",
  "--tw-mask-bottom",
  "--tw-mask-bottom-from-color",
  "--tw-mask-bottom-from-position",
  "--tw-mask-bottom-to-color",
  "--tw-mask-bottom-to-position",
  "--tw-mask-left",
  "--tw-mask-left-from-color",
  "--tw-mask-left-from-position",
  "--tw-mask-left-to-color",
  "--tw-mask-left-to-position",
  "--tw-mask-linear",
  "--tw-mask-linear-position",
  "--tw-mask-linear-from-color",
  "--tw-mask-linear-from-position",
  "--tw-mask-linear-to-color",
  "--tw-mask-linear-to-position",
  "--tw-mask-radial",
  "--tw-mask-radial-shape",
  "--tw-mask-radial-size",
  "--tw-mask-radial-position",
  "--tw-mask-radial-from-color",
  "--tw-mask-radial-from-position",
  "--tw-mask-radial-to-color",
  "--tw-mask-radial-to-position",
  "--tw-mask-conic",
  "--tw-mask-conic-position",
  "--tw-mask-conic-from-color",
  "--tw-mask-conic-from-position",
  "--tw-mask-conic-to-color",
  "--tw-mask-conic-to-position",
  "box-decoration-break",
  "background-size",
  "background-attachment",
  "background-clip",
  "background-position",
  "background-repeat",
  "background-origin",
  "mask-composite",
  "mask-mode",
  "mask-type",
  "mask-size",
  "mask-clip",
  "mask-position",
  "mask-repeat",
  "mask-origin",
  "fill",
  "stroke",
  "stroke-width",
  "object-fit",
  "object-position",
  "padding",
  "padding-inline",
  "padding-block",
  "padding-inline-start",
  "padding-inline-end",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "text-align",
  "text-indent",
  "vertical-align",
  "font-family",
  "font-size",
  "line-height",
  "font-weight",
  "letter-spacing",
  "text-wrap",
  "overflow-wrap",
  "word-break",
  "text-overflow",
  "hyphens",
  "white-space",
  "color",
  "text-transform",
  "font-style",
  "font-stretch",
  "font-variant-numeric",
  "text-decoration-line",
  "text-decoration-color",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-underline-offset",
  "-webkit-font-smoothing",
  "placeholder-color",
  "caret-color",
  "accent-color",
  "color-scheme",
  "opacity",
  "background-blend-mode",
  "mix-blend-mode",
  "box-shadow",
  "--tw-shadow",
  "--tw-shadow-color",
  "--tw-ring-shadow",
  "--tw-ring-color",
  "--tw-inset-shadow",
  "--tw-inset-shadow-color",
  "--tw-inset-ring-shadow",
  "--tw-inset-ring-color",
  "--tw-ring-offset-width",
  "--tw-ring-offset-color",
  "outline",
  "outline-width",
  "outline-offset",
  "outline-color",
  "--tw-blur",
  "--tw-brightness",
  "--tw-contrast",
  "--tw-drop-shadow",
  "--tw-grayscale",
  "--tw-hue-rotate",
  "--tw-invert",
  "--tw-saturate",
  "--tw-sepia",
  "filter",
  "--tw-backdrop-blur",
  "--tw-backdrop-brightness",
  "--tw-backdrop-contrast",
  "--tw-backdrop-grayscale",
  "--tw-backdrop-hue-rotate",
  "--tw-backdrop-invert",
  "--tw-backdrop-opacity",
  "--tw-backdrop-saturate",
  "--tw-backdrop-sepia",
  "backdrop-filter",
  "transition-property",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-timing-function",
  "will-change",
  "contain",
  "content",
  "forced-color-adjust"];

  function resolveCandidatesToAst_xoVMHU(candidates_tfvDGB, ctx_LAQMoh, { onInvalidCandidate: onInvalidCandidate_KpciXm } = {}) {
    let astNodeToMeta_qvTFJm = new Map(),
      astNodeList_MPTWnw = [],
      classToParsed_XXroML = new Map();
    for (let className_mFxveG of candidates_tfvDGB) {
      if (ctx_LAQMoh.invalidCandidates.has(className_mFxveG)) {
        onInvalidCandidate_KpciXm?.(className_mFxveG);
        continue;
      }
      let parsed_PyzvVl = ctx_LAQMoh.parseCandidate(className_mFxveG);
      0 !== parsed_PyzvVl.length ? classToParsed_XXroML.set(className_mFxveG, parsed_PyzvVl) : onInvalidCandidate_KpciXm?.(className_mFxveG);
    }
    let variantOrderMap_CbIQdA = ctx_LAQMoh.getVariantOrder();
    for (let [className_qUAQTL, parsedArr_xsoWrr] of classToParsed_XXroML) {
      let foundValid_YYkKZJ = !1;
      for (let parsed_hoBWLM of parsedArr_xsoWrr) {
        let compiledArr_SfdduN = ctx_LAQMoh.compileAstNodes(parsed_hoBWLM);
        if (0 !== compiledArr_SfdduN.length) {
          foundValid_YYkKZJ = !0;
          for (let { node: astNode_HPyZBW, propertySort: propertySorting_GAHCNk } of compiledArr_SfdduN) {
            let variantMask_vGyrlV = 0n;
            for (let variant_HopGnV of parsed_hoBWLM.variants) variantMask_vGyrlV |= 1n << BigInt(variantOrderMap_CbIQdA.get(variant_HopGnV));
            astNodeToMeta_qvTFJm.set(astNode_HPyZBW, { properties: propertySorting_GAHCNk, variants: variantMask_vGyrlV, candidate: className_qUAQTL }), astNodeList_MPTWnw.push(astNode_HPyZBW);
          }
        }
      }
      foundValid_YYkKZJ || onInvalidCandidate_KpciXm?.(className_qUAQTL);
    }
    return (
      astNodeList_MPTWnw.sort((a_DdZYzb, b_DyfbMu) => {
        let aMeta_xRVZaD = astNodeToMeta_qvTFJm.get(a_DdZYzb),
          bMeta_mWNosZ = astNodeToMeta_qvTFJm.get(b_DyfbMu);
        if (aMeta_xRVZaD.variants - bMeta_mWNosZ.variants !== 0n)
        return Number(aMeta_xRVZaD.variants - bMeta_mWNosZ.variants);
        let i_khZrBO = 0;
        for (;

        i_khZrBO < aMeta_xRVZaD.properties.order.length &&
        i_khZrBO < bMeta_mWNosZ.properties.order.length &&
        aMeta_xRVZaD.properties.order[i_khZrBO] === bMeta_mWNosZ.properties.order[i_khZrBO];)


        i_khZrBO += 1;
        return (
          (aMeta_xRVZaD.properties.order[i_khZrBO] ?? 1 / 0) - (bMeta_mWNosZ.properties.order[i_khZrBO] ?? 1 / 0) ||
          bMeta_mWNosZ.properties.count - aMeta_xRVZaD.properties.count ||
          stringCompareWithNumbers_ZFbkaY(aMeta_xRVZaD.candidate, bMeta_mWNosZ.candidate));

      }),
      { astNodes: astNodeList_MPTWnw, nodeSorting: astNodeToMeta_qvTFJm });

  }
  function applyVariant_avuaSo(astRuleNode_DqRAEL, variantObject_ZAIoiE, variantsRegistry_SALWuM, applyDepth_pCSHPp = 0) {
    if ("arbitrary" === variantObject_ZAIoiE.kind)
    return variantObject_ZAIoiE.relative && 0 === applyDepth_pCSHPp ?
    null :
    void (astRuleNode_DqRAEL.nodes = [parseCSSRule_QVgHxe(variantObject_ZAIoiE.selector, astRuleNode_DqRAEL.nodes)]);
    let { applyFn: variantApplyFunction_Ajtlqf } = variantsRegistry_SALWuM.get(variantObject_ZAIoiE.root);
    if ("compound" === variantObject_ZAIoiE.kind) {
      let compoundVariantRootAtRule_EiCkes = processAtRule_lWgxgY("@slot");
      if (
      null === applyVariant_avuaSo(compoundVariantRootAtRule_EiCkes, variantObject_ZAIoiE.variant, variantsRegistry_SALWuM, applyDepth_pCSHPp + 1) ||
      "not" === variantObject_ZAIoiE.root && compoundVariantRootAtRule_EiCkes.nodes.length > 1)

      return null;
      for (let childAstNode_khZxMx of compoundVariantRootAtRule_EiCkes.nodes)
      if ("rule" !== childAstNode_khZxMx.kind && "at-rule" !== childAstNode_khZxMx.kind || null === variantApplyFunction_Ajtlqf(childAstNode_khZxMx, variantObject_ZAIoiE))
      return null;
      return (
        walkASTRecursive_YoBVFs(compoundVariantRootAtRule_EiCkes.nodes, (compoundAstNode_HbXfXm) => {
          if (
          ("rule" === compoundAstNode_HbXfXm.kind || "at-rule" === compoundAstNode_HbXfXm.kind) &&
          compoundAstNode_HbXfXm.nodes.length <= 0)

          return compoundAstNode_HbXfXm.nodes = astRuleNode_DqRAEL.nodes, 1;
        }),
        void (astRuleNode_DqRAEL.nodes = compoundVariantRootAtRule_EiCkes.nodes));

    }
    return null === variantApplyFunction_Ajtlqf(astRuleNode_DqRAEL, variantObject_ZAIoiE) ? null : void 0;
  }
  function isWildcardTypeUtility_OuxkQi(utility_czbNzE) {
    let utilityTypes_HpFXih = utility_czbNzE.options?.types ?? [];
    return utilityTypes_HpFXih.length > 1 && utilityTypes_HpFXih.includes("any");
  }
  function markDeclarationsImportant_QjLUQq(astNodes_ydcSRj) {
    for (let astNode_GijyRJ of astNodes_ydcSRj)
    "at-root" !== astNode_GijyRJ.kind && (
    "declaration" === astNode_GijyRJ.kind ?
    astNode_GijyRJ.important = !0 :
    ("rule" === astNode_GijyRJ.kind || "at-rule" === astNode_GijyRJ.kind) && markDeclarationsImportant_QjLUQq(astNode_GijyRJ.nodes));
  }
  function collectPropertySorting_qOTWaZ(ruleNodeList_yUAzxn) {
    let propertiesSet_moySDZ = new Set(),
      propertyCount_rbaUVm = 0,
      unprocessedNodes_pGouEq = ruleNodeList_yUAzxn.slice(),
      hitSortDirective_GAJixV = !1;
    for (; unprocessedNodes_pGouEq.length > 0;) {
      let currentNode_vNkeks = unprocessedNodes_pGouEq.shift();
      if ("declaration" === currentNode_vNkeks.kind) {
        if (void 0 === currentNode_vNkeks.value || (propertyCount_rbaUVm++, hitSortDirective_GAJixV)) continue;
        if ("--tw-sort" === currentNode_vNkeks.property) {
          let sortIndex_YsMhEB = propertySortOrder_nRolHg.indexOf(currentNode_vNkeks.value ?? "");
          if (-1 !== sortIndex_YsMhEB) {
            propertiesSet_moySDZ.add(sortIndex_YsMhEB), hitSortDirective_GAJixV = !0;
            continue;
          }
        }
        let propertyIndex_oPjbdj = propertySortOrder_nRolHg.indexOf(currentNode_vNkeks.property);
        -1 !== propertyIndex_oPjbdj && propertiesSet_moySDZ.add(propertyIndex_oPjbdj);
      } else if ("rule" === currentNode_vNkeks.kind || "at-rule" === currentNode_vNkeks.kind)
      for (let childNode_EPjFJW of currentNode_vNkeks.nodes) unprocessedNodes_pGouEq.push(childNode_EPjFJW);
    }
    return { order: Array.from(propertiesSet_moySDZ).sort((aIndex_sBATZB, bIndex_ZOnXDe) => aIndex_sBATZB - bIndex_ZOnXDe), count: propertyCount_rbaUVm };
  }
  function applyAtRuleProcessing_TKjlCh(nodeList_sOKvby, runtimeContext_KNUDxt) {
    let applyBitmask_MidOHK = 0,
      topLevelRootRuleNode_xVLmmR = parseCSSRule_QVgHxe("&", nodeList_sOKvby),
      applyRuleParentsSet_cQiwvs = new Set(),
      applyRuleDependenciesMap_FHKwDD = new DefaultMap_bDuRsR(() => new Set()),
      utilityRuleNodesMap_QxcjrT = new DefaultMap_bDuRsR(() => new Set());
    walkASTRecursive_YoBVFs([topLevelRootRuleNode_xVLmmR], (recursiveNode_rxUmyt, { parent: parentNode_PUliIk }) => {
      if ("at-rule" === recursiveNode_rxUmyt.kind) {
        if ("@keyframes" === recursiveNode_rxUmyt.name)
        return (
          walkASTRecursive_YoBVFs(recursiveNode_rxUmyt.nodes, (keyframesChildNode_ieenRs) => {
            if ("at-rule" === keyframesChildNode_ieenRs.kind && "@apply" === keyframesChildNode_ieenRs.name)
            throw new Error("You cannot use `@apply` inside `@keyframes`.");
          }),
          1);

        if ("@utility" === recursiveNode_rxUmyt.name) {
          let utilityName_XkmeRL = recursiveNode_rxUmyt.params.replace(/-\*$/, "");
          return (
            utilityRuleNodesMap_QxcjrT.get(utilityName_XkmeRL).add(recursiveNode_rxUmyt),
            void walkASTRecursive_YoBVFs(recursiveNode_rxUmyt.nodes, (utilityChildNode_uZvrLJ) => {
              if ("at-rule" === utilityChildNode_uZvrLJ.kind && "@apply" === utilityChildNode_uZvrLJ.name) {
                applyRuleParentsSet_cQiwvs.add(recursiveNode_rxUmyt);
                for (let applyDependency_oyMZxh of extractApplyDependencies_tJlQtN(utilityChildNode_uZvrLJ, runtimeContext_KNUDxt)) applyRuleDependenciesMap_FHKwDD.get(recursiveNode_rxUmyt).add(applyDependency_oyMZxh);
              }
            }));

        }
        if ("@apply" === recursiveNode_rxUmyt.name) {
          if (null === parentNode_PUliIk) return;
          applyBitmask_MidOHK |= 1, applyRuleParentsSet_cQiwvs.add(parentNode_PUliIk);
          for (let dependency_KXZbqR of extractApplyDependencies_tJlQtN(recursiveNode_rxUmyt, runtimeContext_KNUDxt)) applyRuleDependenciesMap_FHKwDD.get(parentNode_PUliIk).add(dependency_KXZbqR);
        }
      }
    });
    let visitedSet_qhURfn = new Set(),
      outputArr_kvXBxv = [],
      inProgressSet_HNzxFF = new Set();
    function visitApplyDependency_BUYleo(node_KgKyVD, callStack_ktvHgO = []) {
      if (!visitedSet_qhURfn.has(node_KgKyVD)) {
        if (inProgressSet_HNzxFF.has(node_KgKyVD)) {
          let parent_rlzjRp = callStack_ktvHgO[(callStack_ktvHgO.indexOf(node_KgKyVD) + 1) % callStack_ktvHgO.length];
          throw (
            "at-rule" === node_KgKyVD.kind &&
            "@utility" === node_KgKyVD.name &&
            "at-rule" === parent_rlzjRp.kind &&
            "@utility" === parent_rlzjRp.name &&
            walkASTRecursive_YoBVFs(node_KgKyVD.nodes, (child_yaxWnw) => {
              if ("at-rule" !== child_yaxWnw.kind || "@apply" !== child_yaxWnw.name) return;
              let paramsArr_pHlasc = child_yaxWnw.params.split(/\s+/g);
              for (let utilityName_VHkWjv of paramsArr_pHlasc)
              for (let parsedCandidate_FIZvxZ of runtimeContext_KNUDxt.parseCandidate(utilityName_VHkWjv))
              switch (parsedCandidate_FIZvxZ.kind) {
                case "arbitrary":
                  break;
                case "static":
                case "functional":
                  if (parent_rlzjRp.params.replace(/-\*$/, "") === parsedCandidate_FIZvxZ.root)
                  throw new Error(
                    `You cannot \`@apply\` the \`${utilityName_VHkWjv}\` utility here because it creates a circular dependency.`
                  );
              }
            }),
            new Error(
              `Circular dependency detected:\n\n${astNodesToCss_kEgwyH([node_KgKyVD])}\nRelies on:\n\n${astNodesToCss_kEgwyH([parent_rlzjRp])}`
            ));

        }
        inProgressSet_HNzxFF.add(node_KgKyVD);
        for (let depRoot_UZGtio of applyRuleDependenciesMap_FHKwDD.get(node_KgKyVD))
        for (let depNode_iFDxvg of utilityRuleNodesMap_QxcjrT.get(depRoot_UZGtio)) callStack_ktvHgO.push(node_KgKyVD), visitApplyDependency_BUYleo(depNode_iFDxvg, callStack_ktvHgO), callStack_ktvHgO.pop();
        visitedSet_qhURfn.add(node_KgKyVD), inProgressSet_HNzxFF.delete(node_KgKyVD), outputArr_kvXBxv.push(node_KgKyVD);
      }
    }
    for (let utilityNode_vzTnIX of applyRuleParentsSet_cQiwvs) visitApplyDependency_BUYleo(utilityNode_vzTnIX);
    for (let nodeWithApply_qHnstm of outputArr_kvXBxv)
    if ("nodes" in nodeWithApply_qHnstm)
    for (let i_dAWvnn = 0; i_dAWvnn < nodeWithApply_qHnstm.nodes.length; i_dAWvnn++) {
      let childNode_rKNYNG = nodeWithApply_qHnstm.nodes[i_dAWvnn];
      if ("at-rule" === childNode_rKNYNG.kind && "@apply" === childNode_rKNYNG.name) {
        let applyAstNodes_SukbyA = resolveCandidatesToAst_xoVMHU(childNode_rKNYNG.params.split(/\s+/g), runtimeContext_KNUDxt, {
            onInvalidCandidate: (invalidClass_FbLotB) => {
              throw new Error(`Cannot apply unknown utility class: ${invalidClass_FbLotB}`);
            }
          }).astNodes,
          replacementNodes_uyOPvW = [];
        for (let ast_svdoyX of applyAstNodes_SukbyA)
        if ("rule" === ast_svdoyX.kind) for (let subnode_pilhTn of ast_svdoyX.nodes) replacementNodes_uyOPvW.push(subnode_pilhTn);else
        replacementNodes_uyOPvW.push(ast_svdoyX);
        nodeWithApply_qHnstm.nodes.splice(i_dAWvnn, 1, ...replacementNodes_uyOPvW);
      }
    }
    return applyBitmask_MidOHK;
  }
  function* extractApplyDependencies_tJlQtN(applyAtRuleNode_ikiTlQ, runtimeContext_ZfROmr) {
    for (let utilityCandidateName_AxeexA of applyAtRuleNode_ikiTlQ.params.split(/\s+/g))
    for (let parsedCandidate_ODTOsy of runtimeContext_ZfROmr.parseCandidate(utilityCandidateName_AxeexA))
    switch (parsedCandidate_ODTOsy.kind) {
      case "arbitrary":
        break;
      case "static":
      case "functional":
        yield parsedCandidate_ODTOsy.root;
    }
  }
  async function resolveImportsRecursively_BwezUJ(astNodesToImport_EExxFR, currentFile_bctYRF, fetchDependency_FIFEKo, recursionDepth_MMtvQV = 0) {
    let importFlags_hygExh = 0,
      importPromises_XlkLqG = [];
    return (
      walkASTRecursive_YoBVFs(astNodesToImport_EExxFR, (astNode_cjXaMn, { replaceWith: replaceWith_BjuLrm }) => {
        if (
        "at-rule" === astNode_cjXaMn.kind && (
        "@import" === astNode_cjXaMn.name || "@reference" === astNode_cjXaMn.name))
        {
          let importParams_FaVGVd = function (parseAstArray_XsbfdB) {
            let importUri_gUPoYY,
              importLayer_fxsCCQ = null,
              importMedia_fUHfpx = null,
              importSupports_LWZRrY = null;
            for (let parseAstIndex_zycpjp = 0; parseAstIndex_zycpjp < parseAstArray_XsbfdB.length; parseAstIndex_zycpjp++) {
              let parseAstToken_IBZAzo = parseAstArray_XsbfdB[parseAstIndex_zycpjp];
              if ("separator" !== parseAstToken_IBZAzo.kind) {
                if ("word" === parseAstToken_IBZAzo.kind && !importUri_gUPoYY) {
                  if (!parseAstToken_IBZAzo.value || '"' !== parseAstToken_IBZAzo.value[0] && "'" !== parseAstToken_IBZAzo.value[0])
                  return null;
                  importUri_gUPoYY = parseAstToken_IBZAzo.value.slice(1, -1);
                  continue;
                }
                if (
                "function" === parseAstToken_IBZAzo.kind && "url" === parseAstToken_IBZAzo.value.toLowerCase() ||
                !importUri_gUPoYY)

                return null;
                if (
                ("word" === parseAstToken_IBZAzo.kind || "function" === parseAstToken_IBZAzo.kind) &&
                "layer" === parseAstToken_IBZAzo.value.toLowerCase())
                {
                  if (importLayer_fxsCCQ) return null;
                  if (importSupports_LWZRrY)
                  throw new Error(
                    "`layer(…)` in an `@import` should come before any other functions or conditions"
                  );
                  importLayer_fxsCCQ = "nodes" in parseAstToken_IBZAzo ? stringifyAST_tQRzQG(parseAstToken_IBZAzo.nodes) : "";
                  continue;
                }
                if (
                "function" === parseAstToken_IBZAzo.kind &&
                "supports" === parseAstToken_IBZAzo.value.toLowerCase())
                {
                  if (importSupports_LWZRrY) return null;
                  importSupports_LWZRrY = stringifyAST_tQRzQG(parseAstToken_IBZAzo.nodes);
                  continue;
                }
                importMedia_fUHfpx = stringifyAST_tQRzQG(parseAstArray_XsbfdB.slice(parseAstIndex_zycpjp));
                break;
              }
            }
            return importUri_gUPoYY ? { uri: importUri_gUPoYY, layer: importLayer_fxsCCQ, media: importMedia_fUHfpx, supports: importSupports_LWZRrY } : null;
          }(parseAST_Gsbeng(astNode_cjXaMn.params));
          if (null === importParams_FaVGVd) return;
          "@reference" === astNode_cjXaMn.name && (importParams_FaVGVd.media = "reference"), importFlags_hygExh |= 2;
          let { uri: uri_WvUDQQ, layer: layerName_XdSTjW, media: mediaQuery_dWapMK, supports: supportsQuery_JNayiF } = importParams_FaVGVd;
          if (
          uri_WvUDQQ.startsWith("data:") ||
          uri_WvUDQQ.startsWith("http://") ||
          uri_WvUDQQ.startsWith("https://"))

          return;
          let contextNode_jntKTw = makeContextNode_dEmkmt({}, []);
          return (
            importPromises_XlkLqG.push(
              (async () => {
                if (recursionDepth_MMtvQV > 100)
                throw new Error(
                  `Exceeded maximum recursion depth while resolving \`${uri_WvUDQQ}\` in \`${currentFile_bctYRF}\`)`
                );
                let importResult_HXpvxm = await fetchDependency_FIFEKo(uri_WvUDQQ, currentFile_bctYRF),
                  importedAst_aENAcz = parseCSS_iwVxBN(importResult_HXpvxm.content);
                await resolveImportsRecursively_BwezUJ(importedAst_aENAcz, importResult_HXpvxm.base, fetchDependency_FIFEKo, recursionDepth_MMtvQV + 1),
                contextNode_jntKTw.nodes = function (astNodeList_NRTeFS, layerName_cPnIFR, mediaQuery_buqAlX, supportsQuery_DdyRqE) {
                  let wrappedAstNodes_CjUXtr = astNodeList_NRTeFS;
                  return (
                    null !== layerName_cPnIFR && (wrappedAstNodes_CjUXtr = [processAtRule_lWgxgY("@layer", layerName_cPnIFR, wrappedAstNodes_CjUXtr)]),
                    null !== mediaQuery_buqAlX && (wrappedAstNodes_CjUXtr = [processAtRule_lWgxgY("@media", mediaQuery_buqAlX, wrappedAstNodes_CjUXtr)]),
                    null !== supportsQuery_DdyRqE && (
                    wrappedAstNodes_CjUXtr = [processAtRule_lWgxgY("@supports", "(" === supportsQuery_DdyRqE[0] ? supportsQuery_DdyRqE : `(${supportsQuery_DdyRqE})`, wrappedAstNodes_CjUXtr)]),
                    wrappedAstNodes_CjUXtr);

                }([makeContextNode_dEmkmt({ base: importResult_HXpvxm.base }, importedAst_aENAcz)], layerName_XdSTjW, mediaQuery_dWapMK, supportsQuery_JNayiF);
              })()
            ),
            replaceWith_BjuLrm(contextNode_jntKTw),
            1);

        }
      }),
      importPromises_XlkLqG.length > 0 && (await Promise.all(importPromises_XlkLqG)),
      importFlags_hygExh);

  }
  function getFontValueOrProp_JJMPMw(fontVal_kcsjdb, propertyName_SxmhPt = null) {
    return Array.isArray(fontVal_kcsjdb) &&
    2 === fontVal_kcsjdb.length &&
    "object" == typeof fontVal_kcsjdb[1] &&
    null !== typeof fontVal_kcsjdb[1] ?
    propertyName_SxmhPt ?
    fontVal_kcsjdb[1][propertyName_SxmhPt] ?? null :
    fontVal_kcsjdb[0] :
    Array.isArray(fontVal_kcsjdb) && null === propertyName_SxmhPt ?
    fontVal_kcsjdb.join(", ") :
    "string" == typeof fontVal_kcsjdb && null === propertyName_SxmhPt ?
    fontVal_kcsjdb :
    null;
  }
  function applyThemeToContext_KNnVTp(runtimeContext_kxNKFK, { theme: themeObject_cvbcJf }, themeClearList_iWNkNr) {
    for (let clearThemeKey_oAXazZ of themeClearList_iWNkNr) {
      let normalizedClearKey_wImjJp = normalizeThemePath_NGffNP([clearThemeKey_oAXazZ]);
      normalizedClearKey_wImjJp && runtimeContext_kxNKFK.theme.clearNamespace(`--${normalizedClearKey_wImjJp}`, 4);
    }
    for (let [themePath_PaGIPY, themeValue_LlvPhC] of function (themeRoot_VniSZR) {
      let themeEntries_rZmbuZ = [];
      return (
        walkThemeRecursively_ZxjirB(themeRoot_VniSZR, [], (currentValue_qOWZjq, currentPath_lkVjpy) => {
          if (
          function (valueToCheck_lNQOby) {
            return "number" == typeof valueToCheck_lNQOby || "string" == typeof valueToCheck_lNQOby;
          }(currentValue_qOWZjq))

          return themeEntries_rZmbuZ.push([currentPath_lkVjpy, currentValue_qOWZjq]), 1;
          if (
          function (maybeFontObject_LrhAFv) {
            if (
            !Array.isArray(maybeFontObject_LrhAFv) ||
            2 !== maybeFontObject_LrhAFv.length ||
            "string" != typeof maybeFontObject_LrhAFv[0] && "number" != typeof maybeFontObject_LrhAFv[0] ||
            void 0 === maybeFontObject_LrhAFv[1] ||
            null === maybeFontObject_LrhAFv[1] ||
            "object" != typeof maybeFontObject_LrhAFv[1])

            return !1;
            for (let fontPropKey_SHHwJR of Reflect.ownKeys(maybeFontObject_LrhAFv[1]))
            if (
            "string" != typeof fontPropKey_SHHwJR ||
            "string" != typeof maybeFontObject_LrhAFv[1][fontPropKey_SHHwJR] && "number" != typeof maybeFontObject_LrhAFv[1][fontPropKey_SHHwJR])

            return !1;
            return !0;
          }(currentValue_qOWZjq))
          {
            themeEntries_rZmbuZ.push([currentPath_lkVjpy, currentValue_qOWZjq[0]]);
            for (let fontKey_HZkGyr of Reflect.ownKeys(currentValue_qOWZjq[1]))
            themeEntries_rZmbuZ.push([[...currentPath_lkVjpy, `-${fontKey_HZkGyr}`], currentValue_qOWZjq[1][fontKey_HZkGyr]]);
            return 1;
          }
          return Array.isArray(currentValue_qOWZjq) && currentValue_qOWZjq.every((stringArrayElement_mmxfpQ) => "string" == typeof stringArrayElement_mmxfpQ) ? (
          "fontSize" === currentPath_lkVjpy[0] ? (
          themeEntries_rZmbuZ.push([currentPath_lkVjpy, currentValue_qOWZjq[0]]),
          currentValue_qOWZjq.length >= 2 && themeEntries_rZmbuZ.push([[...currentPath_lkVjpy, "-line-height"], currentValue_qOWZjq[1]])) :
          themeEntries_rZmbuZ.push([currentPath_lkVjpy, currentValue_qOWZjq.join(", ")]),
          1) :
          void 0;
        }),
        themeEntries_rZmbuZ);

    }(themeObject_cvbcJf)) {
      if ("string" != typeof themeValue_LlvPhC && "number" != typeof themeValue_LlvPhC) continue;
      if (
      "string" == typeof themeValue_LlvPhC && (themeValue_LlvPhC = themeValue_LlvPhC.replace(/<alpha-value>/g, "1")),
      "opacity" === themePath_PaGIPY[0] && ("number" == typeof themeValue_LlvPhC || "string" == typeof themeValue_LlvPhC))
      {
        let numericOpacity_LTbQwb = "string" == typeof themeValue_LlvPhC ? parseFloat(themeValue_LlvPhC) : themeValue_LlvPhC;
        numericOpacity_LTbQwb >= 0 && numericOpacity_LTbQwb <= 1 && (themeValue_LlvPhC = 100 * numericOpacity_LTbQwb + "%");
      }
      let variableThemePath_SUuGTD = normalizeThemePath_NGffNP(themePath_PaGIPY);
      variableThemePath_SUuGTD && runtimeContext_kxNKFK.theme.add(`--${variableThemePath_SUuGTD}`, "" + themeValue_LlvPhC, 7);
    }
    if (Object.hasOwn(themeObject_cvbcJf, "fontFamily")) {
      let fontPriority_EDwghp = 5;
      {
        let sansFontValue_wUsSBQ = getFontValueOrProp_JJMPMw(themeObject_cvbcJf.fontFamily.sans);
        sansFontValue_wUsSBQ &&
        runtimeContext_kxNKFK.theme.hasDefault("--font-sans") && (
        runtimeContext_kxNKFK.theme.add("--default-font-family", sansFontValue_wUsSBQ, fontPriority_EDwghp),
        runtimeContext_kxNKFK.theme.add(
          "--default-font-feature-settings",
          getFontValueOrProp_JJMPMw(themeObject_cvbcJf.fontFamily.sans, "fontFeatureSettings") ?? "normal",
          fontPriority_EDwghp
        ),
        runtimeContext_kxNKFK.theme.add(
          "--default-font-variation-settings",
          getFontValueOrProp_JJMPMw(themeObject_cvbcJf.fontFamily.sans, "fontVariationSettings") ?? "normal",
          fontPriority_EDwghp
        ));
      }
      {
        let monoFontValue_qyAugo = getFontValueOrProp_JJMPMw(themeObject_cvbcJf.fontFamily.mono);
        monoFontValue_qyAugo &&
        runtimeContext_kxNKFK.theme.hasDefault("--font-mono") && (
        runtimeContext_kxNKFK.theme.add("--default-mono-font-family", monoFontValue_qyAugo, fontPriority_EDwghp),
        runtimeContext_kxNKFK.theme.add(
          "--default-mono-font-feature-settings",
          getFontValueOrProp_JJMPMw(themeObject_cvbcJf.fontFamily.mono, "fontFeatureSettings") ?? "normal",
          fontPriority_EDwghp
        ),
        runtimeContext_kxNKFK.theme.add(
          "--default-mono-font-variation-settings",
          getFontValueOrProp_JJMPMw(themeObject_cvbcJf.fontFamily.mono, "fontVariationSettings") ?? "normal",
          fontPriority_EDwghp
        ));
      }
    }
    return themeObject_cvbcJf;
  }
  var themeKeyPattern_GbzViA = /^[a-zA-Z0-9-_%/\.]+$/;
  function normalizeThemePath_NGffNP(pathArray_tvXoOB) {
    if ("container" === pathArray_tvXoOB[0]) return null;
    "animation" === (pathArray_tvXoOB = structuredClone(pathArray_tvXoOB))[0] && (pathArray_tvXoOB[0] = "animate"),
    "aspectRatio" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "aspect"),
    "borderRadius" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "radius"),
    "boxShadow" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "shadow"),
    "colors" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "color"),
    "containers" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "container"),
    "fontFamily" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "font"),
    "fontSize" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "text"),
    "letterSpacing" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "tracking"),
    "lineHeight" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "leading"),
    "maxWidth" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "container"),
    "screens" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "breakpoint"),
    "transitionTimingFunction" === pathArray_tvXoOB[0] && (pathArray_tvXoOB[0] = "ease");
    for (let segment_gxYDSn of pathArray_tvXoOB) if (!themeKeyPattern_GbzViA.test(segment_gxYDSn)) return null;
    return pathArray_tvXoOB.
    map((segment_VdCuzZ, segmentIndex_UNmdWP, allSegments_eiHABs) => "1" === segment_VdCuzZ && segmentIndex_UNmdWP !== allSegments_eiHABs.length - 1 ? "" : segment_VdCuzZ).
    map((modifiedSegment_mrZYdu) =>
    modifiedSegment_mrZYdu.
    replaceAll(".", "_").
    replace(/([a-z])([A-Z])/g, (fullMatch_bGvFHZ, lowerCaseLetter_jJYmkw, upperCaseLetter_moGoje) => `${lowerCaseLetter_jJYmkw}-${upperCaseLetter_moGoje.toLowerCase()}`)
    ).
    filter((segmentString_LhAvfT, segmentPos_dKuQwE) => "DEFAULT" !== segmentString_LhAvfT || segmentPos_dKuQwE !== pathArray_tvXoOB.length - 1).
    join("-");
  }
  function walkThemeRecursively_ZxjirB(themeData_mAMSpx, path_NUVkjR = [], cb_ViOwrk) {
    for (let key_fDUyaG of Reflect.ownKeys(themeData_mAMSpx)) {
      let subValue_AAAgkD = themeData_mAMSpx[key_fDUyaG];
      if (null == subValue_AAAgkD) continue;
      let nextPath_OEHznD = [...path_NUVkjR, key_fDUyaG],
        cbReturn_eZtedO = cb_ViOwrk(subValue_AAAgkD, nextPath_OEHznD) ?? 0;
      if (1 !== cbReturn_eZtedO) {
        if (2 === cbReturn_eZtedO) return 2;
        if ((Array.isArray(subValue_AAAgkD) || "object" == typeof subValue_AAAgkD) && 2 === walkThemeRecursively_ZxjirB(subValue_AAAgkD, nextPath_OEHznD, cb_ViOwrk))
        return 2;
      }
    }
  }
  function splitCandidateParts_uPtQPp(candidateString_uhzGBG) {
    let out_wVzBeO = [];
    for (let part_EXmhWk of splitOnTopLevel_EfBwUv(candidateString_uhzGBG, ".")) {
      if (!part_EXmhWk.includes("[")) {
        out_wVzBeO.push(part_EXmhWk);
        continue;
      }
      let pos_GDBAqA = 0;
      for (;;) {
        let startBracket_iAjRQH = part_EXmhWk.indexOf("[", pos_GDBAqA),
          endBracket_NtfYYY = part_EXmhWk.indexOf("]", startBracket_iAjRQH);
        if (-1 === startBracket_iAjRQH || -1 === endBracket_NtfYYY) break;
        startBracket_iAjRQH > pos_GDBAqA && out_wVzBeO.push(part_EXmhWk.slice(pos_GDBAqA, startBracket_iAjRQH)), out_wVzBeO.push(part_EXmhWk.slice(startBracket_iAjRQH + 1, endBracket_NtfYYY)), pos_GDBAqA = endBracket_NtfYYY + 1;
      }
      pos_GDBAqA <= part_EXmhWk.length - 1 && out_wVzBeO.push(part_EXmhWk.slice(pos_GDBAqA));
    }
    return out_wVzBeO;
  }
  function isPlainObject_IglcfM(candidateObj_kpheqp) {
    if ("[object Object]" !== Object.prototype.toString.call(candidateObj_kpheqp)) return !1;
    let proto_pwJgZE = Object.getPrototypeOf(candidateObj_kpheqp);
    return null === proto_pwJgZE || null === Object.getPrototypeOf(proto_pwJgZE);
  }
  function mergeWithCustomizer_neEAgM(targetObj_GudbDG, mergeSourceList_MLMMOI, mergeCustomizer_DBpEzX, mergePath_bHMbqx = []) {
    for (let sourceObj_kmoGrj of mergeSourceList_MLMMOI)
    if (null != sourceObj_kmoGrj)
    for (let mergeKey_gyFTWP of Reflect.ownKeys(sourceObj_kmoGrj)) {
      mergePath_bHMbqx.push(mergeKey_gyFTWP);
      let customizerResult_CACDOu = mergeCustomizer_DBpEzX(targetObj_GudbDG[mergeKey_gyFTWP], sourceObj_kmoGrj[mergeKey_gyFTWP], mergePath_bHMbqx);
      void 0 !== customizerResult_CACDOu ?
      targetObj_GudbDG[mergeKey_gyFTWP] = customizerResult_CACDOu :
      isPlainObject_IglcfM(targetObj_GudbDG[mergeKey_gyFTWP]) && isPlainObject_IglcfM(sourceObj_kmoGrj[mergeKey_gyFTWP]) ?
      targetObj_GudbDG[mergeKey_gyFTWP] = mergeWithCustomizer_neEAgM({}, [targetObj_GudbDG[mergeKey_gyFTWP], sourceObj_kmoGrj[mergeKey_gyFTWP]], mergeCustomizer_DBpEzX, mergePath_bHMbqx) :
      targetObj_GudbDG[mergeKey_gyFTWP] = sourceObj_kmoGrj[mergeKey_gyFTWP],
      mergePath_bHMbqx.pop();
    }
    return targetObj_GudbDG;
  }
  function createThemeResolver_KrzbFZ(themeInternals_FgbLFg, themeGetter_GvRPEr, unwrapper_qGSccf) {
    return function (themeKey_eItWTd, defaultVal_gAqNEo) {
      let lastSlashIndex_eZkOrZ = themeKey_eItWTd.lastIndexOf("/"),
        modifier_RWIPyy = null;
      -1 !== lastSlashIndex_eZkOrZ && (modifier_RWIPyy = themeKey_eItWTd.slice(lastSlashIndex_eZkOrZ + 1).trim(), themeKey_eItWTd = themeKey_eItWTd.slice(0, lastSlashIndex_eZkOrZ).trim());
      let rawThemeVal_dLySSj = (() => {
        let candidateParts_OBihCP = splitCandidateParts_uPtQPp(themeKey_eItWTd),
          [themeNamespaceResult_izCqWh, themeOptionsResult_thHlOK] = function (themeInternals_jJYDDj, parts_ntDOQS) {
            if (1 === parts_ntDOQS.length && parts_ntDOQS[0].startsWith("--"))
            return [themeInternals_jJYDDj.get([parts_ntDOQS[0]]), themeInternals_jJYDDj.getOptions(parts_ntDOQS[0])];
            let normalizedThemePath_oijZpu = normalizeThemePath_NGffNP(parts_ntDOQS),
              namespaceValuesMap_KbufGX = new Map(),
              groupedVariations_IhbFyH = new DefaultMap_bDuRsR(() => new Map()),
              namespaceEntries_sZRHOY = themeInternals_jJYDDj.namespace(`--${normalizedThemePath_oijZpu}`);
            if (0 === namespaceEntries_sZRHOY.size) return [null, 0];
            let namespaceOptionsMap_NxxLkU = new Map();
            for (let [entryKey_BPwEAS, entryValue_kwdbTY] of namespaceEntries_sZRHOY) {
              if (!entryKey_BPwEAS || !entryKey_BPwEAS.includes("--")) {
                namespaceValuesMap_KbufGX.set(entryKey_BPwEAS, entryValue_kwdbTY),
                namespaceOptionsMap_NxxLkU.set(entryKey_BPwEAS, themeInternals_jJYDDj.getOptions(entryKey_BPwEAS ? `--${normalizedThemePath_oijZpu}-${entryKey_BPwEAS}` : `--${normalizedThemePath_oijZpu}`));
                continue;
              }
              let namespaceSepIndex_bWiCCm = entryKey_BPwEAS.indexOf("--"),
                namespacePrefix_dJXGKi = entryKey_BPwEAS.slice(0, namespaceSepIndex_bWiCCm),
                variationKey_QZNfQf = entryKey_BPwEAS.slice(namespaceSepIndex_bWiCCm + 2);
              variationKey_QZNfQf = variationKey_QZNfQf.replace(/-([a-z])/g, (dashMatch_VtoJUd, capturedLetter_zQrrSD) => capturedLetter_zQrrSD.toUpperCase()),
              groupedVariations_IhbFyH.
              get("" === namespacePrefix_dJXGKi ? null : namespacePrefix_dJXGKi).
              set(variationKey_QZNfQf, [entryValue_kwdbTY, themeInternals_jJYDDj.getOptions(`--${normalizedThemePath_oijZpu}${entryKey_BPwEAS}`)]);
            }
            let namespaceBaseOptions_WxBRIG = themeInternals_jJYDDj.getOptions(`--${normalizedThemePath_oijZpu}`);
            for (let [namespaceGroupKey_fHtsts, optionsGroup_mBnLYa] of groupedVariations_IhbFyH) {
              let baseVal_QEenqI = namespaceValuesMap_KbufGX.get(namespaceGroupKey_fHtsts);
              if ("string" != typeof baseVal_QEenqI) continue;
              let groupVals_WhPPHg = {},
                groupOptions_IuWwVd = {};
              for (let [subKey_eIrRdv, [subVal_uAImBC, subOptions_rMHGVl]] of optionsGroup_mBnLYa) groupVals_WhPPHg[subKey_eIrRdv] = subVal_uAImBC, groupOptions_IuWwVd[subKey_eIrRdv] = subOptions_rMHGVl;
              namespaceValuesMap_KbufGX.set(namespaceGroupKey_fHtsts, [baseVal_QEenqI, groupVals_WhPPHg]), namespaceOptionsMap_NxxLkU.set(namespaceGroupKey_fHtsts, [namespaceBaseOptions_WxBRIG, groupOptions_IuWwVd]);
            }
            let flatValues_QyRPRo = {},
              flatOptions_xqElCR = {};
            for (let [flatKey_GOsfJV, flatVal_UhRedU] of namespaceValuesMap_KbufGX) deepSetValue_vNAXUq(flatValues_QyRPRo, [flatKey_GOsfJV ?? "DEFAULT"], flatVal_UhRedU);
            for (let [flatOptionKey_JZtgfc, flatOptionVal_UNJffF] of namespaceOptionsMap_NxxLkU) deepSetValue_vNAXUq(flatOptions_xqElCR, [flatOptionKey_JZtgfc ?? "DEFAULT"], flatOptionVal_UNJffF);
            return "DEFAULT" === parts_ntDOQS[parts_ntDOQS.length - 1] ?
            [flatValues_QyRPRo?.DEFAULT ?? null, flatOptions_xqElCR.DEFAULT ?? 0] :
            "DEFAULT" in flatValues_QyRPRo && 1 === Object.keys(flatValues_QyRPRo).length ?
            [flatValues_QyRPRo.DEFAULT, flatOptions_xqElCR.DEFAULT ?? 0] : (
            flatValues_QyRPRo.__CSS_VALUES__ = flatOptions_xqElCR, [flatValues_QyRPRo, flatOptions_xqElCR]);
          }(themeInternals_FgbLFg.theme, candidateParts_OBihCP),
          unwrappedVal_gsRPsw = unwrapper_qGSccf(deepGetValue_zdIAyg(themeGetter_GvRPEr() ?? {}, candidateParts_OBihCP) ?? null);
        if (
        "string" == typeof unwrappedVal_gsRPsw && (unwrappedVal_gsRPsw = unwrappedVal_gsRPsw.replace("<alpha-value>", "1")),
        "object" != typeof themeNamespaceResult_izCqWh)

        return "object" != typeof themeOptionsResult_thHlOK && 4 & themeOptionsResult_thHlOK ? unwrappedVal_gsRPsw ?? themeNamespaceResult_izCqWh : themeNamespaceResult_izCqWh;
        if (null !== unwrappedVal_gsRPsw && "object" == typeof unwrappedVal_gsRPsw && !Array.isArray(unwrappedVal_gsRPsw)) {
          let mergedObj_FVteJp = mergeWithCustomizer_neEAgM({}, [unwrappedVal_gsRPsw], (mergeCustomizerA_bBmzZG, mergeCustomizerB_VQkUAI) => mergeCustomizerB_VQkUAI);
          if (null === themeNamespaceResult_izCqWh && Object.hasOwn(unwrappedVal_gsRPsw, "__CSS_VALUES__")) {
            let cssValuesClone_CDllcP = {};
            for (let cssSubKey_aHxxYa in unwrappedVal_gsRPsw.__CSS_VALUES__) cssValuesClone_CDllcP[cssSubKey_aHxxYa] = unwrappedVal_gsRPsw[cssSubKey_aHxxYa], delete mergedObj_FVteJp[cssSubKey_aHxxYa];
            themeNamespaceResult_izCqWh = cssValuesClone_CDllcP;
          }
          for (let namespaceKey_XHvovP in themeNamespaceResult_izCqWh)
          "__CSS_VALUES__" !== namespaceKey_XHvovP && (
          4 & unwrappedVal_gsRPsw?.__CSS_VALUES__?.[namespaceKey_XHvovP] && void 0 !== deepGetValue_zdIAyg(mergedObj_FVteJp, namespaceKey_XHvovP.split("-")) || (
          mergedObj_FVteJp[cssUnescape_MNuHwL(namespaceKey_XHvovP)] = themeNamespaceResult_izCqWh[namespaceKey_XHvovP]));
          return mergedObj_FVteJp;
        }
        if (Array.isArray(themeNamespaceResult_izCqWh) && Array.isArray(themeOptionsResult_thHlOK) && Array.isArray(unwrappedVal_gsRPsw)) {
          let baseArrayResult_YCRoSJ = themeNamespaceResult_izCqWh[0],
            namedArrayResult_NitrdD = themeNamespaceResult_izCqWh[1];
          4 & themeOptionsResult_thHlOK[0] && (baseArrayResult_YCRoSJ = unwrappedVal_gsRPsw[0] ?? baseArrayResult_YCRoSJ);
          for (let arrayOptionKey_NwvBHQ of Object.keys(namedArrayResult_NitrdD)) 4 & themeOptionsResult_thHlOK[1][arrayOptionKey_NwvBHQ] && (namedArrayResult_NitrdD[arrayOptionKey_NwvBHQ] = unwrappedVal_gsRPsw[1][arrayOptionKey_NwvBHQ] ?? namedArrayResult_NitrdD[arrayOptionKey_NwvBHQ]);
          return [baseArrayResult_YCRoSJ, namedArrayResult_NitrdD];
        }
        return themeNamespaceResult_izCqWh ?? unwrappedVal_gsRPsw;
      })();
      return modifier_RWIPyy && "string" == typeof rawThemeVal_dLySSj && (rawThemeVal_dLySSj = colorWithOpacityValue_xdDGmk(rawThemeVal_dLySSj, modifier_RWIPyy)), rawThemeVal_dLySSj ?? defaultVal_gAqNEo;
    };
  }
  function deepGetValue_zdIAyg(targetObj_LWugRG, pathArr_wJLWJz) {
    for (let pathIdx_iVxbdN = 0; pathIdx_iVxbdN < pathArr_wJLWJz.length; ++pathIdx_iVxbdN) {
      let curPathPart_inEpqf = pathArr_wJLWJz[pathIdx_iVxbdN];
      if (void 0 !== targetObj_LWugRG?.[curPathPart_inEpqf]) targetObj_LWugRG = targetObj_LWugRG[curPathPart_inEpqf];else
      {
        if (void 0 === pathArr_wJLWJz[pathIdx_iVxbdN + 1]) return;
        pathArr_wJLWJz[pathIdx_iVxbdN + 1] = `${curPathPart_inEpqf}-${pathArr_wJLWJz[pathIdx_iVxbdN + 1]}`;
      }
    }
    return targetObj_LWugRG;
  }
  function deepSetValue_vNAXUq(targetObj_FbcKey, pathArr_FTEDFw, value_RBheDz) {
    for (let curPathPart_PHyhmw of pathArr_FTEDFw.slice(0, -1)) void 0 === targetObj_FbcKey[curPathPart_PHyhmw] && (targetObj_FbcKey[curPathPart_PHyhmw] = {}), targetObj_FbcKey = targetObj_FbcKey[curPathPart_PHyhmw];
    targetObj_FbcKey[pathArr_FTEDFw[pathArr_FTEDFw.length - 1]] = value_RBheDz;
  }
  function makeCombinatorNode_TyIpmX(combinatorValue_qJQESq) {
    return { kind: "combinator", value: combinatorValue_qJQESq };
  }
  function makeFunctionNode_DaRBmE(fnName_SLvauF, fnNodes_PjQNcA) {
    return { kind: "function", value: fnName_SLvauF, nodes: fnNodes_PjQNcA };
  }
  function makeSelectorNode_uWQEtI(selectorVal_RWyLvi) {
    return { kind: "selector", value: selectorVal_RWyLvi };
  }
  function makeSeparatorNode_qJVJeW(separatorVal_XxfVkl) {
    return { kind: "separator", value: separatorVal_XxfVkl };
  }
  function makeValueNode_rVENBW(value_LqIJLD) {
    return { kind: "value", value: value_LqIJLD };
  }
  function walkASTRecursive_cYRtvS(nodeArray_SYEhLB, callback_UNwpcp, parentNode_qBxiXb = null) {
    for (let nodeIdx_Lzeuxe = 0; nodeIdx_Lzeuxe < nodeArray_SYEhLB.length; nodeIdx_Lzeuxe++) {
      let node_RdqVCF = nodeArray_SYEhLB[nodeIdx_Lzeuxe],
        wasReplaced_rfgaex = !1,
        numInserted_TeQWUK = 0,
        callbackResult_JlhuPK =
        callback_UNwpcp(node_RdqVCF, {
          parent: parentNode_qBxiXb,
          replaceWith(replaceNode_nypQNQ) {
            wasReplaced_rfgaex || (
            wasReplaced_rfgaex = !0,
            Array.isArray(replaceNode_nypQNQ) ?
            0 === replaceNode_nypQNQ.length ? (
            nodeArray_SYEhLB.splice(nodeIdx_Lzeuxe, 1), numInserted_TeQWUK = 0) :
            1 === replaceNode_nypQNQ.length ? (
            nodeArray_SYEhLB[nodeIdx_Lzeuxe] = replaceNode_nypQNQ[0], numInserted_TeQWUK = 1) : (
            nodeArray_SYEhLB.splice(nodeIdx_Lzeuxe, 1, ...replaceNode_nypQNQ), numInserted_TeQWUK = replaceNode_nypQNQ.length) : (
            nodeArray_SYEhLB[nodeIdx_Lzeuxe] = replaceNode_nypQNQ, numInserted_TeQWUK = 1));
          }
        }) ?? 0;
      if (wasReplaced_rfgaex) 0 === callbackResult_JlhuPK ? nodeIdx_Lzeuxe-- : nodeIdx_Lzeuxe += numInserted_TeQWUK - 1;else
      {
        if (2 === callbackResult_JlhuPK) return 2;
        if (1 !== callbackResult_JlhuPK && "function" === node_RdqVCF.kind && 2 === walkASTRecursive_cYRtvS(node_RdqVCF.nodes, callback_UNwpcp, node_RdqVCF))
        return 2;
      }
    }
  }
  function stringifyAST_WMAmQS(astNodes_fGnLNq) {
    let outString_PNsYlN = "";
    for (let token_FVvBTA of astNodes_fGnLNq)
    switch (token_FVvBTA.kind) {
      case "combinator":
      case "selector":
      case "separator":
      case "value":
        outString_PNsYlN += token_FVvBTA.value;
        break;
      case "function":
        outString_PNsYlN += token_FVvBTA.value + "(" + stringifyAST_WMAmQS(token_FVvBTA.nodes) + ")";
    }
    return outString_PNsYlN;
  }
  function parseAST_JyRCbf(selectorStr_BdsHYa) {
    selectorStr_BdsHYa = selectorStr_BdsHYa.replaceAll("\r\n", "\n");
    let charCode_BOptDL,
      topLevelTokens_WHQgBr = [],
      functionNestStack_pEcLDd = [],
      curFnNode_GSSCrs = null,
      curPart_llmImn = "";
    for (let idx_qYZyeC = 0; idx_qYZyeC < selectorStr_BdsHYa.length; idx_qYZyeC++) {
      let ch_ImrVcX = selectorStr_BdsHYa.charCodeAt(idx_qYZyeC);
      switch (ch_ImrVcX) {
        case 44:
        case 62:
        case 10:
        case 32:
        case 43:
        case 9:
        case 126:{
            if (curPart_llmImn.length > 0) {
              let selectorNode_faXKZd = makeSelectorNode_uWQEtI(curPart_llmImn);
              curFnNode_GSSCrs ? curFnNode_GSSCrs.nodes.push(selectorNode_faXKZd) : topLevelTokens_WHQgBr.push(selectorNode_faXKZd), curPart_llmImn = "";
            }
            let symbolStartIdx_IgYnXi = idx_qYZyeC,
              symbolEndIdx_HooTSq = idx_qYZyeC + 1;
            for (;

            symbolEndIdx_HooTSq < selectorStr_BdsHYa.length && (
            charCode_BOptDL = selectorStr_BdsHYa.charCodeAt(symbolEndIdx_HooTSq),
            44 === charCode_BOptDL ||
            62 === charCode_BOptDL ||
            10 === charCode_BOptDL ||
            32 === charCode_BOptDL ||
            43 === charCode_BOptDL ||
            9 === charCode_BOptDL ||
            126 === charCode_BOptDL);
            symbolEndIdx_HooTSq++)
            ;
            idx_qYZyeC = symbolEndIdx_HooTSq - 1;
            let symbolStr_tOIWuC = selectorStr_BdsHYa.slice(symbolStartIdx_IgYnXi, symbolEndIdx_HooTSq),
              symbolNode_WTsuis = "," === symbolStr_tOIWuC.trim() ? makeSeparatorNode_qJVJeW(symbolStr_tOIWuC) : makeCombinatorNode_TyIpmX(symbolStr_tOIWuC);
            curFnNode_GSSCrs ? curFnNode_GSSCrs.nodes.push(symbolNode_WTsuis) : topLevelTokens_WHQgBr.push(symbolNode_WTsuis);
            break;
          }
        case 40:{
            let fnNode_aaUicr = makeFunctionNode_DaRBmE(curPart_llmImn, []);
            if (
            curPart_llmImn = "",
            ":not" !== fnNode_aaUicr.value &&
            ":where" !== fnNode_aaUicr.value &&
            ":has" !== fnNode_aaUicr.value &&
            ":is" !== fnNode_aaUicr.value)
            {
              let parenStart_fOrkyw = idx_qYZyeC + 1,
                parenDepth_smAgce = 0;
              for (let innerIdx_xAyEaE = idx_qYZyeC + 1; innerIdx_xAyEaE < selectorStr_BdsHYa.length; innerIdx_xAyEaE++)
              if (charCode_BOptDL = selectorStr_BdsHYa.charCodeAt(innerIdx_xAyEaE), 40 !== charCode_BOptDL) {
                if (41 === charCode_BOptDL) {
                  if (0 === parenDepth_smAgce) {
                    idx_qYZyeC = innerIdx_xAyEaE;
                    break;
                  }
                  parenDepth_smAgce--;
                }
              } else parenDepth_smAgce++;
              let parenEnd_voaynw = idx_qYZyeC;
              fnNode_aaUicr.nodes.push(makeValueNode_rVENBW(selectorStr_BdsHYa.slice(parenStart_fOrkyw, parenEnd_voaynw))),
              curPart_llmImn = "",
              idx_qYZyeC = parenEnd_voaynw,
              curFnNode_GSSCrs ? curFnNode_GSSCrs.nodes.push(fnNode_aaUicr) : topLevelTokens_WHQgBr.push(fnNode_aaUicr);
              break;
            }
            curFnNode_GSSCrs ? curFnNode_GSSCrs.nodes.push(fnNode_aaUicr) : topLevelTokens_WHQgBr.push(fnNode_aaUicr), functionNestStack_pEcLDd.push(fnNode_aaUicr), curFnNode_GSSCrs = fnNode_aaUicr;
            break;
          }
        case 41:{
            let fnParentNode_muLOMp = functionNestStack_pEcLDd.pop();
            if (curPart_llmImn.length > 0) {
              let selectorNode_voTArp = makeSelectorNode_uWQEtI(curPart_llmImn);
              fnParentNode_muLOMp.nodes.push(selectorNode_voTArp), curPart_llmImn = "";
            }
            curFnNode_GSSCrs = functionNestStack_pEcLDd.length > 0 ? functionNestStack_pEcLDd[functionNestStack_pEcLDd.length - 1] : null;
            break;
          }
        case 46:
        case 58:
        case 35:
          if (curPart_llmImn.length > 0) {
            let selectorNode_GhjAcf = makeSelectorNode_uWQEtI(curPart_llmImn);
            curFnNode_GSSCrs ? curFnNode_GSSCrs.nodes.push(selectorNode_GhjAcf) : topLevelTokens_WHQgBr.push(selectorNode_GhjAcf);
          }
          curPart_llmImn = String.fromCharCode(ch_ImrVcX);
          break;
        case 91:{
            if (curPart_llmImn.length > 0) {
              let selectorNode_xdRoDL = makeSelectorNode_uWQEtI(curPart_llmImn);
              curFnNode_GSSCrs ? curFnNode_GSSCrs.nodes.push(selectorNode_xdRoDL) : topLevelTokens_WHQgBr.push(selectorNode_xdRoDL);
            }
            curPart_llmImn = "";
            let bracketStartIdx_dkkzay = idx_qYZyeC,
              bracketDepth_FLIcqj = 0;
            for (let bracketInnerIdx_tYLSKw = idx_qYZyeC + 1; bracketInnerIdx_tYLSKw < selectorStr_BdsHYa.length; bracketInnerIdx_tYLSKw++)
            if (charCode_BOptDL = selectorStr_BdsHYa.charCodeAt(bracketInnerIdx_tYLSKw), 91 !== charCode_BOptDL) {
              if (93 === charCode_BOptDL) {
                if (0 === bracketDepth_FLIcqj) {
                  idx_qYZyeC = bracketInnerIdx_tYLSKw;
                  break;
                }
                bracketDepth_FLIcqj--;
              }
            } else bracketDepth_FLIcqj++;
            curPart_llmImn += selectorStr_BdsHYa.slice(bracketStartIdx_dkkzay, idx_qYZyeC + 1);
            break;
          }
        case 39:
        case 34:{
            let quoteStartIdx_xOuitV = idx_qYZyeC;
            for (let quoteEndIdx_rIRzBg = idx_qYZyeC + 1; quoteEndIdx_rIRzBg < selectorStr_BdsHYa.length; quoteEndIdx_rIRzBg++)
            if (charCode_BOptDL = selectorStr_BdsHYa.charCodeAt(quoteEndIdx_rIRzBg), 92 === charCode_BOptDL) quoteEndIdx_rIRzBg += 1;else
            if (charCode_BOptDL === ch_ImrVcX) {
              idx_qYZyeC = quoteEndIdx_rIRzBg;
              break;
            }
            curPart_llmImn += selectorStr_BdsHYa.slice(quoteStartIdx_xOuitV, idx_qYZyeC + 1);
            break;
          }
        case 92:{
            let escapedCharCode_xRzRrB = selectorStr_BdsHYa.charCodeAt(idx_qYZyeC + 1);
            curPart_llmImn += String.fromCharCode(ch_ImrVcX) + String.fromCharCode(escapedCharCode_xRzRrB), idx_qYZyeC += 1;
            break;
          }
        default:
          curPart_llmImn += String.fromCharCode(ch_ImrVcX);
      }
    }
    return curPart_llmImn.length > 0 && topLevelTokens_WHQgBr.push(makeSelectorNode_uWQEtI(curPart_llmImn)), topLevelTokens_WHQgBr;
  }
  var validThemeKeyPattern_FToAJj = /^[a-z@][a-zA-Z0-9/%._-]*$/;
  function parseDesignSystem_GdazHY({
    designSystem: designSystem_sDbhnX,
    ast: ast_rjVaZz,
    resolvedConfig: resolvedConfig_pwmwji,
    featuresRef: featuresRef_HtCpIK,
    referenceMode: referenceMode_iezbNy
  }) {
    let api_OHwywD = {
      addBase(baseObj_Wpihrx) {
        if (referenceMode_iezbNy) return;
        let baseAst_GNQATC = convertCssObjectToAst_vkQKFO(baseObj_Wpihrx);
        featuresRef_HtCpIK.current |= evaluateThemeFunctions_XAqelQ(baseAst_GNQATC, designSystem_sDbhnX), ast_rjVaZz.push(processAtRule_lWgxgY("@layer", "base", baseAst_GNQATC));
      },
      addVariant(name_zlVpAT, variantVal_kfBrYU) {
        if (!variantGroupRegex_aHueMa.test(name_zlVpAT))
        throw new Error(
          `\`addVariant('${name_zlVpAT}')\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`
        );
        "string" == typeof variantVal_kfBrYU || Array.isArray(variantVal_kfBrYU) ?
        designSystem_sDbhnX.variants.static(
          name_zlVpAT,
          (variantAst_YgSpwf) => {
            variantAst_YgSpwf.nodes = parseSelectorWithSlot_OCwTqz(variantVal_kfBrYU, variantAst_YgSpwf.nodes);
          },
          { compounds: getCompoundsNumber_NglmcN("string" == typeof variantVal_kfBrYU ? [variantVal_kfBrYU] : variantVal_kfBrYU) }
        ) :
        "object" == typeof variantVal_kfBrYU && designSystem_sDbhnX.variants.fromAst(name_zlVpAT, convertCssObjectToAst_vkQKFO(variantVal_kfBrYU));
      },
      matchVariant(name_NHlRcr, variantFn_aFaZwx, options_FOJFfw) {
        function mapVariant_TFdWFI(value_SqaaKS, modifier_yDItay, nodes_xvGuqK) {
          return parseSelectorWithSlot_OCwTqz(variantFn_aFaZwx(value_SqaaKS, { modifier: modifier_yDItay?.value ?? null }), nodes_xvGuqK);
        }
        let valueOrder_MzzvOM = Object.keys(options_FOJFfw?.values ?? {});
        designSystem_sDbhnX.variants.group(
          () => {
            designSystem_sDbhnX.variants.functional(name_NHlRcr, (variantAst_PqnMdt, arg_xeAasa) => {
              if (!arg_xeAasa.value)
              return options_FOJFfw?.values && "DEFAULT" in options_FOJFfw.values ?
              void (variantAst_PqnMdt.nodes = mapVariant_TFdWFI(options_FOJFfw.values.DEFAULT, arg_xeAasa.modifier, variantAst_PqnMdt.nodes)) :
              null;
              if ("arbitrary" === arg_xeAasa.value.kind)
              variantAst_PqnMdt.nodes = mapVariant_TFdWFI(arg_xeAasa.value.value, arg_xeAasa.modifier, variantAst_PqnMdt.nodes);else
              if ("named" === arg_xeAasa.value.kind && options_FOJFfw?.values) {
                let lookupVal_aeCFib = options_FOJFfw.values[arg_xeAasa.value.value];
                if ("string" != typeof lookupVal_aeCFib) return;
                variantAst_PqnMdt.nodes = mapVariant_TFdWFI(lookupVal_aeCFib, arg_xeAasa.modifier, variantAst_PqnMdt.nodes);
              }
            });
          },
          (a_znwAxp, b_ZFYNWl) => {
            if ("functional" !== a_znwAxp.kind || "functional" !== b_ZFYNWl.kind) return 0;
            let aval_rGHAyq = a_znwAxp.value ? a_znwAxp.value.value : "DEFAULT",
              bval_lPyHqw = b_ZFYNWl.value ? b_ZFYNWl.value.value : "DEFAULT",
              asortVal_EtCRRK = options_FOJFfw?.values?.[aval_rGHAyq] ?? aval_rGHAyq,
              bsortVal_lCWWfU = options_FOJFfw?.values?.[bval_lPyHqw] ?? bval_lPyHqw;
            if (options_FOJFfw && "function" == typeof options_FOJFfw.sort)
            return options_FOJFfw.sort(
              { value: asortVal_EtCRRK, modifier: a_znwAxp.modifier?.value ?? null },
              { value: bsortVal_lCWWfU, modifier: b_ZFYNWl.modifier?.value ?? null }
            );
            let aIdx_NIQQKq = valueOrder_MzzvOM.indexOf(aval_rGHAyq),
              bIdx_KkbfsP = valueOrder_MzzvOM.indexOf(bval_lPyHqw);
            return (
              aIdx_NIQQKq = -1 === aIdx_NIQQKq ? valueOrder_MzzvOM.length : aIdx_NIQQKq,
              bIdx_KkbfsP = -1 === bIdx_KkbfsP ? valueOrder_MzzvOM.length : bIdx_KkbfsP,
              aIdx_NIQQKq !== bIdx_KkbfsP ? aIdx_NIQQKq - bIdx_KkbfsP : asortVal_EtCRRK < bsortVal_lCWWfU ? -1 : 1);

          }
        );
      },
      addUtilities(utilitiesObj_BnFugA) {
        let utilityArr_pCCoAC = (utilitiesObj_BnFugA = Array.isArray(utilitiesObj_BnFugA) ? utilitiesObj_BnFugA : [utilitiesObj_BnFugA]).flatMap((utilDict_wnlrKR) =>
        Object.entries(utilDict_wnlrKR)
        );
        utilityArr_pCCoAC = utilityArr_pCCoAC.flatMap(([selector_LTfEyX, value_QuAGLX]) => splitOnTopLevel_EfBwUv(selector_LTfEyX, ",").map((sel_HXWisA) => [sel_HXWisA.trim(), value_QuAGLX]));
        let selectorToNodes_bcQirz = new DefaultMap_bDuRsR(() => []);
        for (let [selector_wxHkgK, val_vXwlNu] of utilityArr_pCCoAC) {
          if (selector_wxHkgK.startsWith("@keyframes ")) {
            referenceMode_iezbNy || ast_rjVaZz.push(parseCSSRule_QVgHxe(selector_wxHkgK, convertCssObjectToAst_vkQKFO(val_vXwlNu)));
            continue;
          }
          let parsedSelectorAst_tIDJNt = parseAST_JyRCbf(selector_wxHkgK),
            validFound_ttNCxB = !1;
          if (
          walkASTRecursive_cYRtvS(parsedSelectorAst_tIDJNt, (astNode_qNkBbO) => {
            if (
            "selector" === astNode_qNkBbO.kind &&
            "." === astNode_qNkBbO.value[0] &&
            validThemeKeyPattern_FToAJj.test(astNode_qNkBbO.value.slice(1)))
            {
              let classSelector_tUValU = astNode_qNkBbO.value;
              astNode_qNkBbO.value = "&";
              let selectorString_eYeqaD = stringifyAST_WMAmQS(parsedSelectorAst_tIDJNt),
                bareSelector_tftujR = classSelector_tUValU.slice(1),
                injectedValAsts_yobpnE = "&" === selectorString_eYeqaD ? convertCssObjectToAst_vkQKFO(val_vXwlNu) : [parseCSSRule_QVgHxe(selectorString_eYeqaD, convertCssObjectToAst_vkQKFO(val_vXwlNu))];
              return selectorToNodes_bcQirz.get(bareSelector_tftujR).push(...injectedValAsts_yobpnE), validFound_ttNCxB = !0, void (astNode_qNkBbO.value = classSelector_tUValU);
            }
            if ("function" === astNode_qNkBbO.kind && ":not" === astNode_qNkBbO.value) return 1;
          }),
          !validFound_ttNCxB)

          throw new Error(
            `\`addUtilities({ '${selector_wxHkgK}' : … })\` defines an invalid utility selector. Utilities must be a single class name and start with a lowercase letter, eg. \`.scrollbar-none\`.`
          );
        }
        for (let [classSelector_sXfvyW, astArr_MregZL] of selectorToNodes_bcQirz)
        designSystem_sDbhnX.theme.prefix &&
        walkASTRecursive_YoBVFs(astArr_MregZL, (ruleNode_sPZixK) => {
          if ("rule" === ruleNode_sPZixK.kind) {
            let parsedSelAst_qPgnit = parseAST_JyRCbf(ruleNode_sPZixK.selector);
            walkASTRecursive_cYRtvS(parsedSelAst_qPgnit, (selAstNode_bLoqea) => {
              "selector" === selAstNode_bLoqea.kind &&
              "." === selAstNode_bLoqea.value[0] && (
              selAstNode_bLoqea.value = `.${designSystem_sDbhnX.theme.prefix}\\:${selAstNode_bLoqea.value.slice(1)}`);
            }),
            ruleNode_sPZixK.selector = stringifyAST_WMAmQS(parsedSelAst_qPgnit);
          }
        }),
        designSystem_sDbhnX.utilities.static(classSelector_sXfvyW, (utilNode_zVakMI) => {
          let clonedNodes_ubgoUy = structuredClone(astArr_MregZL);
          return replaceClassSelectors_pLrsKY(clonedNodes_ubgoUy, classSelector_sXfvyW, utilNode_zVakMI.raw), featuresRef_HtCpIK.current |= applyAtRuleProcessing_TKjlCh(clonedNodes_ubgoUy, designSystem_sDbhnX), clonedNodes_ubgoUy;
        });
      },
      matchUtilities(utilitiesFnObj_ntZIyO, options_gOFlEG) {
        let typesArr_dxDEpw = options_gOFlEG?.type ?
        Array.isArray(options_gOFlEG?.type) ?
        options_gOFlEG.type :
        [options_gOFlEG.type] :
        ["any"];
        for (let [utilName_cIsSEt, compileFn_gJUQSP] of Object.entries(utilitiesFnObj_ntZIyO)) {
          let makeCompileFunc_vitSXK = function ({ negative: negative_mixKAV }) {
            return (arg_RjcRrl) => {
              if (
              "arbitrary" === arg_RjcRrl.value?.kind &&
              typesArr_dxDEpw.length > 0 &&
              !typesArr_dxDEpw.includes("any") && (
              arg_RjcRrl.value.dataType && !typesArr_dxDEpw.includes(arg_RjcRrl.value.dataType) ||
              !arg_RjcRrl.value.dataType && !resolveCssType_DhcVtf(arg_RjcRrl.value.value, typesArr_dxDEpw)))

              return;
              let modifierValue_JOrBnv,
                isColor_WZoLsI = typesArr_dxDEpw.includes("color"),
                lookupValue_VgorwM = null,
                fractionFallbackUsed_cUOfzK = !1;
              {
                let lookupDict_UHvOFW = options_gOFlEG?.values ?? {};
                isColor_WZoLsI && (
                lookupDict_UHvOFW = Object.assign(
                  {
                    inherit: "inherit",
                    transparent: "transparent",
                    current: "currentcolor"
                  },
                  lookupDict_UHvOFW
                )),
                arg_RjcRrl.value ?
                "arbitrary" === arg_RjcRrl.value.kind ?
                lookupValue_VgorwM = arg_RjcRrl.value.value :
                arg_RjcRrl.value.fraction && lookupDict_UHvOFW[arg_RjcRrl.value.fraction] ? (
                lookupValue_VgorwM = lookupDict_UHvOFW[arg_RjcRrl.value.fraction], fractionFallbackUsed_cUOfzK = !0) :
                lookupDict_UHvOFW[arg_RjcRrl.value.value] ?
                lookupValue_VgorwM = lookupDict_UHvOFW[arg_RjcRrl.value.value] :
                lookupDict_UHvOFW.__BARE_VALUE__ && (
                lookupValue_VgorwM = lookupDict_UHvOFW.__BARE_VALUE__(arg_RjcRrl.value) ?? null,
                fractionFallbackUsed_cUOfzK =
                (null !== arg_RjcRrl.value.fraction && lookupValue_VgorwM?.includes("/")) ??
                !1) :
                lookupValue_VgorwM = lookupDict_UHvOFW.DEFAULT ?? null;
              }
              if (null === lookupValue_VgorwM) return;
              {
                let modifiers_deyjMH = options_gOFlEG?.modifiers ?? null;
                modifierValue_JOrBnv = arg_RjcRrl.modifier ?
                "any" === modifiers_deyjMH || "arbitrary" === arg_RjcRrl.modifier.kind ?
                arg_RjcRrl.modifier.value :
                modifiers_deyjMH?.[arg_RjcRrl.modifier.value] ?
                modifiers_deyjMH[arg_RjcRrl.modifier.value] :
                isColor_WZoLsI && !Number.isNaN(Number(arg_RjcRrl.modifier.value)) ?
                `${arg_RjcRrl.modifier.value}%` :
                null :
                null;
              }
              if (arg_RjcRrl.modifier && null === modifierValue_JOrBnv && !fractionFallbackUsed_cUOfzK)
              return "arbitrary" === arg_RjcRrl.value?.kind ? null : void 0;
              isColor_WZoLsI && null !== modifierValue_JOrBnv && (lookupValue_VgorwM = colorWithOpacityValue_xdDGmk(lookupValue_VgorwM, modifierValue_JOrBnv)), negative_mixKAV && (lookupValue_VgorwM = `calc(${lookupValue_VgorwM} * -1)`);
              let compiledAst_qKlnjV = convertCssObjectToAst_vkQKFO(compileFn_gJUQSP(lookupValue_VgorwM, { modifier: modifierValue_JOrBnv }));
              return replaceClassSelectors_pLrsKY(compiledAst_qKlnjV, utilName_cIsSEt, arg_RjcRrl.raw), featuresRef_HtCpIK.current |= applyAtRuleProcessing_TKjlCh(compiledAst_qKlnjV, designSystem_sDbhnX), compiledAst_qKlnjV;
            };
          };
          if (!validThemeKeyPattern_FToAJj.test(utilName_cIsSEt))
          throw new Error(
            `\`matchUtilities({ '${utilName_cIsSEt}' : … })\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter, eg. \`scrollbar\`.`
          );
          options_gOFlEG?.supportsNegativeValues &&
          designSystem_sDbhnX.utilities.functional(`-${utilName_cIsSEt}`, makeCompileFunc_vitSXK({ negative: !0 }), { types: typesArr_dxDEpw }),
          designSystem_sDbhnX.utilities.functional(utilName_cIsSEt, makeCompileFunc_vitSXK({ negative: !1 }), { types: typesArr_dxDEpw }),
          designSystem_sDbhnX.utilities.suggest(utilName_cIsSEt, () => {
            let valuesObj_gqRVzg = options_gOFlEG?.values ?? {},
              valsSet_gCTEgo = new Set(Object.keys(valuesObj_gqRVzg));
            valsSet_gCTEgo.delete("__BARE_VALUE__"),
            valsSet_gCTEgo.has("DEFAULT") && (valsSet_gCTEgo.delete("DEFAULT"), valsSet_gCTEgo.add(null));
            let modifiersObj_ibZMHb = options_gOFlEG?.modifiers ?? {},
              modifierList_EHhqlJ = "any" === modifiersObj_ibZMHb ? [] : Object.keys(modifiersObj_ibZMHb);
            return [
            {
              supportsNegative: options_gOFlEG?.supportsNegativeValues ?? !1,
              values: Array.from(valsSet_gCTEgo),
              modifiers: modifierList_EHhqlJ
            }];

          });
        }
      },
      addComponents(componentsObject_GFGcqp, options_eoZMHf) {
        this.addUtilities(componentsObject_GFGcqp, options_eoZMHf);
      },
      matchComponents(componentsFnObj_WurHDU, options_aomThu) {
        this.matchUtilities(componentsFnObj_WurHDU, options_aomThu);
      },
      theme: createThemeResolver_KrzbFZ(
        designSystem_sDbhnX,
        () => resolvedConfig_pwmwji.theme ?? {},
        (themeValue_dUgKwL) => themeValue_dUgKwL
      ),
      prefix: (prefixValue_zBRtOL) => prefixValue_zBRtOL,
      config(configKey_cVPUDp, fallbackValue_YlOLnK) {
        let currentConfig_bXAfbx = resolvedConfig_pwmwji;
        if (!configKey_cVPUDp) return currentConfig_bXAfbx;
        let configKeyParts_CuOriC = splitCandidateParts_uPtQPp(configKey_cVPUDp);
        for (let partIndex_sWHetn = 0; partIndex_sWHetn < configKeyParts_CuOriC.length; ++partIndex_sWHetn) {
          let partValue_nkWTaN = configKeyParts_CuOriC[partIndex_sWHetn];
          if (void 0 === currentConfig_bXAfbx[partValue_nkWTaN]) return fallbackValue_YlOLnK;
          currentConfig_bXAfbx = currentConfig_bXAfbx[partValue_nkWTaN];
        }
        return currentConfig_bXAfbx ?? fallbackValue_YlOLnK;
      }
    };
    return (
      api_OHwywD.addComponents = api_OHwywD.addComponents.bind(api_OHwywD),
      api_OHwywD.matchComponents = api_OHwywD.matchComponents.bind(api_OHwywD),
      api_OHwywD);

  }
  function convertCssObjectToAst_vkQKFO(cssObj_nyXaFG) {
    let astOut_IkvUzL = [],
      flatCssEntries_yqMBMg = (cssObj_nyXaFG = Array.isArray(cssObj_nyXaFG) ? cssObj_nyXaFG : [cssObj_nyXaFG]).flatMap((cssObjEntry_huyaby) => Object.entries(cssObjEntry_huyaby));
    for (let [key_BUMpcI, value_NJvaKR] of flatCssEntries_yqMBMg)
    if ("object" != typeof value_NJvaKR) {
      if (!key_BUMpcI.startsWith("--")) {
        if ("@slot" === value_NJvaKR) {
          astOut_IkvUzL.push(parseCSSRule_QVgHxe(key_BUMpcI, [processAtRule_lWgxgY("@slot")]));
          continue;
        }
        key_BUMpcI = key_BUMpcI.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
      astOut_IkvUzL.push(makeDeclarationNode_xYlaTt(key_BUMpcI, String(value_NJvaKR)));
    } else if (Array.isArray(value_NJvaKR))
    for (let arrVal_UuSLoC of value_NJvaKR)
    "string" == typeof arrVal_UuSLoC ? astOut_IkvUzL.push(makeDeclarationNode_xYlaTt(key_BUMpcI, arrVal_UuSLoC)) : astOut_IkvUzL.push(parseCSSRule_QVgHxe(key_BUMpcI, convertCssObjectToAst_vkQKFO(arrVal_UuSLoC)));else
    null !== value_NJvaKR && astOut_IkvUzL.push(parseCSSRule_QVgHxe(key_BUMpcI, convertCssObjectToAst_vkQKFO(value_NJvaKR)));
    return astOut_IkvUzL;
  }
  function parseSelectorWithSlot_OCwTqz(selectorInput_JeZFCd, nodeList_sSdksP) {
    return ("string" == typeof selectorInput_JeZFCd ? [selectorInput_JeZFCd] : selectorInput_JeZFCd).flatMap((selectorString_sVUvOX) => {
      if (selectorString_sVUvOX.trim().endsWith("}")) {
        let parsedAst_cRUHcS = parseCSS_iwVxBN(selectorString_sVUvOX.replace("}", "{@slot}}"));
        return replaceSlotNodes_qXXmre(parsedAst_cRUHcS, nodeList_sSdksP), parsedAst_cRUHcS;
      }
      return parseCSSRule_QVgHxe(selectorString_sVUvOX, nodeList_sSdksP);
    });
  }
  function replaceClassSelectors_pLrsKY(astList_pzIQsV, originalClass_qphSmV, replaceValue_BzJezP) {
    walkASTRecursive_YoBVFs(astList_pzIQsV, (node_xAkuOY) => {
      if ("rule" === node_xAkuOY.kind) {
        let selectorAst_oZxyXR = parseAST_JyRCbf(node_xAkuOY.selector);
        walkASTRecursive_cYRtvS(selectorAst_oZxyXR, (astNode_KFflrF) => {
          "selector" === astNode_KFflrF.kind &&
          astNode_KFflrF.value === `.${originalClass_qphSmV}` && (
          astNode_KFflrF.value = `.${cssEscape_aDBdYz(replaceValue_BzJezP)}`);
        }),
        node_xAkuOY.selector = stringifyAST_WMAmQS(selectorAst_oZxyXR);
      }
    });
  }
  function injectKeyframes_YkbbuX(runtimeTheme_YVvyri, config_jhKNwI, options_GQisft) {
    for (let keyframesAst_TelpYH of function (config_FsFXqv) {
      let keyframesAstArray_JnOwTv = [];
      if ("keyframes" in config_FsFXqv.theme)
      for (let [keyframesName_Pkhiuh, keyframesDef_Pzkljo] of Object.entries(config_FsFXqv.theme.keyframes))
      keyframesAstArray_JnOwTv.push(processAtRule_lWgxgY("@keyframes", keyframesName_Pkhiuh, convertCssObjectToAst_vkQKFO(keyframesDef_Pzkljo)));
      return keyframesAstArray_JnOwTv;
    }(config_jhKNwI))
    runtimeTheme_YVvyri.theme.addKeyframes(keyframesAst_TelpYH);
  }
  var oklchDefaultColorPalette_yZkpCg = {
    inherit: "inherit",
    current: "currentcolor",
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    slate: {
      50: "oklch(98.4% 0.003 247.858)",
      100: "oklch(96.8% 0.007 247.896)",
      200: "oklch(92.9% 0.013 255.508)",
      300: "oklch(86.9% 0.022 252.894)",
      400: "oklch(70.4% 0.04 256.788)",
      500: "oklch(55.4% 0.046 257.417)",
      600: "oklch(44.6% 0.043 257.281)",
      700: "oklch(37.2% 0.044 257.287)",
      800: "oklch(27.9% 0.041 260.031)",
      900: "oklch(20.8% 0.042 265.755)",
      950: "oklch(12.9% 0.042 264.695)"
    },
    gray: {
      50: "oklch(98.5% 0.002 247.839)",
      100: "oklch(96.7% 0.003 264.542)",
      200: "oklch(92.8% 0.006 264.531)",
      300: "oklch(87.2% 0.01 258.338)",
      400: "oklch(70.7% 0.022 261.325)",
      500: "oklch(55.1% 0.027 264.364)",
      600: "oklch(44.6% 0.03 256.802)",
      700: "oklch(37.3% 0.034 259.733)",
      800: "oklch(27.8% 0.033 256.848)",
      900: "oklch(21% 0.034 264.665)",
      950: "oklch(13% 0.028 261.692)"
    },
    zinc: {
      50: "oklch(98.5% 0 0)",
      100: "oklch(96.7% 0.001 286.375)",
      200: "oklch(92% 0.004 286.32)",
      300: "oklch(87.1% 0.006 286.286)",
      400: "oklch(70.5% 0.015 286.067)",
      500: "oklch(55.2% 0.016 285.938)",
      600: "oklch(44.2% 0.017 285.786)",
      700: "oklch(37% 0.013 285.805)",
      800: "oklch(27.4% 0.006 286.033)",
      900: "oklch(21% 0.006 285.885)",
      950: "oklch(14.1% 0.005 285.823)"
    },
    neutral: {
      50: "oklch(98.5% 0 0)",
      100: "oklch(97% 0 0)",
      200: "oklch(92.2% 0 0)",
      300: "oklch(87% 0 0)",
      400: "oklch(70.8% 0 0)",
      500: "oklch(55.6% 0 0)",
      600: "oklch(43.9% 0 0)",
      700: "oklch(37.1% 0 0)",
      800: "oklch(26.9% 0 0)",
      900: "oklch(20.5% 0 0)",
      950: "oklch(14.5% 0 0)"
    },
    stone: {
      50: "oklch(98.5% 0.001 106.423)",
      100: "oklch(97% 0.001 106.424)",
      200: "oklch(92.3% 0.003 48.717)",
      300: "oklch(86.9% 0.005 56.366)",
      400: "oklch(70.9% 0.01 56.259)",
      500: "oklch(55.3% 0.013 58.071)",
      600: "oklch(44.4% 0.011 73.639)",
      700: "oklch(37.4% 0.01 67.558)",
      800: "oklch(26.8% 0.007 34.298)",
      900: "oklch(21.6% 0.006 56.043)",
      950: "oklch(14.7% 0.004 49.25)"
    },
    red: {
      50: "oklch(97.1% 0.013 17.38)",
      100: "oklch(93.6% 0.032 17.717)",
      200: "oklch(88.5% 0.062 18.334)",
      300: "oklch(80.8% 0.114 19.571)",
      400: "oklch(70.4% 0.191 22.216)",
      500: "oklch(63.7% 0.237 25.331)",
      600: "oklch(57.7% 0.245 27.325)",
      700: "oklch(50.5% 0.213 27.518)",
      800: "oklch(44.4% 0.177 26.899)",
      900: "oklch(39.6% 0.141 25.723)",
      950: "oklch(25.8% 0.092 26.042)"
    },
    orange: {
      50: "oklch(98% 0.016 73.684)",
      100: "oklch(95.4% 0.038 75.164)",
      200: "oklch(90.1% 0.076 70.697)",
      300: "oklch(83.7% 0.128 66.29)",
      400: "oklch(75% 0.183 55.934)",
      500: "oklch(70.5% 0.213 47.604)",
      600: "oklch(64.6% 0.222 41.116)",
      700: "oklch(55.3% 0.195 38.402)",
      800: "oklch(47% 0.157 37.304)",
      900: "oklch(40.8% 0.123 38.172)",
      950: "oklch(26.6% 0.079 36.259)"
    },
    amber: {
      50: "oklch(98.7% 0.022 95.277)",
      100: "oklch(96.2% 0.059 95.617)",
      200: "oklch(92.4% 0.12 95.746)",
      300: "oklch(87.9% 0.169 91.605)",
      400: "oklch(82.8% 0.189 84.429)",
      500: "oklch(76.9% 0.188 70.08)",
      600: "oklch(66.6% 0.179 58.318)",
      700: "oklch(55.5% 0.163 48.998)",
      800: "oklch(47.3% 0.137 46.201)",
      900: "oklch(41.4% 0.112 45.904)",
      950: "oklch(27.9% 0.077 45.635)"
    },
    yellow: {
      50: "oklch(98.7% 0.026 102.212)",
      100: "oklch(97.3% 0.071 103.193)",
      200: "oklch(94.5% 0.129 101.54)",
      300: "oklch(90.5% 0.182 98.111)",
      400: "oklch(85.2% 0.199 91.936)",
      500: "oklch(79.5% 0.184 86.047)",
      600: "oklch(68.1% 0.162 75.834)",
      700: "oklch(55.4% 0.135 66.442)",
      800: "oklch(47.6% 0.114 61.907)",
      900: "oklch(42.1% 0.095 57.708)",
      950: "oklch(28.6% 0.066 53.813)"
    },
    lime: {
      50: "oklch(98.6% 0.031 120.757)",
      100: "oklch(96.7% 0.067 122.328)",
      200: "oklch(93.8% 0.127 124.321)",
      300: "oklch(89.7% 0.196 126.665)",
      400: "oklch(84.1% 0.238 128.85)",
      500: "oklch(76.8% 0.233 130.85)",
      600: "oklch(64.8% 0.2 131.684)",
      700: "oklch(53.2% 0.157 131.589)",
      800: "oklch(45.3% 0.124 130.933)",
      900: "oklch(40.5% 0.101 131.063)",
      950: "oklch(27.4% 0.072 132.109)"
    },
    green: {
      50: "oklch(98.2% 0.018 155.826)",
      100: "oklch(96.2% 0.044 156.743)",
      200: "oklch(92.5% 0.084 155.995)",
      300: "oklch(87.1% 0.15 154.449)",
      400: "oklch(79.2% 0.209 151.711)",
      500: "oklch(72.3% 0.219 149.579)",
      600: "oklch(62.7% 0.194 149.214)",
      700: "oklch(52.7% 0.154 150.069)",
      800: "oklch(44.8% 0.119 151.328)",
      900: "oklch(39.3% 0.095 152.535)",
      950: "oklch(26.6% 0.065 152.934)"
    },
    emerald: {
      50: "oklch(97.9% 0.021 166.113)",
      100: "oklch(95% 0.052 163.051)",
      200: "oklch(90.5% 0.093 164.15)",
      300: "oklch(84.5% 0.143 164.978)",
      400: "oklch(76.5% 0.177 163.223)",
      500: "oklch(69.6% 0.17 162.48)",
      600: "oklch(59.6% 0.145 163.225)",
      700: "oklch(50.8% 0.118 165.612)",
      800: "oklch(43.2% 0.095 166.913)",
      900: "oklch(37.8% 0.077 168.94)",
      950: "oklch(26.2% 0.051 172.552)"
    },
    teal: {
      50: "oklch(98.4% 0.014 180.72)",
      100: "oklch(95.3% 0.051 180.801)",
      200: "oklch(91% 0.096 180.426)",
      300: "oklch(85.5% 0.138 181.071)",
      400: "oklch(77.7% 0.152 181.912)",
      500: "oklch(70.4% 0.14 182.503)",
      600: "oklch(60% 0.118 184.704)",
      700: "oklch(51.1% 0.096 186.391)",
      800: "oklch(43.7% 0.078 188.216)",
      900: "oklch(38.6% 0.063 188.416)",
      950: "oklch(27.7% 0.046 192.524)"
    },
    cyan: {
      50: "oklch(98.4% 0.019 200.873)",
      100: "oklch(95.6% 0.045 203.388)",
      200: "oklch(91.7% 0.08 205.041)",
      300: "oklch(86.5% 0.127 207.078)",
      400: "oklch(78.9% 0.154 211.53)",
      500: "oklch(71.5% 0.143 215.221)",
      600: "oklch(60.9% 0.126 221.723)",
      700: "oklch(52% 0.105 223.128)",
      800: "oklch(45% 0.085 224.283)",
      900: "oklch(39.8% 0.07 227.392)",
      950: "oklch(30.2% 0.056 229.695)"
    },
    sky: {
      50: "oklch(97.7% 0.013 236.62)",
      100: "oklch(95.1% 0.026 236.824)",
      200: "oklch(90.1% 0.058 230.902)",
      300: "oklch(82.8% 0.111 230.318)",
      400: "oklch(74.6% 0.16 232.661)",
      500: "oklch(68.5% 0.169 237.323)",
      600: "oklch(58.8% 0.158 241.966)",
      700: "oklch(50% 0.134 242.749)",
      800: "oklch(44.3% 0.11 240.79)",
      900: "oklch(39.1% 0.09 240.876)",
      950: "oklch(29.3% 0.066 243.157)"
    },
    blue: {
      50: "oklch(97% 0.014 254.604)",
      100: "oklch(93.2% 0.032 255.585)",
      200: "oklch(88.2% 0.059 254.128)",
      300: "oklch(80.9% 0.105 251.813)",
      400: "oklch(70.7% 0.165 254.624)",
      500: "oklch(62.3% 0.214 259.815)",
      600: "oklch(54.6% 0.245 262.881)",
      700: "oklch(48.8% 0.243 264.376)",
      800: "oklch(42.4% 0.199 265.638)",
      900: "oklch(37.9% 0.146 265.522)",
      950: "oklch(28.2% 0.091 267.935)"
    },
    indigo: {
      50: "oklch(96.2% 0.018 272.314)",
      100: "oklch(93% 0.034 272.788)",
      200: "oklch(87% 0.065 274.039)",
      300: "oklch(78.5% 0.115 274.713)",
      400: "oklch(67.3% 0.182 276.935)",
      500: "oklch(58.5% 0.233 277.117)",
      600: "oklch(51.1% 0.262 276.966)",
      700: "oklch(45.7% 0.24 277.023)",
      800: "oklch(39.8% 0.195 277.366)",
      900: "oklch(35.9% 0.144 278.697)",
      950: "oklch(25.7% 0.09 281.288)"
    },
    violet: {
      50: "oklch(96.9% 0.016 293.756)",
      100: "oklch(94.3% 0.029 294.588)",
      200: "oklch(89.4% 0.057 293.283)",
      300: "oklch(81.1% 0.111 293.571)",
      400: "oklch(70.2% 0.183 293.541)",
      500: "oklch(60.6% 0.25 292.717)",
      600: "oklch(54.1% 0.281 293.009)",
      700: "oklch(49.1% 0.27 292.581)",
      800: "oklch(43.2% 0.232 292.759)",
      900: "oklch(38% 0.189 293.745)",
      950: "oklch(28.3% 0.141 291.089)"
    },
    purple: {
      50: "oklch(97.7% 0.014 308.299)",
      100: "oklch(94.6% 0.033 307.174)",
      200: "oklch(90.2% 0.063 306.703)",
      300: "oklch(82.7% 0.119 306.383)",
      400: "oklch(71.4% 0.203 305.504)",
      500: "oklch(62.7% 0.265 303.9)",
      600: "oklch(55.8% 0.288 302.321)",
      700: "oklch(49.6% 0.265 301.924)",
      800: "oklch(43.8% 0.218 303.724)",
      900: "oklch(38.1% 0.176 304.987)",
      950: "oklch(29.1% 0.149 302.717)"
    },
    fuchsia: {
      50: "oklch(97.7% 0.017 320.058)",
      100: "oklch(95.2% 0.037 318.852)",
      200: "oklch(90.3% 0.076 319.62)",
      300: "oklch(83.3% 0.145 321.434)",
      400: "oklch(74% 0.238 322.16)",
      500: "oklch(66.7% 0.295 322.15)",
      600: "oklch(59.1% 0.293 322.896)",
      700: "oklch(51.8% 0.253 323.949)",
      800: "oklch(45.2% 0.211 324.591)",
      900: "oklch(40.1% 0.17 325.612)",
      950: "oklch(29.3% 0.136 325.661)"
    },
    pink: {
      50: "oklch(97.1% 0.014 343.198)",
      100: "oklch(94.8% 0.028 342.258)",
      200: "oklch(89.9% 0.061 343.231)",
      300: "oklch(82.3% 0.12 346.018)",
      400: "oklch(71.8% 0.202 349.761)",
      500: "oklch(65.6% 0.241 354.308)",
      600: "oklch(59.2% 0.249 0.584)",
      700: "oklch(52.5% 0.223 3.958)",
      800: "oklch(45.9% 0.187 3.815)",
      900: "oklch(40.8% 0.153 2.432)",
      950: "oklch(28.4% 0.109 3.907)"
    },
    rose: {
      50: "oklch(96.9% 0.015 12.422)",
      100: "oklch(94.1% 0.03 12.58)",
      200: "oklch(89.2% 0.058 10.001)",
      300: "oklch(81% 0.117 11.638)",
      400: "oklch(71.2% 0.194 13.428)",
      500: "oklch(64.5% 0.246 16.439)",
      600: "oklch(58.6% 0.253 17.585)",
      700: "oklch(51.4% 0.222 16.935)",
      800: "oklch(45.5% 0.188 13.697)",
      900: "oklch(41% 0.159 10.272)",
      950: "oklch(27.1% 0.105 12.094)"
    }
  };
  function wrapBareValueHandler_ybILqj(fn_PXNHqq) {
    return { __BARE_VALUE__: fn_PXNHqq };
  }
  var bareValueColumns_YqJITC = wrapBareValueHandler_ybILqj((arg_whoHQP) => {
      if (isNonNegativeInteger_QISFSJ(arg_whoHQP.value)) return arg_whoHQP.value;
    }),
    bareValuePercent_hZSVlN = wrapBareValueHandler_ybILqj((arg_hCpUbO) => {
      if (isNonNegativeInteger_QISFSJ(arg_hCpUbO.value)) return `${arg_hCpUbO.value}%`;
    }),
    bareValuePx_bSXOqP = wrapBareValueHandler_ybILqj((arg_UsqAgv) => {
      if (isNonNegativeInteger_QISFSJ(arg_UsqAgv.value)) return `${arg_UsqAgv.value}px`;
    }),
    bareValueMilliseconds_WXugqI = wrapBareValueHandler_ybILqj((arg_xomjij) => {
      if (isNonNegativeInteger_QISFSJ(arg_xomjij.value)) return `${arg_xomjij.value}ms`;
    }),
    bareValueDegree_hjxtOu = wrapBareValueHandler_ybILqj((arg_oGYsFl) => {
      if (isNonNegativeInteger_QISFSJ(arg_oGYsFl.value)) return `${arg_oGYsFl.value}deg`;
    }),
    bareValueAspectRatio_AGmoIp = wrapBareValueHandler_ybILqj((arg_eSBPmF) => {
      if (null === arg_eSBPmF.fraction) return;
      let [num_kFgRJp, den_HrkdpS] = splitOnTopLevel_EfBwUv(arg_eSBPmF.fraction, "/");
      return isNonNegativeInteger_QISFSJ(num_kFgRJp) && isNonNegativeInteger_QISFSJ(den_HrkdpS) ? arg_eSBPmF.fraction : void 0;
    }),
    bareValueRepeat_FmuBEU = wrapBareValueHandler_ybILqj((arg_ObnJSU) => {
      if (isNonNegativeInteger_QISFSJ(Number(arg_ObnJSU.value))) return `repeat(${arg_ObnJSU.value}, minmax(0, 1fr))`;
    }),
    tailwindDefaultTheme_ywIoEw = {
      accentColor: ({ theme: theme_obpHYe }) => theme_obpHYe("colors"),
      animation: {
        none: "none",
        spin: "spin 1s linear infinite",
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite"
      },
      aria: {
        busy: 'busy="true"',
        checked: 'checked="true"',
        disabled: 'disabled="true"',
        expanded: 'expanded="true"',
        hidden: 'hidden="true"',
        pressed: 'pressed="true"',
        readonly: 'readonly="true"',
        required: 'required="true"',
        selected: 'selected="true"'
      },
      aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9", ...bareValueAspectRatio_AGmoIp },
      backdropBlur: ({ theme: theme_Tptkgf }) => theme_Tptkgf("blur"),
      backdropBrightness: ({ theme: theme_odByFW }) => ({ ...theme_odByFW("brightness"), ...bareValuePercent_hZSVlN }),
      backdropContrast: ({ theme: theme_uMlaUB }) => ({ ...theme_uMlaUB("contrast"), ...bareValuePercent_hZSVlN }),
      backdropGrayscale: ({ theme: theme_XGvKUn }) => ({ ...theme_XGvKUn("grayscale"), ...bareValuePercent_hZSVlN }),
      backdropHueRotate: ({ theme: theme_shpkFB }) => ({ ...theme_shpkFB("hueRotate"), ...bareValueDegree_hjxtOu }),
      backdropInvert: ({ theme: theme_FcqXlF }) => ({ ...theme_FcqXlF("invert"), ...bareValuePercent_hZSVlN }),
      backdropOpacity: ({ theme: theme_ywhFxy }) => ({ ...theme_ywhFxy("opacity"), ...bareValuePercent_hZSVlN }),
      backdropSaturate: ({ theme: theme_fiEISJ }) => ({ ...theme_fiEISJ("saturate"), ...bareValuePercent_hZSVlN }),
      backdropSepia: ({ theme: theme_oGCEcB }) => ({ ...theme_oGCEcB("sepia"), ...bareValuePercent_hZSVlN }),
      backgroundColor: ({ theme: theme_RtiCXU }) => theme_RtiCXU("colors"),
      backgroundImage: {
        none: "none",
        "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
        "gradient-to-tr":
        "linear-gradient(to top right, var(--tw-gradient-stops))",
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
        "gradient-to-br":
        "linear-gradient(to bottom right, var(--tw-gradient-stops))",
        "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
        "gradient-to-bl":
        "linear-gradient(to bottom left, var(--tw-gradient-stops))",
        "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
        "gradient-to-tl":
        "linear-gradient(to top left, var(--tw-gradient-stops))"
      },
      backgroundOpacity: ({ theme: theme_RqAznr }) => theme_RqAznr("opacity"),
      backgroundPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top"
      },
      backgroundSize: { auto: "auto", cover: "cover", contain: "contain" },
      blur: {
        0: "0",
        none: "",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px"
      },
      borderColor: ({ theme: theme_LrSmLD }) => ({
        DEFAULT: "currentcolor",
        ...theme_LrSmLD("colors")
      }),
      borderOpacity: ({ theme: theme_DMBHFF }) => theme_DMBHFF("opacity"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px"
      },
      borderSpacing: ({ theme: theme_sZxTPn }) => theme_sZxTPn("spacing"),
      borderWidth: {
        DEFAULT: "1px",
        0: "0px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...bareValuePx_bSXOqP
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none"
      },
      boxShadowColor: ({ theme: theme_WAouat }) => theme_WAouat("colors"),
      brightness: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        200: "2",
        ...bareValuePercent_hZSVlN
      },
      caretColor: ({ theme: theme_fYLouQ }) => theme_fYLouQ("colors"),
      colors: () => ({ ...oklchDefaultColorPalette_yZkpCg }),
      columns: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        "3xs": "16rem",
        "2xs": "18rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        ...bareValueColumns_YqJITC
      },
      container: {},
      content: { none: "none" },
      contrast: {
        0: "0",
        50: ".5",
        75: ".75",
        100: "1",
        125: "1.25",
        150: "1.5",
        200: "2",
        ...bareValuePercent_hZSVlN
      },
      cursor: {
        auto: "auto",
        default: "default",
        pointer: "pointer",
        wait: "wait",
        text: "text",
        move: "move",
        help: "help",
        "not-allowed": "not-allowed",
        none: "none",
        "context-menu": "context-menu",
        progress: "progress",
        cell: "cell",
        crosshair: "crosshair",
        "vertical-text": "vertical-text",
        alias: "alias",
        copy: "copy",
        "no-drop": "no-drop",
        grab: "grab",
        grabbing: "grabbing",
        "all-scroll": "all-scroll",
        "col-resize": "col-resize",
        "row-resize": "row-resize",
        "n-resize": "n-resize",
        "e-resize": "e-resize",
        "s-resize": "s-resize",
        "w-resize": "w-resize",
        "ne-resize": "ne-resize",
        "nw-resize": "nw-resize",
        "se-resize": "se-resize",
        "sw-resize": "sw-resize",
        "ew-resize": "ew-resize",
        "ns-resize": "ns-resize",
        "nesw-resize": "nesw-resize",
        "nwse-resize": "nwse-resize",
        "zoom-in": "zoom-in",
        "zoom-out": "zoom-out"
      },
      divideColor: ({ theme: theme_kdZoPS }) => theme_kdZoPS("borderColor"),
      divideOpacity: ({ theme: theme_qaAuNP }) => theme_qaAuNP("borderOpacity"),
      divideWidth: ({ theme: theme_CBcMbh }) => ({ ...theme_CBcMbh("borderWidth"), ...bareValuePx_bSXOqP }),
      dropShadow: {
        sm: "0 1px 1px rgb(0 0 0 / 0.05)",
        DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
        md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
        lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
        xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
        "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
        none: "0 0 #0000"
      },
      fill: ({ theme: theme_BsUoBg }) => theme_BsUoBg("colors"),
      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",
        initial: "0 1 auto",
        none: "none"
      },
      flexBasis: ({ theme: theme_GdnOlY }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        ...theme_GdnOlY("spacing")
      }),
      flexGrow: { 0: "0", DEFAULT: "1", ...bareValueColumns_YqJITC },
      flexShrink: { 0: "0", DEFAULT: "1", ...bareValueColumns_YqJITC },
      fontFamily: {
        sans: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'],

        serif: [
        "ui-serif",
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif"],

        mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace"]

      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }]
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900"
      },
      gap: ({ theme: theme_HBXxVP }) => theme_HBXxVP("spacing"),
      gradientColorStops: ({ theme: theme_ParZSZ }) => theme_ParZSZ("colors"),
      gradientColorStopPositions: {
        "0%": "0%",
        "5%": "5%",
        "10%": "10%",
        "15%": "15%",
        "20%": "20%",
        "25%": "25%",
        "30%": "30%",
        "35%": "35%",
        "40%": "40%",
        "45%": "45%",
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "65%": "65%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
        "95%": "95%",
        "100%": "100%",
        ...bareValuePercent_hZSVlN
      },
      grayscale: { 0: "0", DEFAULT: "100%", ...bareValuePercent_hZSVlN },
      gridAutoColumns: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)"
      },
      gridAutoRows: {
        auto: "auto",
        min: "min-content",
        max: "max-content",
        fr: "minmax(0, 1fr)"
      },
      gridColumn: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1"
      },
      gridColumnEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...bareValueColumns_YqJITC
      },
      gridColumnStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...bareValueColumns_YqJITC
      },
      gridRow: {
        auto: "auto",
        "span-1": "span 1 / span 1",
        "span-2": "span 2 / span 2",
        "span-3": "span 3 / span 3",
        "span-4": "span 4 / span 4",
        "span-5": "span 5 / span 5",
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
        "span-full": "1 / -1"
      },
      gridRowEnd: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...bareValueColumns_YqJITC
      },
      gridRowStart: {
        auto: "auto",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        ...bareValueColumns_YqJITC
      },
      gridTemplateColumns: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        ...bareValueRepeat_FmuBEU
      },
      gridTemplateRows: {
        none: "none",
        subgrid: "subgrid",
        1: "repeat(1, minmax(0, 1fr))",
        2: "repeat(2, minmax(0, 1fr))",
        3: "repeat(3, minmax(0, 1fr))",
        4: "repeat(4, minmax(0, 1fr))",
        5: "repeat(5, minmax(0, 1fr))",
        6: "repeat(6, minmax(0, 1fr))",
        7: "repeat(7, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        ...bareValueRepeat_FmuBEU
      },
      height: ({ theme: theme_EEKmAF }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...theme_EEKmAF("spacing")
      }),
      hueRotate: {
        0: "0deg",
        15: "15deg",
        30: "30deg",
        60: "60deg",
        90: "90deg",
        180: "180deg",
        ...bareValueDegree_hjxtOu
      },
      inset: ({ theme: theme_PNAuVM }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
        ...theme_PNAuVM("spacing")
      }),
      invert: { 0: "0", DEFAULT: "100%", ...bareValuePercent_hZSVlN },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } },
        pulse: { "50%": { opacity: ".5" } },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
          }
        }
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em"
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
        3: ".75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem"
      },
      listStyleType: { none: "none", disc: "disc", decimal: "decimal" },
      listStyleImage: { none: "none" },
      margin: ({ theme: theme_spJoYU }) => ({ auto: "auto", ...theme_spJoYU("spacing") }),
      lineClamp: { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", ...bareValueColumns_YqJITC },
      maxHeight: ({ theme: theme_euNKnp }) => ({
        none: "none",
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...theme_euNKnp("spacing")
      }),
      maxWidth: ({ theme: theme_StwrMr }) => ({
        none: "none",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch",
        ...theme_StwrMr("spacing")
      }),
      minHeight: ({ theme: theme_XXHOur }) => ({
        full: "100%",
        screen: "100vh",
        svh: "100svh",
        lvh: "100lvh",
        dvh: "100dvh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...theme_XXHOur("spacing")
      }),
      minWidth: ({ theme: theme_zmrSbs }) => ({
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...theme_zmrSbs("spacing")
      }),
      objectPosition: {
        bottom: "bottom",
        center: "center",
        left: "left",
        "left-bottom": "left bottom",
        "left-top": "left top",
        right: "right",
        "right-bottom": "right bottom",
        "right-top": "right top",
        top: "top"
      },
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        45: "0.45",
        50: "0.5",
        55: "0.55",
        60: "0.6",
        65: "0.65",
        70: "0.7",
        75: "0.75",
        80: "0.8",
        85: "0.85",
        90: "0.9",
        95: "0.95",
        100: "1",
        ...bareValuePercent_hZSVlN
      },
      order: {
        first: "-9999",
        last: "9999",
        none: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        ...bareValueColumns_YqJITC
      },
      outlineColor: ({ theme: theme_qeupfv }) => theme_qeupfv("colors"),
      outlineOffset: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...bareValuePx_bSXOqP
      },
      outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px", ...bareValuePx_bSXOqP },
      padding: ({ theme: theme_akOemu }) => theme_akOemu("spacing"),
      placeholderColor: ({ theme: theme_qWXgeL }) => theme_qWXgeL("colors"),
      placeholderOpacity: ({ theme: theme_uePtwE }) => theme_uePtwE("opacity"),
      ringColor: ({ theme: theme_VrAMLd }) => ({
        DEFAULT: "currentcolor",
        ...theme_VrAMLd("colors")
      }),
      ringOffsetColor: ({ theme: theme_fXCcxW }) => theme_fXCcxW("colors"),
      ringOffsetWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...bareValuePx_bSXOqP
      },
      ringOpacity: ({ theme: theme_uROhJs }) => ({ DEFAULT: "0.5", ...theme_uROhJs("opacity") }),
      ringWidth: {
        DEFAULT: "3px",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...bareValuePx_bSXOqP
      },
      rotate: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        45: "45deg",
        90: "90deg",
        180: "180deg",
        ...bareValueDegree_hjxtOu
      },
      saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2", ...bareValuePercent_hZSVlN },
      scale: {
        0: "0",
        50: ".5",
        75: ".75",
        90: ".9",
        95: ".95",
        100: "1",
        105: "1.05",
        110: "1.1",
        125: "1.25",
        150: "1.5",
        ...bareValuePercent_hZSVlN
      },
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem"
      },
      scrollMargin: ({ theme: theme_XSUJHR }) => theme_XSUJHR("spacing"),
      scrollPadding: ({ theme: theme_GopvYf }) => theme_GopvYf("spacing"),
      sepia: { 0: "0", DEFAULT: "100%", ...bareValuePercent_hZSVlN },
      skew: {
        0: "0deg",
        1: "1deg",
        2: "2deg",
        3: "3deg",
        6: "6deg",
        12: "12deg",
        ...bareValueDegree_hjxtOu
      },
      space: ({ theme: theme_eraHlc }) => theme_eraHlc("spacing"),
      spacing: {
        px: "1px",
        0: "0px",
        0.5: "0.125rem",
        1: "0.25rem",
        1.5: "0.375rem",
        2: "0.5rem",
        2.5: "0.625rem",
        3: "0.75rem",
        3.5: "0.875rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        72: "18rem",
        80: "20rem",
        96: "24rem"
      },
      stroke: ({ theme: theme_ZjyZnK }) => ({ none: "none", ...theme_ZjyZnK("colors") }),
      strokeWidth: { 0: "0", 1: "1", 2: "2", ...bareValueColumns_YqJITC },
      supports: {},
      data: {},
      textColor: ({ theme: themeGetterForTextColor_zBoroA }) => themeGetterForTextColor_zBoroA("colors"),
      textDecorationColor: ({ theme: themeGetterForTextDecorationColor_mTWQnp }) => themeGetterForTextDecorationColor_mTWQnp("colors"),
      textDecorationThickness: {
        auto: "auto",
        "from-font": "from-font",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...bareValuePx_bSXOqP
      },
      textIndent: ({ theme: themeGetterForTextIndent_kXftTE }) => themeGetterForTextIndent_kXftTE("spacing"),
      textOpacity: ({ theme: themeGetterForTextOpacity_ZqXHMH }) => themeGetterForTextOpacity_ZqXHMH("opacity"),
      textUnderlineOffset: {
        auto: "auto",
        0: "0px",
        1: "1px",
        2: "2px",
        4: "4px",
        8: "8px",
        ...bareValuePx_bSXOqP
      },
      transformOrigin: {
        center: "center",
        top: "top",
        "top-right": "top right",
        right: "right",
        "bottom-right": "bottom right",
        bottom: "bottom",
        "bottom-left": "bottom left",
        left: "left",
        "top-left": "top left"
      },
      transitionDelay: {
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
        ...bareValueMilliseconds_WXugqI
      },
      transitionDuration: {
        DEFAULT: "150ms",
        0: "0s",
        75: "75ms",
        100: "100ms",
        150: "150ms",
        200: "200ms",
        300: "300ms",
        500: "500ms",
        700: "700ms",
        1e3: "1000ms",
        ...bareValueMilliseconds_WXugqI
      },
      transitionProperty: {
        none: "none",
        all: "all",
        DEFAULT:
        "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
        colors:
        "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
        opacity: "opacity",
        shadow: "box-shadow",
        transform: "transform"
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        linear: "linear",
        in: "cubic-bezier(0.4, 0, 1, 1)",
        out: "cubic-bezier(0, 0, 0.2, 1)",
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      translate: ({ theme: themeGetterForTranslate_XZRIuG }) => ({
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        full: "100%",
        ...themeGetterForTranslate_XZRIuG("spacing")
      }),
      size: ({ theme: theme_YXHquR }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...theme_YXHquR("spacing")
      }),
      width: ({ theme: theme_jQLtSJ }) => ({
        auto: "auto",
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        full: "100%",
        screen: "100vw",
        svw: "100svw",
        lvw: "100lvw",
        dvw: "100dvw",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        ...theme_jQLtSJ("spacing")
      }),
      willChange: {
        auto: "auto",
        scroll: "scroll-position",
        contents: "contents",
        transform: "transform"
      },
      zIndex: {
        auto: "auto",
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        ...bareValueColumns_YqJITC
      }
    };
  function getTailwindDefaultThemeConfig_UraSti(themeGetter_pPLwFX) {
    return {
      theme: {
        ...tailwindDefaultTheme_ywIoEw,
        colors: ({ theme: themeGetterForColors_lVyblP }) => themeGetterForColors_lVyblP("color", {}),
        extend: {
          fontSize: ({ theme: themeGetterForTextFontSize_ZCajyc }) => ({ ...themeGetterForTextFontSize_ZCajyc("text", {}) }),
          boxShadow: ({ theme: themeGetterForBoxShadow_vZMPXL }) => ({ ...themeGetterForBoxShadow_vZMPXL("shadow", {}) }),
          animation: ({ theme: themeGetterForAnimation_lpnfPR }) => ({ ...themeGetterForAnimation_lpnfPR("animate", {}) }),
          aspectRatio: ({ theme: themeGetterForAspectRatio_oVMLzX }) => ({ ...themeGetterForAspectRatio_oVMLzX("aspect", {}) }),
          borderRadius: ({ theme: themeGetterForBorderRadius_tFvEGy }) => ({ ...themeGetterForBorderRadius_tFvEGy("radius", {}) }),
          screens: ({ theme: themeGetterForScreens_BdbMCv }) => ({ ...themeGetterForScreens_BdbMCv("breakpoint", {}) }),
          letterSpacing: ({ theme: themeGetterForLetterSpacing_Kjevcg }) => ({ ...themeGetterForLetterSpacing_Kjevcg("tracking", {}) }),
          lineHeight: ({ theme: themeGetterForLineHeight_hUbdWR }) => ({ ...themeGetterForLineHeight_hUbdWR("leading", {}) }),
          transitionDuration: {
            DEFAULT: themeGetter_pPLwFX.get(["--default-transition-duration"]) ?? null
          },
          transitionTimingFunction: {
            DEFAULT: themeGetter_pPLwFX.get(["--default-transition-timing-function"]) ?? null
          },
          maxWidth: ({ theme: theme_QFEFeo }) => ({ ...theme_QFEFeo("container", {}) })
        }
      }
    };
  }
  var defaultResultConfig_RoHcIu = {
    blocklist: [],
    future: {},
    prefix: "",
    important: !1,
    darkMode: null,
    theme: {},
    plugins: [],
    content: { files: [] }
  };
  function resolveTailwindConfig_FlEBPQ(design_tZbZky, configArr_SgrQXn) {
    let accum_VAfeTR = {
      design: design_tZbZky,
      configs: [],
      plugins: [],
      content: { files: [] },
      theme: {},
      extend: {},
      result: structuredClone(defaultResultConfig_RoHcIu)
    };
    for (let configObj_waHTZf of configArr_SgrQXn) flattenTailwindConfig_IKHbjw(accum_VAfeTR, configObj_waHTZf);
    for (let config_MjIbZE of accum_VAfeTR.configs)
    "darkMode" in config_MjIbZE &&
    void 0 !== config_MjIbZE.darkMode && (
    accum_VAfeTR.result.darkMode = config_MjIbZE.darkMode ?? null),
    "prefix" in config_MjIbZE &&
    void 0 !== config_MjIbZE.prefix && (
    accum_VAfeTR.result.prefix = config_MjIbZE.prefix ?? ""),
    "blocklist" in config_MjIbZE &&
    void 0 !== config_MjIbZE.blocklist && (
    accum_VAfeTR.result.blocklist = config_MjIbZE.blocklist ?? []),
    "important" in config_MjIbZE &&
    void 0 !== config_MjIbZE.important && (
    accum_VAfeTR.result.important = config_MjIbZE.important ?? !1);
    let themeKeys_lzjYLy = function (accum_dAcEHE) {
      let themeKeys_FDYDXq = new Set(),
        getter_cAAsnd = createThemeResolver_KrzbFZ(accum_dAcEHE.design, () => accum_dAcEHE.theme, resolveVal_ETXTfI),
        context_XkAcUV = Object.assign(getter_cAAsnd, { theme: getter_cAAsnd, colors: oklchDefaultColorPalette_yZkpCg });
      function resolveVal_ETXTfI(themeOption_ZmNGrJ) {
        return "function" == typeof themeOption_ZmNGrJ ? themeOption_ZmNGrJ(context_XkAcUV) ?? null : themeOption_ZmNGrJ ?? null;
      }
      for (let config_IpwUuM of accum_dAcEHE.configs) {
        let themeObj_EKQVhH = config_IpwUuM.theme ?? {},
          extendObj_VEhtSR = themeObj_EKQVhH.extend ?? {};
        for (let key_dcwAGd in themeObj_EKQVhH) "extend" !== key_dcwAGd && themeKeys_FDYDXq.add(key_dcwAGd);
        Object.assign(accum_dAcEHE.theme, themeObj_EKQVhH);
        for (let extKey_XWQQRL in extendObj_VEhtSR) accum_dAcEHE.extend[extKey_XWQQRL] ??= [], accum_dAcEHE.extend[extKey_XWQQRL].push(extendObj_VEhtSR[extKey_XWQQRL]);
      }
      delete accum_dAcEHE.theme.extend;
      for (let themeKey_KQIxGQ in accum_dAcEHE.extend) {
        let vals_PXSEKe = [accum_dAcEHE.theme[themeKey_KQIxGQ], ...accum_dAcEHE.extend[themeKey_KQIxGQ]];
        accum_dAcEHE.theme[themeKey_KQIxGQ] = () => mergeWithCustomizer_neEAgM({}, vals_PXSEKe.map(resolveVal_ETXTfI), extender_cfucvR);
      }
      for (let themeKey_CykDrT in accum_dAcEHE.theme) accum_dAcEHE.theme[themeKey_CykDrT] = resolveVal_ETXTfI(accum_dAcEHE.theme[themeKey_CykDrT]);
      if (accum_dAcEHE.theme.screens && "object" == typeof accum_dAcEHE.theme.screens)
      for (let screenKey_ZaVyAV of Object.keys(accum_dAcEHE.theme.screens)) {
        let screenDef_xvJCep = accum_dAcEHE.theme.screens[screenKey_ZaVyAV];
        screenDef_xvJCep &&
        "object" == typeof screenDef_xvJCep && (
        "raw" in screenDef_xvJCep ||
        "max" in screenDef_xvJCep ||
        "min" in screenDef_xvJCep && (accum_dAcEHE.theme.screens[screenKey_ZaVyAV] = screenDef_xvJCep.min));
      }
      return themeKeys_FDYDXq;
    }(accum_VAfeTR);
    return {
      resolvedConfig: {
        ...accum_VAfeTR.result,
        content: accum_VAfeTR.content,
        theme: accum_VAfeTR.theme,
        plugins: accum_VAfeTR.plugins
      },
      replacedThemeKeys: themeKeys_lzjYLy
    };
  }
  function extender_cfucvR(a_HsNJOA, b_umDhqb) {
    return Array.isArray(a_HsNJOA) && isPlainObject_IglcfM(a_HsNJOA[0]) ?
    a_HsNJOA.concat(b_umDhqb) :
    Array.isArray(b_umDhqb) && isPlainObject_IglcfM(b_umDhqb[0]) && isPlainObject_IglcfM(a_HsNJOA) ?
    [a_HsNJOA, ...b_umDhqb] :
    Array.isArray(b_umDhqb) ?
    b_umDhqb :
    void 0;
  }
  function flattenTailwindConfig_IKHbjw(accum_bhuPzZ, { config: config_HYRCbz, base: base_LxHElz, path: path_EeRUQR, reference: reference_zAekJF }) {
    let pluginsArr_NsfjJG = [];
    for (let plugin_yoQACb of config_HYRCbz.plugins ?? [])
    "__isOptionsFunction" in plugin_yoQACb ?
    pluginsArr_NsfjJG.push({ ...plugin_yoQACb(), reference: reference_zAekJF }) :
    "handler" in plugin_yoQACb ?
    pluginsArr_NsfjJG.push({ ...plugin_yoQACb, reference: reference_zAekJF }) :
    pluginsArr_NsfjJG.push({ handler: plugin_yoQACb, reference: reference_zAekJF });
    if (Array.isArray(config_HYRCbz.presets) && 0 === config_HYRCbz.presets.length)
    throw new Error(
      "Error in the config file/plugin/preset. An empty preset (`preset: []`) is not currently supported."
    );
    for (let preset_CQuqgK of config_HYRCbz.presets ?? [])
    flattenTailwindConfig_IKHbjw(accum_bhuPzZ, { path: path_EeRUQR, base: base_LxHElz, config: preset_CQuqgK, reference: reference_zAekJF });
    for (let pluginItem_xAEUEh of pluginsArr_NsfjJG)
    accum_bhuPzZ.plugins.push(pluginItem_xAEUEh),
    pluginItem_xAEUEh.config &&
    flattenTailwindConfig_IKHbjw(accum_bhuPzZ, {
      path: path_EeRUQR,
      base: base_LxHElz,
      config: pluginItem_xAEUEh.config,
      reference: !!pluginItem_xAEUEh.reference
    });
    let contentObj_oxlRLL = config_HYRCbz.content ?? [],
      filesArr_YhtDDD = Array.isArray(contentObj_oxlRLL) ? contentObj_oxlRLL : contentObj_oxlRLL.files;
    for (let item_YiUWIh of filesArr_YhtDDD)
    accum_bhuPzZ.content.files.push("object" == typeof item_YiUWIh ? item_YiUWIh : { base: base_LxHElz, pattern: item_YiUWIh });
    accum_bhuPzZ.configs.push(config_HYRCbz);
  }
  function injectContainerUtilities_LFSGga(configObj_iNAVho, context_IjGPbC) {
    let containerTheme_kpelGR = configObj_iNAVho.theme.container || {};
    if ("object" != typeof containerTheme_kpelGR || null === containerTheme_kpelGR) return;
    let containerAst_JhpfMW = function ({ center: center_oYqfNV, padding: padding_sqrAFG, screens: screens_eGmcPs }, ctx_IZrUPz) {
      let outNodes_YlzDcJ = [],
        mediaMap_ByzwRg = null;
      if (
      center_oYqfNV && outNodes_YlzDcJ.push(makeDeclarationNode_xYlaTt("margin-inline", "auto")),
      ("string" == typeof padding_sqrAFG ||
      "object" == typeof padding_sqrAFG && null !== padding_sqrAFG && "DEFAULT" in padding_sqrAFG) &&
      outNodes_YlzDcJ.push(makeDeclarationNode_xYlaTt("padding-inline", "string" == typeof padding_sqrAFG ? padding_sqrAFG : padding_sqrAFG.DEFAULT)),
      "object" == typeof screens_eGmcPs && null !== screens_eGmcPs)
      {
        mediaMap_ByzwRg = new Map();
        let breakpointList_BivAKm = Array.from(ctx_IZrUPz.theme.namespace("--breakpoint").entries());
        if (breakpointList_BivAKm.sort((a_ZbJePb, b_oqbjSa) => compareWithOrder_AnSyON(a_ZbJePb[1], b_oqbjSa[1], "asc")), breakpointList_BivAKm.length > 0) {
          let [firstKey_mdcXuI] = breakpointList_BivAKm[0];
          outNodes_YlzDcJ.push(
            processAtRule_lWgxgY("@media", `(width >= --theme(--breakpoint-${firstKey_mdcXuI}))`, [
            makeDeclarationNode_xYlaTt("max-width", "none")]
            )
          );
        }
        for (let [breakpointKey_oOMKxs, breakpointVal_VUvMJx] of Object.entries(screens_eGmcPs)) {
          if ("object" == typeof breakpointVal_VUvMJx) {
            if (!("min" in breakpointVal_VUvMJx)) continue;
            breakpointVal_VUvMJx = breakpointVal_VUvMJx.min;
          }
          mediaMap_ByzwRg.set(breakpointKey_oOMKxs, processAtRule_lWgxgY("@media", `(width >= ${breakpointVal_VUvMJx})`, [makeDeclarationNode_xYlaTt("max-width", breakpointVal_VUvMJx)]));
        }
      }
      if ("object" == typeof padding_sqrAFG && null !== padding_sqrAFG) {
        let paddingList_DEpgdB = Object.entries(padding_sqrAFG).
        filter(([name_OMBwVN]) => "DEFAULT" !== name_OMBwVN).
        map(([name_oayJdD, val_dNIern]) => [name_oayJdD, ctx_IZrUPz.theme.resolveValue(name_oayJdD, ["--breakpoint"]), val_dNIern]).
        filter(Boolean);
        paddingList_DEpgdB.sort((a_mvGzok, b_JBveCX) => compareWithOrder_AnSyON(a_mvGzok[1], b_JBveCX[1], "asc"));
        for (let [breakpointKey_oeZlKQ,, val_RZSKnE] of paddingList_DEpgdB)
        if (mediaMap_ByzwRg && mediaMap_ByzwRg.has(breakpointKey_oeZlKQ)) mediaMap_ByzwRg.get(breakpointKey_oeZlKQ).nodes.push(makeDeclarationNode_xYlaTt("padding-inline", val_RZSKnE));else
        {
          if (mediaMap_ByzwRg) continue;
          outNodes_YlzDcJ.push(
            processAtRule_lWgxgY("@media", `(width >= theme(--breakpoint-${breakpointKey_oeZlKQ}))`, [
            makeDeclarationNode_xYlaTt("padding-inline", val_RZSKnE)]
            )
          );
        }
      }
      if (mediaMap_ByzwRg) for (let [, breakpointNode_ZzXUTJ] of mediaMap_ByzwRg) outNodes_YlzDcJ.push(breakpointNode_ZzXUTJ);
      return outNodes_YlzDcJ;
    }(containerTheme_kpelGR, context_IjGPbC);
    0 !== containerAst_JhpfMW.length && context_IjGPbC.utilities.static("container", () => structuredClone(containerAst_JhpfMW));
  }
  function injectDarkModeVariant_ZYAXEI({ addVariant: addVariant_sdYbwS, config: config_tpidXR }) {
    let darkModeDef_YsVWax = config_tpidXR("darkMode", null),
      [darkModeType_dsXwUZ, darkModeSelector_bVSmSR = ".dark"] = Array.isArray(darkModeDef_YsVWax) ? darkModeDef_YsVWax : [darkModeDef_YsVWax];
    if ("variant" === darkModeType_dsXwUZ) {
      let selArr_JslhDf;
      if (
      Array.isArray(darkModeSelector_bVSmSR) || "function" == typeof darkModeSelector_bVSmSR ?
      selArr_JslhDf = darkModeSelector_bVSmSR :
      "string" == typeof darkModeSelector_bVSmSR && (selArr_JslhDf = [darkModeSelector_bVSmSR]),
      Array.isArray(selArr_JslhDf))

      for (let sel_UZrFTY of selArr_JslhDf)
      ".dark" === sel_UZrFTY ? (
      darkModeType_dsXwUZ = !1,
      console.warn(
        'When using `variant` for `darkMode`, you must provide a selector.\nExample: `darkMode: ["variant", ".your-selector &"]`'
      )) :
      sel_UZrFTY.includes("&") || (
      darkModeType_dsXwUZ = !1,
      console.warn(
        'When using `variant` for `darkMode`, your selector must contain `&`.\nExample `darkMode: ["variant", ".your-selector &"]`'
      ));
      darkModeSelector_bVSmSR = selArr_JslhDf;
    }
    null === darkModeType_dsXwUZ || (
    "selector" === darkModeType_dsXwUZ ?
    addVariant_sdYbwS("dark", `&:where(${darkModeSelector_bVSmSR}, ${darkModeSelector_bVSmSR} *)`) :
    "media" === darkModeType_dsXwUZ ?
    addVariant_sdYbwS("dark", "@media (prefers-color-scheme: dark)") :
    "variant" === darkModeType_dsXwUZ ?
    addVariant_sdYbwS("dark", darkModeSelector_bVSmSR) :
    "class" === darkModeType_dsXwUZ && addVariant_sdYbwS("dark", `&:is(${darkModeSelector_bVSmSR} *)`));
  }
  function formatBreakpointQueries_reSsxJ(breakpoints_oFgctT) {
    return (Array.isArray(breakpoints_oFgctT) ? breakpoints_oFgctT : [breakpoints_oFgctT]).
    map((bp_xQkHDH) =>
    "string" == typeof bp_xQkHDH ?
    { min: bp_xQkHDH } :
    bp_xQkHDH && "object" == typeof bp_xQkHDH ?
    bp_xQkHDH :
    null
    ).
    map((def_NYoWFZ) => {
      if (null === def_NYoWFZ) return null;
      if ("raw" in def_NYoWFZ) return def_NYoWFZ.raw;
      let val_hCsNuH = "";
      return (
        void 0 !== def_NYoWFZ.max && (val_hCsNuH += `${def_NYoWFZ.max} >= `),
        val_hCsNuH += "width",
        void 0 !== def_NYoWFZ.min && (val_hCsNuH += ` >= ${def_NYoWFZ.min}`),
        `(${val_hCsNuH})`);

    }).
    filter(Boolean).
    join(", ");
  }
  var lowercaseAlphaRegex_eKXXww = /^[a-z]+$/;
  async function processPluginAtRules_QWqTzB({
    designSystem: designSystem_ZLtTje,
    base: base_sMjsQl,
    ast: ast_gTaTMt,
    loadModule: loadModule_nInTIM,
    sources: sources_QtDbOu
  }) {
    let featuresUsed_LXCLSS = 0,
      pluginsFound_okPlRl = [],
      configsFound_riTvDA = [];
    walkASTRecursive_YoBVFs(ast_gTaTMt, (node_aIfEHY, { parent: parent_VGcffn, replaceWith: replaceWith_DHOLkX, context: context_DhVxPL }) => {
      if ("at-rule" === node_aIfEHY.kind) {
        if ("@plugin" === node_aIfEHY.name) {
          if (null !== parent_VGcffn) throw new Error("`@plugin` cannot be nested.");
          let pluginPath_zcFWcI = node_aIfEHY.params.slice(1, -1);
          if (0 === pluginPath_zcFWcI.length) throw new Error("`@plugin` must have a path.");
          let pluginOpts_qkXSai = {};
          for (let pluginDecl_hxnLQE of node_aIfEHY.nodes ?? []) {
            if ("declaration" !== pluginDecl_hxnLQE.kind)
            throw new Error(
              `Unexpected \`@plugin\` option:\n\n${astNodesToCss_kEgwyH([pluginDecl_hxnLQE])}\n\n\`@plugin\` options must be a flat list of declarations.`
            );
            if (void 0 === pluginDecl_hxnLQE.value) continue;
            let partsArr_qoxgJr = splitOnTopLevel_EfBwUv(pluginDecl_hxnLQE.value, ",").map((partVal_vUnsek) => {
              if ("null" === (partVal_vUnsek = partVal_vUnsek.trim())) return null;
              if ("true" === partVal_vUnsek) return !0;
              if ("false" === partVal_vUnsek) return !1;
              if (!Number.isNaN(Number(partVal_vUnsek))) return Number(partVal_vUnsek);
              if (
              '"' === partVal_vUnsek[0] && '"' === partVal_vUnsek[partVal_vUnsek.length - 1] ||
              "'" === partVal_vUnsek[0] && "'" === partVal_vUnsek[partVal_vUnsek.length - 1])

              return partVal_vUnsek.slice(1, -1);
              if ("{" === partVal_vUnsek[0] && "}" === partVal_vUnsek[partVal_vUnsek.length - 1])
              throw new Error(
                `Unexpected \`@plugin\` option: Value of declaration \`${astNodesToCss_kEgwyH([pluginDecl_hxnLQE]).trim()}\` is not supported.\n\nUsing an object as a plugin option is currently only supported in JavaScript configuration files.`
              );
              return partVal_vUnsek;
            });
            pluginOpts_qkXSai[pluginDecl_hxnLQE.property] = 1 === partsArr_qoxgJr.length ? partsArr_qoxgJr[0] : partsArr_qoxgJr;
          }
          return (
            pluginsFound_okPlRl.push([
            { id: pluginPath_zcFWcI, base: context_DhVxPL.base, reference: !!context_DhVxPL.reference },
            Object.keys(pluginOpts_qkXSai).length > 0 ? pluginOpts_qkXSai : null]
            ),
            replaceWith_DHOLkX([]),
            void (featuresUsed_LXCLSS |= 4));

        }
        if ("@config" === node_aIfEHY.name) {
          if (node_aIfEHY.nodes.length > 0)
          throw new Error("`@config` cannot have a body.");
          if (null !== parent_VGcffn) throw new Error("`@config` cannot be nested.");
          return (
            configsFound_riTvDA.push({
              id: node_aIfEHY.params.slice(1, -1),
              base: context_DhVxPL.base,
              reference: !!context_DhVxPL.reference
            }),
            replaceWith_DHOLkX([]),
            void (featuresUsed_LXCLSS |= 4));

        }
      }
    }),
    function (api_dgNVPc) {
      for (let [gradientDirectionShort_ieRDnh, gradientDirectionFull_Gupohk] of [
      ["t", "top"],
      ["tr", "top right"],
      ["r", "right"],
      ["br", "bottom right"],
      ["b", "bottom"],
      ["bl", "bottom left"],
      ["l", "left"],
      ["tl", "top left"]])

      api_dgNVPc.utilities.static(`bg-gradient-to-${gradientDirectionShort_ieRDnh}`, () => [
      makeDeclarationNode_xYlaTt("--tw-gradient-position", `to ${gradientDirectionFull_Gupohk} in oklab`),
      makeDeclarationNode_xYlaTt("background-image", "linear-gradient(var(--tw-gradient-stops))")]
      );
      api_dgNVPc.utilities.static("bg-left-top", () => [
      makeDeclarationNode_xYlaTt("background-position", "left top")]
      ),
      api_dgNVPc.utilities.static("bg-right-top", () => [
      makeDeclarationNode_xYlaTt("background-position", "right top")]
      ),
      api_dgNVPc.utilities.static("bg-left-bottom", () => [
      makeDeclarationNode_xYlaTt("background-position", "left bottom")]
      ),
      api_dgNVPc.utilities.static("bg-right-bottom", () => [
      makeDeclarationNode_xYlaTt("background-position", "right bottom")]
      ),
      api_dgNVPc.utilities.static("object-left-top", () => [
      makeDeclarationNode_xYlaTt("object-position", "left top")]
      ),
      api_dgNVPc.utilities.static("object-right-top", () => [
      makeDeclarationNode_xYlaTt("object-position", "right top")]
      ),
      api_dgNVPc.utilities.static("object-left-bottom", () => [
      makeDeclarationNode_xYlaTt("object-position", "left bottom")]
      ),
      api_dgNVPc.utilities.static("object-right-bottom", () => [
      makeDeclarationNode_xYlaTt("object-position", "right bottom")]
      ),
      api_dgNVPc.utilities.functional("max-w-screen", (parseArg_oBwNka) => {
        if (!parseArg_oBwNka.value || "arbitrary" === parseArg_oBwNka.value.kind) return;
        let breakpointValue_gZaBMb = api_dgNVPc.theme.resolve(parseArg_oBwNka.value.value, ["--breakpoint"]);
        return breakpointValue_gZaBMb ? [makeDeclarationNode_xYlaTt("max-width", breakpointValue_gZaBMb)] : void 0;
      }),
      api_dgNVPc.utilities.static("overflow-ellipsis", () => [
      makeDeclarationNode_xYlaTt("text-overflow", "ellipsis")]
      ),
      api_dgNVPc.utilities.static("decoration-slice", () => [
      makeDeclarationNode_xYlaTt("-webkit-box-decoration-break", "slice"),
      makeDeclarationNode_xYlaTt("box-decoration-break", "slice")]
      ),
      api_dgNVPc.utilities.static("decoration-clone", () => [
      makeDeclarationNode_xYlaTt("-webkit-box-decoration-break", "clone"),
      makeDeclarationNode_xYlaTt("box-decoration-break", "clone")]
      ),
      api_dgNVPc.utilities.functional("flex-shrink", (arg_XLzjCG) => {
        if (!arg_XLzjCG.modifier) {
          if (!arg_XLzjCG.value) return [makeDeclarationNode_xYlaTt("flex-shrink", "1")];
          if ("arbitrary" === arg_XLzjCG.value.kind)
          return [makeDeclarationNode_xYlaTt("flex-shrink", arg_XLzjCG.value.value)];
          if (isNonNegativeInteger_QISFSJ(arg_XLzjCG.value.value)) return [makeDeclarationNode_xYlaTt("flex-shrink", arg_XLzjCG.value.value)];
        }
      }),
      api_dgNVPc.utilities.functional("flex-grow", (arg_QDcPCM) => {
        if (!arg_QDcPCM.modifier) {
          if (!arg_QDcPCM.value) return [makeDeclarationNode_xYlaTt("flex-grow", "1")];
          if ("arbitrary" === arg_QDcPCM.value.kind)
          return [makeDeclarationNode_xYlaTt("flex-grow", arg_QDcPCM.value.value)];
          if (isNonNegativeInteger_QISFSJ(arg_QDcPCM.value.value)) return [makeDeclarationNode_xYlaTt("flex-grow", arg_QDcPCM.value.value)];
        }
      });
    }(designSystem_ZLtTje);
    let originalResolveThemeValue_uswPpW = designSystem_ZLtTje.resolveThemeValue;
    if (
    designSystem_ZLtTje.resolveThemeValue = function (key_fsyako, param_UsyIjl) {
      return key_fsyako.startsWith("--") ?
      originalResolveThemeValue_uswPpW(key_fsyako, param_UsyIjl) : (
      featuresUsed_LXCLSS |= evaluateFeatureFlags_nVKBwh({
        designSystem: designSystem_ZLtTje,
        base: base_sMjsQl,
        ast: ast_gTaTMt,
        sources: sources_QtDbOu,
        configs: [],
        pluginDetails: []
      }),
      designSystem_ZLtTje.resolveThemeValue(key_fsyako, param_UsyIjl));
    },
    !pluginsFound_okPlRl.length && !configsFound_riTvDA.length)

    return 0;
    let [configResults_ICXikY, pluginResults_jTYYNG] = await Promise.all([
    Promise.all(
      configsFound_riTvDA.map(async ({ id: path_mosvGq, base: base_IOJGHb, reference: reference_Gyyoxo }) => {
        let mod_MWsWhe = await loadModule_nInTIM(path_mosvGq, base_IOJGHb, "config");
        return { path: path_mosvGq, base: mod_MWsWhe.base, config: mod_MWsWhe.module, reference: reference_Gyyoxo };
      })
    ),
    Promise.all(
      pluginsFound_okPlRl.map(async ([{ id: pluginId_iMysVb, base: base_UUSDuJ, reference: reference_KBVTWF }, options_KKTgwh]) => {
        let mod_haoHqs = await loadModule_nInTIM(pluginId_iMysVb, base_UUSDuJ, "plugin");
        return {
          path: pluginId_iMysVb,
          base: mod_haoHqs.base,
          plugin: mod_haoHqs.module,
          options: options_KKTgwh,
          reference: reference_KBVTWF
        };
      })
    )]
    );
    return (
      featuresUsed_LXCLSS |= evaluateFeatureFlags_nVKBwh({
        designSystem: designSystem_ZLtTje,
        base: base_sMjsQl,
        ast: ast_gTaTMt,
        sources: sources_QtDbOu,
        configs: configResults_ICXikY,
        pluginDetails: pluginResults_jTYYNG
      }),
      featuresUsed_LXCLSS);

  }
  function evaluateFeatureFlags_nVKBwh({
    designSystem: designSystem_oBjwmH,
    base: baseDir_ulhhPm,
    ast: ast_CkeOPg,
    sources: sourceEntries_SySpeT,
    configs: loadedConfigs_nLCPLZ,
    pluginDetails: pluginDetails_zNqxDH
  }) {
    let featuresResult_zcurJv = 0,
      allUserConfigs_aCMBHn = [
      ...pluginDetails_zNqxDH.map((pluginDetail_PThpkc) => {
        if (!pluginDetail_PThpkc.options)
        return {
          config: { plugins: [pluginDetail_PThpkc.plugin] },
          base: pluginDetail_PThpkc.base,
          reference: pluginDetail_PThpkc.reference
        };
        if ("__isOptionsFunction" in pluginDetail_PThpkc.plugin)
        return {
          config: { plugins: [pluginDetail_PThpkc.plugin(pluginDetail_PThpkc.options)] },
          base: pluginDetail_PThpkc.base,
          reference: pluginDetail_PThpkc.reference
        };
        throw new Error(`The plugin "${pluginDetail_PThpkc.path}" does not accept options`);
      }),
      ...loadedConfigs_nLCPLZ],

      { resolvedConfig: defaultResolvedConfig_UaIQdA } = resolveTailwindConfig_FlEBPQ(designSystem_oBjwmH, [
      { config: getTailwindDefaultThemeConfig_UraSti(designSystem_oBjwmH.theme), base: baseDir_ulhhPm, reference: !0 },
      ...allUserConfigs_aCMBHn,
      { config: { plugins: [injectDarkModeVariant_ZYAXEI] }, base: baseDir_ulhhPm, reference: !0 }]
      ),
      { resolvedConfig: userResolvedConfig_jdKSLG, replacedThemeKeys: userReplacedThemeKeys_MjzjbU } = resolveTailwindConfig_FlEBPQ(designSystem_oBjwmH, allUserConfigs_aCMBHn),
      originalResolveThemeValue_Lyxglq = designSystem_oBjwmH.resolveThemeValue;
    designSystem_oBjwmH.resolveThemeValue = function (themeKey_DHkxbC, themeParam_GRdVYN) {
      if ("-" === themeKey_DHkxbC[0] && "-" === themeKey_DHkxbC[1]) return originalResolveThemeValue_Lyxglq(themeKey_DHkxbC, themeParam_GRdVYN);
      let maybeThemeVal_iIFzLA = api_OIbVVo.theme(themeKey_DHkxbC, void 0);
      return Array.isArray(maybeThemeVal_iIFzLA) && 2 === maybeThemeVal_iIFzLA.length ?
      maybeThemeVal_iIFzLA[0] :
      Array.isArray(maybeThemeVal_iIFzLA) ?
      maybeThemeVal_iIFzLA.join(", ") :
      "string" == typeof maybeThemeVal_iIFzLA ?
      maybeThemeVal_iIFzLA :
      void 0;
    };
    let refApi_NvMlYD,
      sharedApiOpts_YonTMY = {
        designSystem: designSystem_oBjwmH,
        ast: ast_CkeOPg,
        resolvedConfig: defaultResolvedConfig_UaIQdA,
        featuresRef: {
          set current(featureValue_VvBGhe) {
            featuresResult_zcurJv |= featureValue_VvBGhe;
          }
        }
      },
      api_OIbVVo = parseDesignSystem_GdazHY({ ...sharedApiOpts_YonTMY, referenceMode: !1 });
    for (let { handler: handler_tYAPfa, reference: isReference_MPeIlb } of defaultResolvedConfig_UaIQdA.plugins)
    isReference_MPeIlb ? (refApi_NvMlYD ||= parseDesignSystem_GdazHY({ ...sharedApiOpts_YonTMY, referenceMode: !0 }), handler_tYAPfa(refApi_NvMlYD)) : handler_tYAPfa(api_OIbVVo);
    if (
    applyThemeToContext_KNnVTp(designSystem_oBjwmH, userResolvedConfig_jdKSLG, userReplacedThemeKeys_MjzjbU),
    injectKeyframes_YkbbuX(designSystem_oBjwmH, userResolvedConfig_jdKSLG),
    function (resolvedThemeConfig_GIyHuN, designSystemRef_reyera) {
      let ariaTheme_gDZLCI = resolvedThemeConfig_GIyHuN.theme.aria || {},
        supportsTheme_MMmGyh = resolvedThemeConfig_GIyHuN.theme.supports || {},
        dataTheme_fbszVq = resolvedThemeConfig_GIyHuN.theme.data || {};
      if (Object.keys(ariaTheme_gDZLCI).length > 0) {
        let ariaVariantObj_umGYqE = designSystemRef_reyera.variants.get("aria"),
          ariaVariantApplyFn_BvRFGf = ariaVariantObj_umGYqE?.applyFn,
          ariaVariantCompounds_HhAMDH = ariaVariantObj_umGYqE?.compounds;
        designSystemRef_reyera.variants.functional(
          "aria",
          (astArg_aXbCHQ, variantFnArg_blPhOb) => {
            let ariaNamedValueObj_kzBcEC = variantFnArg_blPhOb.value;
            return ariaNamedValueObj_kzBcEC && "named" === ariaNamedValueObj_kzBcEC.kind && ariaNamedValueObj_kzBcEC.value in ariaTheme_gDZLCI ?
            ariaVariantApplyFn_BvRFGf?.(astArg_aXbCHQ, {
              ...variantFnArg_blPhOb,
              value: { kind: "arbitrary", value: ariaTheme_gDZLCI[ariaNamedValueObj_kzBcEC.value] }
            }) :
            ariaVariantApplyFn_BvRFGf?.(astArg_aXbCHQ, variantFnArg_blPhOb);
          },
          { compounds: ariaVariantCompounds_HhAMDH }
        );
      }
      if (Object.keys(supportsTheme_MMmGyh).length > 0) {
        let supportsVariantObj_vbuDZW = designSystemRef_reyera.variants.get("supports"),
          supportsApplyFn_mBcLvE = supportsVariantObj_vbuDZW?.applyFn,
          supportsCompounds_RSSGmM = supportsVariantObj_vbuDZW?.compounds;
        designSystemRef_reyera.variants.functional(
          "supports",
          (astArg_FhOrSz, variantFnArg_dlhgTo) => {
            let supportsNamedValueObj_kzniyd = variantFnArg_dlhgTo.value;
            return supportsNamedValueObj_kzniyd && "named" === supportsNamedValueObj_kzniyd.kind && supportsNamedValueObj_kzniyd.value in supportsTheme_MMmGyh ?
            supportsApplyFn_mBcLvE?.(astArg_FhOrSz, {
              ...variantFnArg_dlhgTo,
              value: { kind: "arbitrary", value: supportsTheme_MMmGyh[supportsNamedValueObj_kzniyd.value] }
            }) :
            supportsApplyFn_mBcLvE?.(astArg_FhOrSz, variantFnArg_dlhgTo);
          },
          { compounds: supportsCompounds_RSSGmM }
        );
      }
      if (Object.keys(dataTheme_fbszVq).length > 0) {
        let dataVariantObj_MxptBv = designSystemRef_reyera.variants.get("data"),
          dataApplyFn_gRiBCW = dataVariantObj_MxptBv?.applyFn,
          dataCompounds_lKzoGp = dataVariantObj_MxptBv?.compounds;
        designSystemRef_reyera.variants.functional(
          "data",
          (astArg_wgenjD, variantFnArg_YbioRZ) => {
            let dataNamedValueObj_DpBsLc = variantFnArg_YbioRZ.value;
            return dataNamedValueObj_DpBsLc && "named" === dataNamedValueObj_DpBsLc.kind && dataNamedValueObj_DpBsLc.value in dataTheme_fbszVq ?
            dataApplyFn_gRiBCW?.(astArg_wgenjD, {
              ...variantFnArg_YbioRZ,
              value: { kind: "arbitrary", value: dataTheme_fbszVq[dataNamedValueObj_DpBsLc.value] }
            }) :
            dataApplyFn_gRiBCW?.(astArg_wgenjD, variantFnArg_YbioRZ);
          },
          { compounds: dataCompounds_lKzoGp }
        );
      }
    }(userResolvedConfig_jdKSLG, designSystem_oBjwmH),
    function (userThemeConfig_rwoaiU, designSystemRef_IHAxQS) {
      let screensThemeObj_LhzrXs = userThemeConfig_rwoaiU.theme.screens || {},
        minVariantOrder_dfuEHx = designSystemRef_IHAxQS.variants.get("min")?.order ?? 0,
        delayedVariants_YZiUbr = [];
      for (let [breakpointKey_KAmUGz, breakpointVal_pUYJXJ] of Object.entries(screensThemeObj_LhzrXs)) {
        let defineVariantOrderFn_HTzqkV = function (variantOrder_IyCZCc) {
            designSystemRef_IHAxQS.variants.static(
              breakpointKey_KAmUGz,
              (ast_seIIcb) => {
                ast_seIIcb.nodes = [processAtRule_lWgxgY("@media", formattedMediaQuery_kHSSvz, ast_seIIcb.nodes)];
              },
              { order: variantOrder_IyCZCc }
            );
          },
          screenVariantObj_UFOhhZ = designSystemRef_IHAxQS.variants.get(breakpointKey_KAmUGz),
          breakpointResolvedVal_jNCzNc = designSystemRef_IHAxQS.theme.resolveValue(breakpointKey_KAmUGz, ["--breakpoint"]);
        if (screenVariantObj_UFOhhZ && breakpointResolvedVal_jNCzNc && !designSystemRef_IHAxQS.theme.hasDefault(`--breakpoint-${breakpointKey_KAmUGz}`)) continue;
        let isDelayed_ooAvfI = !0;
        "string" == typeof breakpointVal_pUYJXJ && (isDelayed_ooAvfI = !1);
        let formattedMediaQuery_kHSSvz = formatBreakpointQueries_reSsxJ(breakpointVal_pUYJXJ);
        isDelayed_ooAvfI ? delayedVariants_YZiUbr.push(defineVariantOrderFn_HTzqkV) : defineVariantOrderFn_HTzqkV(minVariantOrder_dfuEHx);
      }
      if (0 !== delayedVariants_YZiUbr.length) {
        for (let [, variantObj_XTRzxM] of designSystemRef_IHAxQS.variants.variants)
        variantObj_XTRzxM.order > minVariantOrder_dfuEHx && (variantObj_XTRzxM.order += delayedVariants_YZiUbr.length);
        designSystemRef_IHAxQS.variants.compareFns = new Map(
          Array.from(designSystemRef_IHAxQS.variants.compareFns).map(
            ([variantOrder_DudVFg, compareFn_zbfIIH]) => (variantOrder_DudVFg > minVariantOrder_dfuEHx && (variantOrder_DudVFg += delayedVariants_YZiUbr.length), [variantOrder_DudVFg, compareFn_zbfIIH])
          )
        );
        for (let [orderIndex_FbNUWE, delayedVariantApplyFn_zqtbLb] of delayedVariants_YZiUbr.entries()) delayedVariantApplyFn_zqtbLb(minVariantOrder_dfuEHx + orderIndex_FbNUWE + 1);
      }
    }(userResolvedConfig_jdKSLG, designSystem_oBjwmH),
    injectContainerUtilities_LFSGga(userResolvedConfig_jdKSLG, designSystem_oBjwmH),
    !designSystem_oBjwmH.theme.prefix && defaultResolvedConfig_UaIQdA.prefix)
    {
      if (
      defaultResolvedConfig_UaIQdA.prefix.endsWith("-") && (
      defaultResolvedConfig_UaIQdA.prefix = defaultResolvedConfig_UaIQdA.prefix.slice(0, -1),
      console.warn(
        `The prefix "${defaultResolvedConfig_UaIQdA.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only and is written as a variant before all utilities. We have fixed up the prefix for you. Remove the trailing \`-\` to silence this warning.`
      )),
      !lowercaseAlphaRegex_eKXXww.test(defaultResolvedConfig_UaIQdA.prefix))

      throw new Error(
        `The prefix "${defaultResolvedConfig_UaIQdA.prefix}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`
      );
      designSystem_oBjwmH.theme.prefix = defaultResolvedConfig_UaIQdA.prefix;
    }
    if (
    !designSystem_oBjwmH.important && !0 === defaultResolvedConfig_UaIQdA.important && (designSystem_oBjwmH.important = !0),
    "string" == typeof defaultResolvedConfig_UaIQdA.important)
    {
      let importantSelector_iGcbHu = defaultResolvedConfig_UaIQdA.important;
      walkASTRecursive_YoBVFs(ast_CkeOPg, (node_NvjLIk, { replaceWith: replaceWithCb_WeQcAf, parent: parent_xriqtm }) => {
        if (
        "at-rule" === node_NvjLIk.kind &&
        "@tailwind" === node_NvjLIk.name &&
        "utilities" === node_NvjLIk.params)

        return "rule" === parent_xriqtm?.kind && parent_xriqtm.selector === importantSelector_iGcbHu || replaceWithCb_WeQcAf(makeRuleNode_PDClCj(importantSelector_iGcbHu, [node_NvjLIk])), 2;
      });
    }
    for (let blockedClass_jMGlBR of defaultResolvedConfig_UaIQdA.blocklist) designSystem_oBjwmH.invalidCandidates.add(blockedClass_jMGlBR);
    for (let contentEntry_DzRNeE of defaultResolvedConfig_UaIQdA.content.files) {
      if ("raw" in contentEntry_DzRNeE)
      throw new Error(
        `Error in the config file/plugin/preset. The \`content\` key contains a \`raw\` entry:\n\n${JSON.stringify(contentEntry_DzRNeE, null, 2)}\n\nThis feature is not currently supported.`
      );
      let isNegated_pUDjTj = !1;
      "!" == contentEntry_DzRNeE.pattern[0] && (isNegated_pUDjTj = !0, contentEntry_DzRNeE.pattern = contentEntry_DzRNeE.pattern.slice(1)),
      sourceEntries_SySpeT.push({ ...contentEntry_DzRNeE, negated: isNegated_pUDjTj });
    }
    return featuresResult_zcurJv;
  }
  var rangeRegex_RrNlkb = /^(-?\d+)\.\.(-?\d+)(?:\.\.(-?\d+))?$/;
  function expandPatternBraces_zjEvYm(pattern_gCYNvx) {
    let braceIndex_smhUaV = pattern_gCYNvx.indexOf("{");
    if (-1 === braceIndex_smhUaV) return [pattern_gCYNvx];
    let expanded_jErJuk = [],
      prefix_rdxaSN = pattern_gCYNvx.slice(0, braceIndex_smhUaV),
      suffixWithBraces_TJoIYz = pattern_gCYNvx.slice(braceIndex_smhUaV),
      openBracesCount_vgvHOg = 0,
      closingBraceIndex_qvysGr = suffixWithBraces_TJoIYz.lastIndexOf("}");
    for (let i_SIwnFk = 0; i_SIwnFk < suffixWithBraces_TJoIYz.length; i_SIwnFk++) {
      let braceCh_zSarlu = suffixWithBraces_TJoIYz[i_SIwnFk];
      if ("{" === braceCh_zSarlu) openBracesCount_vgvHOg++;else
      if ("}" === braceCh_zSarlu && (openBracesCount_vgvHOg--, 0 === openBracesCount_vgvHOg)) {
        closingBraceIndex_qvysGr = i_SIwnFk;
        break;
      }
    }
    if (-1 === closingBraceIndex_qvysGr) throw new Error(`The pattern \`${pattern_gCYNvx}\` is not balanced.`);
    let expandContent_SeHXiC,
      inner_pVuCAF = suffixWithBraces_TJoIYz.slice(1, closingBraceIndex_qvysGr),
      patternBracesSuffix_mTiigk = suffixWithBraces_TJoIYz.slice(closingBraceIndex_qvysGr + 1);
    expandContent_SeHXiC = function (content_XnqPhf) {
      return rangeRegex_RrNlkb.test(content_XnqPhf);
    }(inner_pVuCAF) ?
    function (content_dPzkTW) {
      let matchArr_sgEcpA = content_dPzkTW.match(rangeRegex_RrNlkb);
      if (!matchArr_sgEcpA) return [content_dPzkTW];
      let [, start_kIlmhZ, end_sNVMik, step_ikejon] = matchArr_sgEcpA,
        stepNum_vwlluB = step_ikejon ? parseInt(step_ikejon, 10) : void 0,
        resultArr_TvqnGO = [];
      if (/^-?\d+$/.test(start_kIlmhZ) && /^-?\d+$/.test(end_sNVMik)) {
        let startNum_dWwEWj = parseInt(start_kIlmhZ, 10),
          endNum_BdBTnN = parseInt(end_sNVMik, 10);
        if (void 0 === stepNum_vwlluB && (stepNum_vwlluB = startNum_dWwEWj <= endNum_BdBTnN ? 1 : -1), 0 === stepNum_vwlluB)
        throw new Error("Step cannot be zero in sequence expansion.");
        let asc_euTUlo = startNum_dWwEWj < endNum_BdBTnN;
        asc_euTUlo && stepNum_vwlluB < 0 && (stepNum_vwlluB = -stepNum_vwlluB), !asc_euTUlo && stepNum_vwlluB > 0 && (stepNum_vwlluB = -stepNum_vwlluB);
        for (let i_UPogFn = startNum_dWwEWj; asc_euTUlo ? i_UPogFn <= endNum_BdBTnN : i_UPogFn >= endNum_BdBTnN; i_UPogFn += stepNum_vwlluB) resultArr_TvqnGO.push(i_UPogFn.toString());
      }
      return resultArr_TvqnGO;
    }(inner_pVuCAF) :
    splitOnTopLevel_EfBwUv(inner_pVuCAF, ","),
    expandContent_SeHXiC = expandContent_SeHXiC.flatMap((braceExpEntry_wygQEM) => expandPatternBraces_zjEvYm(braceExpEntry_wygQEM));
    let postArr_TImlub = expandPatternBraces_zjEvYm(patternBracesSuffix_mTiigk);
    for (let post_Shhajc of postArr_TImlub) for (let mid_EaRIFN of expandContent_SeHXiC) expanded_jErJuk.push(prefix_rdxaSN + mid_EaRIFN + post_Shhajc);
    return expanded_jErJuk;
  }
  var lowercaseStringRegex_mjaYLQ = /^[a-z]+$/;
  function throwNoLoadModule_yGvFTr() {
    throw new Error("No `loadModule` function provided to `compile`");
  }
  function throwNoLoadStylesheet_TjZype() {
    throw new Error("No `loadStylesheet` function provided to `compile`");
  }
  async function compileAstToUtilities_CUShHH(
  rootAst_RibqIE,
  { base: baseDir_LypBRc = "", loadModule: loadModuleFn_XCmycY = throwNoLoadModule_yGvFTr, loadStylesheet: loadStylesheetFn_PlsIWX = throwNoLoadStylesheet_TjZype } = {})
  {
    let featuresFlag_qQStiL = 0;
    rootAst_RibqIE = [makeContextNode_dEmkmt({ base: baseDir_LypBRc }, rootAst_RibqIE)], featuresFlag_qQStiL |= await resolveImportsRecursively_BwezUJ(rootAst_RibqIE, baseDir_LypBRc, loadStylesheetFn_PlsIWX);
    let presetConfig_WMNIxg = null,
      themeVarMap_aIhrxV = new ThemeVariableMap_aqKABy(),
      registerVariantFnsArr_CPwjiB = [],
      utilityFnsArr_zYQOha = [],
      twUtilitiesNode_DaLcCM = null,
      mainUtilitiesAtRule_ClfpKw = null,
      variantNodesArr_JwRFJb = [],
      sourcesArr_wBXynu = [],
      inlineCandidatesArr_QUEsKh = [],
      inlineNegatedCandidatesArr_AZRibA = [],
      utilitiesSource_DgQZjl = null;
    walkASTRecursive_YoBVFs(rootAst_RibqIE, (node_xYjUKs, { parent: parent_qbLCUb, replaceWith: replaceWithCb_vNnJkK, context: astContext_PAesUJ }) => {
      if ("at-rule" === node_xYjUKs.kind) {
        if (
        "@tailwind" === node_xYjUKs.name && (
        "utilities" === node_xYjUKs.params || node_xYjUKs.params.startsWith("utilities")))
        {
          if (null !== mainUtilitiesAtRule_ClfpKw) return void replaceWithCb_vNnJkK([]);
          let paramsParts_PUIDym = splitOnTopLevel_EfBwUv(node_xYjUKs.params, " ");
          for (let paramPart_ZCEjtb of paramsParts_PUIDym)
          if (paramPart_ZCEjtb.startsWith("source(")) {
            let srcPath_puxQzw = paramPart_ZCEjtb.slice(7, -1);
            if ("none" === srcPath_puxQzw) {
              utilitiesSource_DgQZjl = srcPath_puxQzw;
              continue;
            }
            if (
            '"' === srcPath_puxQzw[0] && '"' !== srcPath_puxQzw[srcPath_puxQzw.length - 1] ||
            "'" === srcPath_puxQzw[0] && "'" !== srcPath_puxQzw[srcPath_puxQzw.length - 1] ||
            "'" !== srcPath_puxQzw[0] && '"' !== srcPath_puxQzw[0])

            throw new Error("`source(…)` paths must be quoted.");
            utilitiesSource_DgQZjl = { base: astContext_PAesUJ.sourceBase ?? astContext_PAesUJ.base, pattern: srcPath_puxQzw.slice(1, -1) };
          }
          mainUtilitiesAtRule_ClfpKw = node_xYjUKs, featuresFlag_qQStiL |= 16;
        }
        if ("@utility" === node_xYjUKs.name) {
          if (null !== parent_qbLCUb) throw new Error("`@utility` cannot be nested.");
          if (0 === node_xYjUKs.nodes.length)
          throw new Error(
            `\`@utility ${node_xYjUKs.params}\` is empty. Utilities should include at least one property.`
          );
          let registerUtilityFn_mevXWe = function (utilityAtRule_vPnVwt) {
            let utilityParam_BqXmKy = utilityAtRule_vPnVwt.params;
            return themeKeyWildcardRegex_hVtlzz.test(utilityParam_BqXmKy) ?
            (api_EcTVvx) => {
              let astKeyMeta_ZxJVsM = {
                "--value": {
                  usedSpacingInteger: !1,
                  usedSpacingNumber: !1,
                  themeKeys: new Set(),
                  literals: new Set()
                },
                "--modifier": {
                  usedSpacingInteger: !1,
                  usedSpacingNumber: !1,
                  themeKeys: new Set(),
                  literals: new Set()
                }
              };
              walkASTRecursive_YoBVFs(utilityAtRule_vPnVwt.nodes, (declarationNode_PsyqMU) => {
                if (
                "declaration" !== declarationNode_PsyqMU.kind ||
                !declarationNode_PsyqMU.value ||
                !declarationNode_PsyqMU.value.includes("--value(") &&
                !declarationNode_PsyqMU.value.includes("--modifier("))

                return;
                let valueAst_enDKkY = parseAST_Gsbeng(declarationNode_PsyqMU.value);
                walkAST_roCHga(valueAst_enDKkY, (astFunctionNode_jfkhQb) => {
                  if ("function" !== astFunctionNode_jfkhQb.kind) return;
                  if (
                  !(
                  "--spacing" !== astFunctionNode_jfkhQb.value ||
                  astKeyMeta_ZxJVsM["--modifier"].usedSpacingNumber &&
                  astKeyMeta_ZxJVsM["--value"].usedSpacingNumber))


                  return (
                    walkAST_roCHga(astFunctionNode_jfkhQb.nodes, (innerFunctionNode_RxbwkT) => {
                      if (
                      "function" !== innerFunctionNode_RxbwkT.kind ||
                      "--value" !== innerFunctionNode_RxbwkT.value &&
                      "--modifier" !== innerFunctionNode_RxbwkT.value)

                      return;
                      let fnType_EIfzOE = innerFunctionNode_RxbwkT.value;
                      for (let wordNode_yZFHZo of innerFunctionNode_RxbwkT.nodes)
                      if ("word" === wordNode_yZFHZo.kind)
                      if ("integer" === wordNode_yZFHZo.value)
                      astKeyMeta_ZxJVsM[fnType_EIfzOE].usedSpacingInteger ||= !0;else
                      if (
                      "number" === wordNode_yZFHZo.value && (
                      astKeyMeta_ZxJVsM[fnType_EIfzOE].usedSpacingNumber ||= !0,
                      astKeyMeta_ZxJVsM["--modifier"].usedSpacingNumber &&
                      astKeyMeta_ZxJVsM["--value"].usedSpacingNumber))

                      return 2;
                    }),
                    0);

                  if ("--value" !== astFunctionNode_jfkhQb.value && "--modifier" !== astFunctionNode_jfkhQb.value)
                  return;
                  let braceExpandedParts_FwNzkU = splitOnTopLevel_EfBwUv(stringifyAST_tQRzQG(astFunctionNode_jfkhQb.nodes), ",");
                  for (let [braceExpandedPartIndex_zwmXMG, braceExpandedPart_ugMtml] of braceExpandedParts_FwNzkU.entries())
                  braceExpandedPart_ugMtml = braceExpandedPart_ugMtml.replace(/\\\*/g, "*"),
                  braceExpandedPart_ugMtml = braceExpandedPart_ugMtml.replace(/--(.*?)\s--(.*?)/g, "--$1-*--$2"),
                  braceExpandedPart_ugMtml = braceExpandedPart_ugMtml.replace(/\s+/g, ""),
                  braceExpandedPart_ugMtml = braceExpandedPart_ugMtml.replace(/(-\*){2,}/g, "-*"),
                  "-" === braceExpandedPart_ugMtml[0] &&
                  "-" === braceExpandedPart_ugMtml[1] &&
                  !braceExpandedPart_ugMtml.includes("-*") && (
                  braceExpandedPart_ugMtml += "-*"),
                  braceExpandedParts_FwNzkU[braceExpandedPartIndex_zwmXMG] = braceExpandedPart_ugMtml;
                  astFunctionNode_jfkhQb.nodes = parseAST_Gsbeng(braceExpandedParts_FwNzkU.join(","));
                  for (let braceWordNode_rgZoPu of astFunctionNode_jfkhQb.nodes)
                  if (
                  "word" !== braceWordNode_rgZoPu.kind ||
                  '"' !== braceWordNode_rgZoPu.value[0] && "'" !== braceWordNode_rgZoPu.value[0] ||
                  braceWordNode_rgZoPu.value[0] !== braceWordNode_rgZoPu.value[braceWordNode_rgZoPu.value.length - 1])
                  {
                    if (
                    "word" === braceWordNode_rgZoPu.kind &&
                    "-" === braceWordNode_rgZoPu.value[0] &&
                    "-" === braceWordNode_rgZoPu.value[1])
                    {
                      let themeKey_udhfeG = braceWordNode_rgZoPu.value.replace(/-\*.*$/g, "");
                      astKeyMeta_ZxJVsM[astFunctionNode_jfkhQb.value].themeKeys.add(themeKey_udhfeG);
                    } else if (
                    "word" === braceWordNode_rgZoPu.kind && (
                    "[" !== braceWordNode_rgZoPu.value[0] ||
                    "]" !== braceWordNode_rgZoPu.value[braceWordNode_rgZoPu.value.length - 1]) &&
                    !numberTypeList_YGTROd.includes(braceWordNode_rgZoPu.value))
                    {
                      console.warn(
                        `Unsupported bare value data type: "${braceWordNode_rgZoPu.value}".\nOnly valid data types are: ${numberTypeList_YGTROd.map((numberType_PKMavu) => `"${numberType_PKMavu}"`).join(", ")}.\n`
                      );
                      let invalidLiteral_LcSHBG = braceWordNode_rgZoPu.value,
                        replacementAstFn_QsWjkN = structuredClone(astFunctionNode_jfkhQb),
                        placeholder_OiJGaU = "¶";
                      walkAST_roCHga(replacementAstFn_QsWjkN.nodes, (replaceNode_zloAYM, { replaceWith: doReplace_LsuTse }) => {
                        "word" === replaceNode_zloAYM.kind &&
                        replaceNode_zloAYM.value === invalidLiteral_LcSHBG &&
                        doReplace_LsuTse({ kind: "word", value: placeholder_OiJGaU });
                      });
                      let caretString_cVLRAH = "^".repeat(stringifyAST_tQRzQG([braceWordNode_rgZoPu]).length),
                        caretIndex_qfyzIs = stringifyAST_tQRzQG([replacementAstFn_QsWjkN]).indexOf(placeholder_OiJGaU),
                        warningCssBlock_XYVQns = [
                        "```css",
                        stringifyAST_tQRzQG([astFunctionNode_jfkhQb]),
                        " ".repeat(caretIndex_qfyzIs) + caretString_cVLRAH,
                        "```"].
                        join("\n");
                      console.warn(warningCssBlock_XYVQns);
                    }
                  } else {
                    let literalValue_gRVGvz = braceWordNode_rgZoPu.value.slice(1, -1);
                    astKeyMeta_ZxJVsM[astFunctionNode_jfkhQb.value].literals.add(literalValue_gRVGvz);
                  }
                }),
                declarationNode_PsyqMU.value = stringifyAST_tQRzQG(valueAst_enDKkY);
              }),
              api_EcTVvx.utilities.functional(utilityParam_BqXmKy.slice(0, -2), (utilityArg_MYtbmL) => {
                let utilityNode_NSwnnM = structuredClone(utilityAtRule_vPnVwt),
                  argValue_hAhZyF = utilityArg_MYtbmL.value,
                  argModifier_vZcvvm = utilityArg_MYtbmL.modifier;
                if (null === argValue_hAhZyF) return;
                let foundValue_qQtrZM = !1,
                  resolvedValue_lnOmpV = !1,
                  foundModifier_FzMXFk = !1,
                  resolvedModifier_AlNXAW = !1,
                  declarationNodeMap_sPsEwh = new Map(),
                  hasRatio_bafVIw = !1;
                if (
                walkASTRecursive_YoBVFs([utilityNode_NSwnnM], (node_wQYeGb, { parent: parent_XiUJlw, replaceWith: replaceWithCb_OpwhmO }) => {
                  if (
                  "rule" !== parent_XiUJlw?.kind && "at-rule" !== parent_XiUJlw?.kind ||
                  "declaration" !== node_wQYeGb.kind ||
                  !node_wQYeGb.value)

                  return;
                  let astParsedValue_qsskPz = parseAST_Gsbeng(node_wQYeGb.value);
                  0 === (
                  walkAST_roCHga(astParsedValue_qsskPz, (parseNode_RiZJHg, { replaceWith: doReplace_TQRnqw }) => {
                    if ("function" === parseNode_RiZJHg.kind) {
                      if ("--value" === parseNode_RiZJHg.value) {
                        foundValue_qQtrZM = !0;
                        let resolvedThemeFuncAst_oPCJcW = resolveThemeArgument_NocrVW(argValue_hAhZyF, parseNode_RiZJHg, api_EcTVvx);
                        return resolvedThemeFuncAst_oPCJcW ? (
                        resolvedValue_lnOmpV = !0,
                        resolvedThemeFuncAst_oPCJcW.ratio ? hasRatio_bafVIw = !0 : declarationNodeMap_sPsEwh.set(node_wQYeGb, parent_XiUJlw),
                        doReplace_TQRnqw(resolvedThemeFuncAst_oPCJcW.nodes),
                        1) : (
                        foundValue_qQtrZM ||= !1, replaceWithCb_OpwhmO([]), 2);
                      }
                      if ("--modifier" === parseNode_RiZJHg.value) {
                        if (null === argModifier_vZcvvm) return replaceWithCb_OpwhmO([]), 2;
                        foundModifier_FzMXFk = !0;
                        let resolvedThemeFuncAst_JGyxom = resolveThemeArgument_NocrVW(argModifier_vZcvvm, parseNode_RiZJHg, api_EcTVvx);
                        return resolvedThemeFuncAst_JGyxom ? (
                        resolvedModifier_AlNXAW = !0, doReplace_TQRnqw(resolvedThemeFuncAst_JGyxom.nodes), 1) : (
                        foundModifier_FzMXFk ||= !1, replaceWithCb_OpwhmO([]), 2);
                      }
                    }
                  }) ?? 0) && (node_wQYeGb.value = stringifyAST_tQRzQG(astParsedValue_qsskPz));
                }),
                foundValue_qQtrZM && !resolvedValue_lnOmpV || foundModifier_FzMXFk && !resolvedModifier_AlNXAW || hasRatio_bafVIw && resolvedModifier_AlNXAW || argModifier_vZcvvm && !hasRatio_bafVIw && !resolvedModifier_AlNXAW)

                return null;
                if (hasRatio_bafVIw)
                for (let [delNode_dQjKPV, delParent_lKEDET] of declarationNodeMap_sPsEwh) {
                  let delAstIndex_TIPZUp = delParent_lKEDET.nodes.indexOf(delNode_dQjKPV);
                  -1 !== delAstIndex_TIPZUp && delParent_lKEDET.nodes.splice(delAstIndex_TIPZUp, 1);
                }
                return utilityNode_NSwnnM.nodes;
              }),
              api_EcTVvx.utilities.suggest(utilityParam_BqXmKy.slice(0, -2), () => {
                let valuesArr_LOFgEA = [],
                  modifiersArr_WVLEgT = [];
                for (let [
                arr_tEcTNq,
                {
                  literals: literalsSet_wbdlFl,
                  usedSpacingNumber: usedSpacingNumber_IfsazX,
                  usedSpacingInteger: usedSpacingInteger_FtjCnq,
                  themeKeys: themeKeysSet_TUDsGe
                }] of
                [
                [valuesArr_LOFgEA, astKeyMeta_ZxJVsM["--value"]],
                [modifiersArr_WVLEgT, astKeyMeta_ZxJVsM["--modifier"]]])
                {
                  for (let literal_LZmcgJ of literalsSet_wbdlFl) arr_tEcTNq.push(literal_LZmcgJ);
                  if (usedSpacingNumber_IfsazX) arr_tEcTNq.push(...spacingSteps_NjsqjM);else
                  if (usedSpacingInteger_FtjCnq) for (let spacingStep_dBWtqP of spacingSteps_NjsqjM) isNonNegativeInteger_QISFSJ(spacingStep_dBWtqP) && arr_tEcTNq.push(spacingStep_dBWtqP);
                  for (let themeKeyCandidate_PdrlnG of api_EcTVvx.theme.keysInNamespaces(themeKeysSet_TUDsGe))
                  arr_tEcTNq.push(themeKeyCandidate_PdrlnG.replace(fractionUnderscoreRegex_NMQBjU, (fractionMatch_HqbItN, wholePart_GGmqPC, fractionPart_GUSUeW) => `${wholePart_GGmqPC}.${fractionPart_GUSUeW}`));
                }
                return [{ values: valuesArr_LOFgEA, modifiers: modifiersArr_WVLEgT }];
              });
            } :
            themeKeyRegex_fJbAEU.test(utilityParam_BqXmKy) ?
            (api_uRJnRC) => {
              api_uRJnRC.utilities.static(utilityParam_BqXmKy, () => structuredClone(utilityAtRule_vPnVwt.nodes));
            } :
            null;
          }(node_xYjUKs);
          if (null === registerUtilityFn_mevXWe)
          throw new Error(
            `\`@utility ${node_xYjUKs.params}\` defines an invalid utility name. Utilities should be alphanumeric and start with a lowercase letter.`
          );
          utilityFnsArr_zYQOha.push(registerUtilityFn_mevXWe);
        }
        if ("@source" === node_xYjUKs.name) {
          if (node_xYjUKs.nodes.length > 0)
          throw new Error("`@source` cannot have a body.");
          if (null !== parent_qbLCUb) throw new Error("`@source` cannot be nested.");
          let isNegated_zFYPty = !1,
            isInline_HrTeKn = !1,
            pathParam_pBODpN = node_xYjUKs.params;
          if (
          "n" === pathParam_pBODpN[0] &&
          pathParam_pBODpN.startsWith("not ") && (
          isNegated_zFYPty = !0, pathParam_pBODpN = pathParam_pBODpN.slice(4)),
          "i" === pathParam_pBODpN[0] &&
          pathParam_pBODpN.startsWith("inline(") && (
          isInline_HrTeKn = !0, pathParam_pBODpN = pathParam_pBODpN.slice(7, -1)),
          '"' === pathParam_pBODpN[0] && '"' !== pathParam_pBODpN[pathParam_pBODpN.length - 1] ||
          "'" === pathParam_pBODpN[0] && "'" !== pathParam_pBODpN[pathParam_pBODpN.length - 1] ||
          "'" !== pathParam_pBODpN[0] && '"' !== pathParam_pBODpN[0])

          throw new Error("`@source` paths must be quoted.");
          let resolvedPath_kGfOBd = pathParam_pBODpN.slice(1, -1);
          if (isInline_HrTeKn) {
            let inlineArr_NyTchL = isNegated_zFYPty ? inlineNegatedCandidatesArr_AZRibA : inlineCandidatesArr_QUEsKh,
              inlineParts_BIDAtk = splitOnTopLevel_EfBwUv(resolvedPath_kGfOBd, " ");
            for (let inlinePart_KamzyQ of inlineParts_BIDAtk) for (let bracePath_SqYswA of expandPatternBraces_zjEvYm(inlinePart_KamzyQ)) inlineArr_NyTchL.push(bracePath_SqYswA);
          } else sourcesArr_wBXynu.push({ base: astContext_PAesUJ.base, pattern: resolvedPath_kGfOBd, negated: isNegated_zFYPty });
          return void replaceWithCb_vNnJkK([]);
        }
        if (
        "@variant" === node_xYjUKs.name && (
        null === parent_qbLCUb ?
        0 === node_xYjUKs.nodes.length ?
        node_xYjUKs.name = "@custom-variant" : (
        walkASTRecursive_YoBVFs(node_xYjUKs.nodes, (child_ndUwcC) => {
          if ("at-rule" === child_ndUwcC.kind && "@slot" === child_ndUwcC.name)
          return node_xYjUKs.name = "@custom-variant", 2;
        }),
        "@variant" === node_xYjUKs.name && variantNodesArr_JwRFJb.push(node_xYjUKs)) :
        variantNodesArr_JwRFJb.push(node_xYjUKs)),
        "@custom-variant" === node_xYjUKs.name)
        {
          if (null !== parent_qbLCUb)
          throw new Error("`@custom-variant` cannot be nested.");
          replaceWithCb_vNnJkK([]);
          let [variantName_fRIafp, variantRest_rxqCAg] = splitOnTopLevel_EfBwUv(node_xYjUKs.params, " ");
          if (!variantGroupRegex_aHueMa.test(variantName_fRIafp))
          throw new Error(
            `\`@custom-variant ${variantName_fRIafp}\` defines an invalid variant name. Variants should only contain alphanumeric, dashes or underscore characters.`
          );
          if (node_xYjUKs.nodes.length > 0 && variantRest_rxqCAg)
          throw new Error(
            `\`@custom-variant ${variantName_fRIafp}\` cannot have both a selector and a body.`
          );
          if (0 === node_xYjUKs.nodes.length) {
            if (!variantRest_rxqCAg)
            throw new Error(
              `\`@custom-variant ${variantName_fRIafp}\` has no selector or body.`
            );
            let selectorsArr_sLxSFE = splitOnTopLevel_EfBwUv(variantRest_rxqCAg.slice(1, -1), ",");
            if (0 === selectorsArr_sLxSFE.length || selectorsArr_sLxSFE.some((selector_zZnLDK) => "" === selector_zZnLDK.trim()))
            throw new Error(
              `\`@custom-variant ${variantName_fRIafp} (${selectorsArr_sLxSFE.join(",")})\` selector is invalid.`
            );
            let atSelectors_DfMfSK = [],
              normalSelectors_rbXAvF = [];
            for (let selector_fKOkrx of selectorsArr_sLxSFE)
            selector_fKOkrx = selector_fKOkrx.trim(), "@" === selector_fKOkrx[0] ? atSelectors_DfMfSK.push(selector_fKOkrx) : normalSelectors_rbXAvF.push(selector_fKOkrx);
            return void registerVariantFnsArr_CPwjiB.push((api_tKjvQu) => {
              api_tKjvQu.variants.static(
                variantName_fRIafp,
                (variantAst_osNkBp) => {
                  let replacementNodes_uXmkWO = [];
                  normalSelectors_rbXAvF.length > 0 && replacementNodes_uXmkWO.push(makeRuleNode_PDClCj(normalSelectors_rbXAvF.join(", "), variantAst_osNkBp.nodes));
                  for (let atSel_DqgavC of atSelectors_DfMfSK) replacementNodes_uXmkWO.push(parseCSSRule_QVgHxe(atSel_DqgavC, variantAst_osNkBp.nodes));
                  variantAst_osNkBp.nodes = replacementNodes_uXmkWO;
                },
                { compounds: getCompoundsNumber_NglmcN([...normalSelectors_rbXAvF, ...atSelectors_DfMfSK]) }
              );
            });
          }
          return void registerVariantFnsArr_CPwjiB.push((api_mImFXG) => {
            api_mImFXG.variants.fromAst(variantName_fRIafp, node_xYjUKs.nodes);
          });
        }
        if ("@media" === node_xYjUKs.name) {
          let partsArr_fOhtKn = splitOnTopLevel_EfBwUv(node_xYjUKs.params, " "),
            outputParamsArr_QhMdnj = [];
          for (let part_dfzfvF of partsArr_fOhtKn)
          if (part_dfzfvF.startsWith("source(")) {
            let sourceVal_JsxDAu = part_dfzfvF.slice(7, -1);
            walkASTRecursive_YoBVFs(node_xYjUKs.nodes, (utilNode_qwzXsC, { replaceWith: replaceWith_loajLQ }) => {
              if (
              "at-rule" === utilNode_qwzXsC.kind &&
              "@tailwind" === utilNode_qwzXsC.name &&
              "utilities" === utilNode_qwzXsC.params)

              return (
                utilNode_qwzXsC.params += ` source(${sourceVal_JsxDAu})`,
                replaceWith_loajLQ([makeContextNode_dEmkmt({ sourceBase: astContext_PAesUJ.base }, [utilNode_qwzXsC])]),
                2);

            });
          } else if (part_dfzfvF.startsWith("theme(")) {
            let themeVal_YNopjD = part_dfzfvF.slice(6, -1),
              isReference_nxFHUe = themeVal_YNopjD.includes("reference");
            walkASTRecursive_YoBVFs(node_xYjUKs.nodes, (child_oDpODB) => {
              if ("at-rule" !== child_oDpODB.kind) {
                if (isReference_nxFHUe)
                throw new Error(
                  'Files imported with `@import "…" theme(reference)` must only contain `@theme` blocks.\nUse `@reference "…";` instead.'
                );
                return 0;
              }
              if ("@theme" === child_oDpODB.name) return child_oDpODB.params += " " + themeVal_YNopjD, 1;
            });
          } else if (part_dfzfvF.startsWith("prefix(")) {
            let prefixVal_hYRNZz = part_dfzfvF.slice(7, -1);
            walkASTRecursive_YoBVFs(node_xYjUKs.nodes, (themeNode_ZpYJKA) => {
              if ("at-rule" === themeNode_ZpYJKA.kind && "@theme" === themeNode_ZpYJKA.name)
              return themeNode_ZpYJKA.params += ` prefix(${prefixVal_hYRNZz})`, 1;
            });
          } else
          "important" === part_dfzfvF ?
          presetConfig_WMNIxg = !0 :
          "reference" === part_dfzfvF ?
          node_xYjUKs.nodes = [makeContextNode_dEmkmt({ reference: !0 }, node_xYjUKs.nodes)] :
          outputParamsArr_QhMdnj.push(part_dfzfvF);
          outputParamsArr_QhMdnj.length > 0 ? node_xYjUKs.params = outputParamsArr_QhMdnj.join(" ") : partsArr_fOhtKn.length > 0 && replaceWithCb_vNnJkK(node_xYjUKs.nodes);
        }
        if ("@theme" === node_xYjUKs.name) {
          let [modeFlag_abaEha, prefix_kOaIXx] = function (params_spdWPC) {
            let flags_UttDqS = 0,
              prefixStr_jozuGR = null;
            for (let part_DiPhSp of splitOnTopLevel_EfBwUv(params_spdWPC, " "))
            "reference" === part_DiPhSp ?
            flags_UttDqS |= 2 :
            "inline" === part_DiPhSp ?
            flags_UttDqS |= 1 :
            "default" === part_DiPhSp ?
            flags_UttDqS |= 4 :
            "static" === part_DiPhSp ?
            flags_UttDqS |= 8 :
            part_DiPhSp.startsWith("prefix(") &&
            part_DiPhSp.endsWith(")") && (
            prefixStr_jozuGR = part_DiPhSp.slice(7, -1));
            return [flags_UttDqS, prefixStr_jozuGR];
          }(node_xYjUKs.params);
          if (astContext_PAesUJ.reference && (modeFlag_abaEha |= 2), prefix_kOaIXx) {
            if (!lowercaseStringRegex_mjaYLQ.test(prefix_kOaIXx))
            throw new Error(
              `The prefix "${prefix_kOaIXx}" is invalid. Prefixes must be lowercase ASCII letters (a-z) only.`
            );
            themeVarMap_aIhrxV.prefix = prefix_kOaIXx;
          }
          return (
            walkASTRecursive_YoBVFs(node_xYjUKs.nodes, (themeNode_muvbsl) => {
              if ("at-rule" === themeNode_muvbsl.kind && "@keyframes" === themeNode_muvbsl.name)
              return themeVarMap_aIhrxV.addKeyframes(themeNode_muvbsl), 1;
              if ("comment" === themeNode_muvbsl.kind) return;
              if ("declaration" === themeNode_muvbsl.kind && themeNode_muvbsl.property.startsWith("--"))
              return void themeVarMap_aIhrxV.add(cssUnescape_MNuHwL(themeNode_muvbsl.property), themeNode_muvbsl.value ?? "", modeFlag_abaEha);
              let snippet_keaGVs = astNodesToCss_kEgwyH([processAtRule_lWgxgY(node_xYjUKs.name, node_xYjUKs.params, [themeNode_muvbsl])]).
              split("\n").
              map(
                (lineText_qNcGJm, lineIndex_LkKRNB, linesArray_noyRrR) =>
                `${0 === lineIndex_LkKRNB || lineIndex_LkKRNB >= linesArray_noyRrR.length - 2 ? " " : ">"} ${lineText_qNcGJm}`
              ).
              join("\n");
              throw new Error(
                `\`@theme\` blocks must only contain custom properties or \`@keyframes\`.\n\n${snippet_keaGVs}`
              );
            }),
            twUtilitiesNode_DaLcCM ? replaceWithCb_vNnJkK([]) : (twUtilitiesNode_DaLcCM = makeRuleNode_PDClCj(":root, :host", []), replaceWithCb_vNnJkK([twUtilitiesNode_DaLcCM])),
            1);

        }
      }
    });
    let utilityRegistry_nSEXbD = makeUtilityRegistryFromTheme_cPLaiR(themeVarMap_aIhrxV);
    if (presetConfig_WMNIxg && (utilityRegistry_nSEXbD.important = presetConfig_WMNIxg), inlineNegatedCandidatesArr_AZRibA.length > 0)
    for (let negatedCandidate_dDwGNL of inlineNegatedCandidatesArr_AZRibA) utilityRegistry_nSEXbD.invalidCandidates.add(negatedCandidate_dDwGNL);
    featuresFlag_qQStiL |= await processPluginAtRules_QWqTzB({
      designSystem: utilityRegistry_nSEXbD,
      base: baseDir_LypBRc,
      ast: rootAst_RibqIE,
      loadModule: loadModuleFn_XCmycY,
      sources: sourcesArr_wBXynu
    });
    for (let registerVariantCb_dskkqL of registerVariantFnsArr_CPwjiB) registerVariantCb_dskkqL(utilityRegistry_nSEXbD);
    for (let registerUtilityCb_kURmwm of utilityFnsArr_zYQOha) registerUtilityCb_kURmwm(utilityRegistry_nSEXbD);
    if (twUtilitiesNode_DaLcCM) {
      let rootVars_rgOVbz = [];
      for (let [property_ckusFI, entry_mCJdBq] of utilityRegistry_nSEXbD.theme.entries())
      2 & entry_mCJdBq.options || rootVars_rgOVbz.push(makeDeclarationNode_xYlaTt(cssEscape_aDBdYz(property_ckusFI), entry_mCJdBq.value));
      let keyframes_uTbbJU = utilityRegistry_nSEXbD.theme.getKeyframes();
      for (let keyframe_xoGDGg of keyframes_uTbbJU) rootAst_RibqIE.push(makeContextNode_dEmkmt({ theme: !0 }, [makeAtRootNode_uVreCe([keyframe_xoGDGg])]));
      twUtilitiesNode_DaLcCM.nodes = [makeContextNode_dEmkmt({ theme: !0 }, rootVars_rgOVbz)];
    }
    if (mainUtilitiesAtRule_ClfpKw) {
      let node_OYodlK = mainUtilitiesAtRule_ClfpKw;
      node_OYodlK.kind = "context", node_OYodlK.context = {};
    }
    if (variantNodesArr_JwRFJb.length > 0) {
      for (let variantNode_CrIgmk of variantNodesArr_JwRFJb) {
        let wrappedAst_ANOGSE = makeRuleNode_PDClCj("&", variantNode_CrIgmk.nodes),
          param_uBXbsD = variantNode_CrIgmk.params,
          parsedVariant_RPcnFJ = utilityRegistry_nSEXbD.parseVariant(param_uBXbsD);
        if (null === parsedVariant_RPcnFJ)
        throw new Error(`Cannot use \`@variant\` with unknown variant: ${param_uBXbsD}`);
        if (null === applyVariant_avuaSo(wrappedAst_ANOGSE, parsedVariant_RPcnFJ, utilityRegistry_nSEXbD.variants))
        throw new Error(`Cannot use \`@variant\` with variant: ${param_uBXbsD}`);
        Object.assign(variantNode_CrIgmk, wrappedAst_ANOGSE);
      }
      featuresFlag_qQStiL |= 32;
    }
    return (
      featuresFlag_qQStiL |= evaluateThemeFunctions_XAqelQ(rootAst_RibqIE, utilityRegistry_nSEXbD),
      featuresFlag_qQStiL |= applyAtRuleProcessing_TKjlCh(rootAst_RibqIE, utilityRegistry_nSEXbD),
      walkASTRecursive_YoBVFs(rootAst_RibqIE, (node_klYTqi, { replaceWith: replaceWith_jHMpga }) => {
        if ("at-rule" === node_klYTqi.kind) return "@utility" === node_klYTqi.name && replaceWith_jHMpga([]), 1;
      }),
      {
        designSystem: utilityRegistry_nSEXbD,
        ast: rootAst_RibqIE,
        sources: sourcesArr_wBXynu,
        root: utilitiesSource_DgQZjl,
        utilitiesNode: mainUtilitiesAtRule_ClfpKw,
        features: featuresFlag_qQStiL,
        inlineCandidates: inlineCandidatesArr_QUEsKh
      });

  }
  async function compileTailwindCss_uyhkzZ(cssSource_xhXPZg, compileOpts_zSIhIf = {}) {
    let parsedCssAst_aSVEEQ = parseCSS_iwVxBN(cssSource_xhXPZg),
      compileResult_fTPuxf = await async function (rootAst_QSBuMi, opts_oYJmZu = {}) {
        let {
          designSystem: designSystem_XKRkVI,
          ast: ast_yRDkwi,
          sources: sources_qUTbAb,
          root: rootSource_fANnlT,
          utilitiesNode: utilitiesNode_TVMuij,
          features: features_tITQYj,
          inlineCandidates: inlineCandidates_cpPdlH
        } = await compileAstToUtilities_CUShHH(rootAst_QSBuMi, opts_oYJmZu);
        function addInvalidCandidate_CKozQy(candidate_lbGqTd) {
          designSystem_XKRkVI.invalidCandidates.add(candidate_lbGqTd);
        }
        ast_yRDkwi.unshift(
          processComment_NLgzxN("! tailwindcss v4.1.5 | MIT License | https://tailwindcss.com ")
        );
        let candidateSet_gcHPdr = new Set(),
          cachedStyleData_gZalTU = null,
          lastNodeCount_HeEOwE = 0,
          hasCandidateChanged_XDqPNX = !1;
        for (let inlineCandidate_ZGqArs of inlineCandidates_cpPdlH) designSystem_XKRkVI.invalidCandidates.has(inlineCandidate_ZGqArs) || (candidateSet_gcHPdr.add(inlineCandidate_ZGqArs), hasCandidateChanged_XDqPNX = !0);
        return {
          sources: sources_qUTbAb,
          root: rootSource_fANnlT,
          features: features_tITQYj,
          build(newCandidates_PCWXzT) {
            if (0 === features_tITQYj) return rootAst_QSBuMi;
            if (!utilitiesNode_TVMuij) return cachedStyleData_gZalTU ??= collectStyleData_TDFsgx(ast_yRDkwi, designSystem_XKRkVI, opts_oYJmZu.polyfills), cachedStyleData_gZalTU;
            let needsUpdate_VIiOaz = hasCandidateChanged_XDqPNX,
              themeVarChanged_xrsjQd = !1;
            hasCandidateChanged_XDqPNX = !1;
            let priorCandidateCount_IfSNJy = candidateSet_gcHPdr.size;
            for (let candidate_PIEGjP of newCandidates_PCWXzT)
            if (!designSystem_XKRkVI.invalidCandidates.has(candidate_PIEGjP))
            if ("-" === candidate_PIEGjP[0] && "-" === candidate_PIEGjP[1]) {
              let markedThemeVarChanged_ErtXGq = designSystem_XKRkVI.theme.markUsedVariable(candidate_PIEGjP);
              needsUpdate_VIiOaz ||= markedThemeVarChanged_ErtXGq, themeVarChanged_xrsjQd ||= markedThemeVarChanged_ErtXGq;
            } else candidateSet_gcHPdr.add(candidate_PIEGjP), needsUpdate_VIiOaz ||= candidateSet_gcHPdr.size !== priorCandidateCount_IfSNJy;
            if (!needsUpdate_VIiOaz) return cachedStyleData_gZalTU ??= collectStyleData_TDFsgx(ast_yRDkwi, designSystem_XKRkVI, opts_oYJmZu.polyfills), cachedStyleData_gZalTU;
            let resolvedAstNodes_KdMfjv = resolveCandidatesToAst_xoVMHU(candidateSet_gcHPdr, designSystem_XKRkVI, { onInvalidCandidate: addInvalidCandidate_CKozQy }).astNodes;
            return themeVarChanged_xrsjQd || lastNodeCount_HeEOwE !== resolvedAstNodes_KdMfjv.length ? (
            lastNodeCount_HeEOwE = resolvedAstNodes_KdMfjv.length, utilitiesNode_TVMuij.nodes = resolvedAstNodes_KdMfjv, cachedStyleData_gZalTU = collectStyleData_TDFsgx(ast_yRDkwi, designSystem_XKRkVI, opts_oYJmZu.polyfills), cachedStyleData_gZalTU) : (
            cachedStyleData_gZalTU ??= collectStyleData_TDFsgx(ast_yRDkwi, designSystem_XKRkVI, opts_oYJmZu.polyfills), cachedStyleData_gZalTU);
          }
        };
      }(parsedCssAst_aSVEEQ, compileOpts_zSIhIf),
      lastAst_fAZBEi = parsedCssAst_aSVEEQ,
      builtCss_bQFffo = cssSource_xhXPZg;
    return {
      ...compileResult_fTPuxf,
      build(buildCandidates_SXdlSA) {
        let builtAst_FheaBm = compileResult_fTPuxf.build(buildCandidates_SXdlSA);
        return builtAst_FheaBm === lastAst_fAZBEi || (builtCss_bQFffo = astNodesToCss_kEgwyH(builtAst_FheaBm), lastAst_fAZBEi = builtAst_FheaBm), builtCss_bQFffo;
      }
    };
  }
  var defaultTailwindStyleContent_UlQqnO = {
    index:
    "@layer theme, base, components, utilities;\n\n@import './theme.css' layer(theme);\n@import './preflight.css' layer(base);\n@import './utilities.css' layer(utilities);\n",
    preflight:
    "/*\n  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n  2. Remove default margins and padding\n  3. Reset all borders.\n*/\n\n*,\n::after,\n::before,\n::backdrop,\n::file-selector-button {\n  box-sizing: border-box; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 2 */\n  border: 0 solid; /* 3 */\n}\n\n/*\n  1. Use a consistent sensible line-height in all browsers.\n  2. Prevent adjustments of font size after orientation changes in iOS.\n  3. Use a more readable tab size.\n  4. Use the user's configured `sans` font-family by default.\n  5. Use the user's configured `sans` font-feature-settings by default.\n  6. Use the user's configured `sans` font-variation-settings by default.\n  7. Disable tap highlights on iOS.\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  tab-size: 4; /* 3 */\n  font-family: --theme(\n    --default-font-family,\n    ui-sans-serif,\n    system-ui,\n    sans-serif,\n    'Apple Color Emoji',\n    'Segoe UI Emoji',\n    'Segoe UI Symbol',\n    'Noto Color Emoji'\n  ); /* 4 */\n  font-feature-settings: --theme(--default-font-feature-settings, normal); /* 5 */\n  font-variation-settings: --theme(--default-font-variation-settings, normal); /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n  1. Add the correct height in Firefox.\n  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n  3. Reset the default border style to a 1px solid border.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\n  Add the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n}\n\n/*\n  Remove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\n  Reset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  -webkit-text-decoration: inherit;\n  text-decoration: inherit;\n}\n\n/*\n  Add the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n  1. Use the user's configured `mono` font-family by default.\n  2. Use the user's configured `mono` font-feature-settings by default.\n  3. Use the user's configured `mono` font-variation-settings by default.\n  4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: --theme(\n    --default-mono-font-family,\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    'Liberation Mono',\n    'Courier New',\n    monospace\n  ); /* 1 */\n  font-feature-settings: --theme(--default-mono-font-feature-settings, normal); /* 2 */\n  font-variation-settings: --theme(--default-mono-font-variation-settings, normal); /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\n  Add the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\n  Prevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n  3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n  Use the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\n  Add the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\n  Add the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\n  Make lists unstyled by default.\n*/\n\nol,\nul,\nmenu {\n  list-style: none;\n}\n\n/*\n  1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n  2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n      This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\n  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/*\n  1. Inherit font styles in all browsers.\n  2. Remove border radius in all browsers.\n  3. Remove background color in all browsers.\n  4. Ensure consistent opacity for disabled states in all browsers.\n*/\n\nbutton,\ninput,\nselect,\noptgroup,\ntextarea,\n::file-selector-button {\n  font: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  letter-spacing: inherit; /* 1 */\n  color: inherit; /* 1 */\n  border-radius: 0; /* 2 */\n  background-color: transparent; /* 3 */\n  opacity: 1; /* 4 */\n}\n\n/*\n  Restore default font weight.\n*/\n\n:where(select:is([multiple], [size])) optgroup {\n  font-weight: bolder;\n}\n\n/*\n  Restore indentation.\n*/\n\n:where(select:is([multiple], [size])) optgroup option {\n  padding-inline-start: 20px;\n}\n\n/*\n  Restore space after button.\n*/\n\n::file-selector-button {\n  margin-inline-end: 4px;\n}\n\n/*\n  Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n*/\n\n::placeholder {\n  opacity: 1;\n}\n\n/*\n  Set the default placeholder color to a semi-transparent version of the current text color in browsers that do not\n  crash when using `color-mix(…)` with `currentcolor`. (https://github.com/tailwindlabs/tailwindcss/issues/17194)\n*/\n\n@supports (not (-webkit-appearance: -apple-pay-button)) /* Not Safari */ or\n  (contain-intrinsic-size: 1px) /* Safari 17+ */ {\n  ::placeholder {\n    color: color-mix(in oklab, currentcolor 50%, transparent);\n  }\n}\n\n/*\n  Prevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n  Remove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n  1. Ensure date/time inputs have the same height when empty in iOS Safari.\n  2. Ensure text alignment can be changed on date/time inputs in iOS Safari.\n*/\n\n::-webkit-date-and-time-value {\n  min-height: 1lh; /* 1 */\n  text-align: inherit; /* 2 */\n}\n\n/*\n  Prevent height from changing on date/time inputs in macOS Safari when the input is set to `display: block`.\n*/\n\n::-webkit-datetime-edit {\n  display: inline-flex;\n}\n\n/*\n  Remove excess padding from pseudo-elements in date/time inputs to ensure consistent height across browsers.\n*/\n\n::-webkit-datetime-edit-fields-wrapper {\n  padding: 0;\n}\n\n::-webkit-datetime-edit,\n::-webkit-datetime-edit-year-field,\n::-webkit-datetime-edit-month-field,\n::-webkit-datetime-edit-day-field,\n::-webkit-datetime-edit-hour-field,\n::-webkit-datetime-edit-minute-field,\n::-webkit-datetime-edit-second-field,\n::-webkit-datetime-edit-millisecond-field,\n::-webkit-datetime-edit-meridiem-field {\n  padding-block: 0;\n}\n\n/*\n  Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\n  Correct the inability to style the border radius in iOS Safari.\n*/\n\nbutton,\ninput:where([type='button'], [type='reset'], [type='submit']),\n::file-selector-button {\n  appearance: button;\n}\n\n/*\n  Correct the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n  Make elements with the HTML hidden attribute stay hidden by default.\n*/\n\n[hidden]:where(:not([hidden='until-found'])) {\n  display: none !important;\n}\n",
    theme:
    "@theme default {\n  --font-sans:\n    ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',\n    'Noto Color Emoji';\n  --font-serif: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;\n  --font-mono:\n    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',\n    monospace;\n\n  --color-red-50: oklch(97.1% 0.013 17.38);\n  --color-red-100: oklch(93.6% 0.032 17.717);\n  --color-red-200: oklch(88.5% 0.062 18.334);\n  --color-red-300: oklch(80.8% 0.114 19.571);\n  --color-red-400: oklch(70.4% 0.191 22.216);\n  --color-red-500: oklch(63.7% 0.237 25.331);\n  --color-red-600: oklch(57.7% 0.245 27.325);\n  --color-red-700: oklch(50.5% 0.213 27.518);\n  --color-red-800: oklch(44.4% 0.177 26.899);\n  --color-red-900: oklch(39.6% 0.141 25.723);\n  --color-red-950: oklch(25.8% 0.092 26.042);\n\n  --color-orange-50: oklch(98% 0.016 73.684);\n  --color-orange-100: oklch(95.4% 0.038 75.164);\n  --color-orange-200: oklch(90.1% 0.076 70.697);\n  --color-orange-300: oklch(83.7% 0.128 66.29);\n  --color-orange-400: oklch(75% 0.183 55.934);\n  --color-orange-500: oklch(70.5% 0.213 47.604);\n  --color-orange-600: oklch(64.6% 0.222 41.116);\n  --color-orange-700: oklch(55.3% 0.195 38.402);\n  --color-orange-800: oklch(47% 0.157 37.304);\n  --color-orange-900: oklch(40.8% 0.123 38.172);\n  --color-orange-950: oklch(26.6% 0.079 36.259);\n\n  --color-amber-50: oklch(98.7% 0.022 95.277);\n  --color-amber-100: oklch(96.2% 0.059 95.617);\n  --color-amber-200: oklch(92.4% 0.12 95.746);\n  --color-amber-300: oklch(87.9% 0.169 91.605);\n  --color-amber-400: oklch(82.8% 0.189 84.429);\n  --color-amber-500: oklch(76.9% 0.188 70.08);\n  --color-amber-600: oklch(66.6% 0.179 58.318);\n  --color-amber-700: oklch(55.5% 0.163 48.998);\n  --color-amber-800: oklch(47.3% 0.137 46.201);\n  --color-amber-900: oklch(41.4% 0.112 45.904);\n  --color-amber-950: oklch(27.9% 0.077 45.635);\n\n  --color-yellow-50: oklch(98.7% 0.026 102.212);\n  --color-yellow-100: oklch(97.3% 0.071 103.193);\n  --color-yellow-200: oklch(94.5% 0.129 101.54);\n  --color-yellow-300: oklch(90.5% 0.182 98.111);\n  --color-yellow-400: oklch(85.2% 0.199 91.936);\n  --color-yellow-500: oklch(79.5% 0.184 86.047);\n  --color-yellow-600: oklch(68.1% 0.162 75.834);\n  --color-yellow-700: oklch(55.4% 0.135 66.442);\n  --color-yellow-800: oklch(47.6% 0.114 61.907);\n  --color-yellow-900: oklch(42.1% 0.095 57.708);\n  --color-yellow-950: oklch(28.6% 0.066 53.813);\n\n  --color-lime-50: oklch(98.6% 0.031 120.757);\n  --color-lime-100: oklch(96.7% 0.067 122.328);\n  --color-lime-200: oklch(93.8% 0.127 124.321);\n  --color-lime-300: oklch(89.7% 0.196 126.665);\n  --color-lime-400: oklch(84.1% 0.238 128.85);\n  --color-lime-500: oklch(76.8% 0.233 130.85);\n  --color-lime-600: oklch(64.8% 0.2 131.684);\n  --color-lime-700: oklch(53.2% 0.157 131.589);\n  --color-lime-800: oklch(45.3% 0.124 130.933);\n  --color-lime-900: oklch(40.5% 0.101 131.063);\n  --color-lime-950: oklch(27.4% 0.072 132.109);\n\n  --color-green-50: oklch(98.2% 0.018 155.826);\n  --color-green-100: oklch(96.2% 0.044 156.743);\n  --color-green-200: oklch(92.5% 0.084 155.995);\n  --color-green-300: oklch(87.1% 0.15 154.449);\n  --color-green-400: oklch(79.2% 0.209 151.711);\n  --color-green-500: oklch(72.3% 0.219 149.579);\n  --color-green-600: oklch(62.7% 0.194 149.214);\n  --color-green-700: oklch(52.7% 0.154 150.069);\n  --color-green-800: oklch(44.8% 0.119 151.328);\n  --color-green-900: oklch(39.3% 0.095 152.535);\n  --color-green-950: oklch(26.6% 0.065 152.934);\n\n  --color-emerald-50: oklch(97.9% 0.021 166.113);\n  --color-emerald-100: oklch(95% 0.052 163.051);\n  --color-emerald-200: oklch(90.5% 0.093 164.15);\n  --color-emerald-300: oklch(84.5% 0.143 164.978);\n  --color-emerald-400: oklch(76.5% 0.177 163.223);\n  --color-emerald-500: oklch(69.6% 0.17 162.48);\n  --color-emerald-600: oklch(59.6% 0.145 163.225);\n  --color-emerald-700: oklch(50.8% 0.118 165.612);\n  --color-emerald-800: oklch(43.2% 0.095 166.913);\n  --color-emerald-900: oklch(37.8% 0.077 168.94);\n  --color-emerald-950: oklch(26.2% 0.051 172.552);\n\n  --color-teal-50: oklch(98.4% 0.014 180.72);\n  --color-teal-100: oklch(95.3% 0.051 180.801);\n  --color-teal-200: oklch(91% 0.096 180.426);\n  --color-teal-300: oklch(85.5% 0.138 181.071);\n  --color-teal-400: oklch(77.7% 0.152 181.912);\n  --color-teal-500: oklch(70.4% 0.14 182.503);\n  --color-teal-600: oklch(60% 0.118 184.704);\n  --color-teal-700: oklch(51.1% 0.096 186.391);\n  --color-teal-800: oklch(43.7% 0.078 188.216);\n  --color-teal-900: oklch(38.6% 0.063 188.416);\n  --color-teal-950: oklch(27.7% 0.046 192.524);\n\n  --color-cyan-50: oklch(98.4% 0.019 200.873);\n  --color-cyan-100: oklch(95.6% 0.045 203.388);\n  --color-cyan-200: oklch(91.7% 0.08 205.041);\n  --color-cyan-300: oklch(86.5% 0.127 207.078);\n  --color-cyan-400: oklch(78.9% 0.154 211.53);\n  --color-cyan-500: oklch(71.5% 0.143 215.221);\n  --color-cyan-600: oklch(60.9% 0.126 221.723);\n  --color-cyan-700: oklch(52% 0.105 223.128);\n  --color-cyan-800: oklch(45% 0.085 224.283);\n  --color-cyan-900: oklch(39.8% 0.07 227.392);\n  --color-cyan-950: oklch(30.2% 0.056 229.695);\n\n  --color-sky-50: oklch(97.7% 0.013 236.62);\n  --color-sky-100: oklch(95.1% 0.026 236.824);\n  --color-sky-200: oklch(90.1% 0.058 230.902);\n  --color-sky-300: oklch(82.8% 0.111 230.318);\n  --color-sky-400: oklch(74.6% 0.16 232.661);\n  --color-sky-500: oklch(68.5% 0.169 237.323);\n  --color-sky-600: oklch(58.8% 0.158 241.966);\n  --color-sky-700: oklch(50% 0.134 242.749);\n  --color-sky-800: oklch(44.3% 0.11 240.79);\n  --color-sky-900: oklch(39.1% 0.09 240.876);\n  --color-sky-950: oklch(29.3% 0.066 243.157);\n\n  --color-blue-50: oklch(97% 0.014 254.604);\n  --color-blue-100: oklch(93.2% 0.032 255.585);\n  --color-blue-200: oklch(88.2% 0.059 254.128);\n  --color-blue-300: oklch(80.9% 0.105 251.813);\n  --color-blue-400: oklch(70.7% 0.165 254.624);\n  --color-blue-500: oklch(62.3% 0.214 259.815);\n  --color-blue-600: oklch(54.6% 0.245 262.881);\n  --color-blue-700: oklch(48.8% 0.243 264.376);\n  --color-blue-800: oklch(42.4% 0.199 265.638);\n  --color-blue-900: oklch(37.9% 0.146 265.522);\n  --color-blue-950: oklch(28.2% 0.091 267.935);\n\n  --color-indigo-50: oklch(96.2% 0.018 272.314);\n  --color-indigo-100: oklch(93% 0.034 272.788);\n  --color-indigo-200: oklch(87% 0.065 274.039);\n  --color-indigo-300: oklch(78.5% 0.115 274.713);\n  --color-indigo-400: oklch(67.3% 0.182 276.935);\n  --color-indigo-500: oklch(58.5% 0.233 277.117);\n  --color-indigo-600: oklch(51.1% 0.262 276.966);\n  --color-indigo-700: oklch(45.7% 0.24 277.023);\n  --color-indigo-800: oklch(39.8% 0.195 277.366);\n  --color-indigo-900: oklch(35.9% 0.144 278.697);\n  --color-indigo-950: oklch(25.7% 0.09 281.288);\n\n  --color-violet-50: oklch(96.9% 0.016 293.756);\n  --color-violet-100: oklch(94.3% 0.029 294.588);\n  --color-violet-200: oklch(89.4% 0.057 293.283);\n  --color-violet-300: oklch(81.1% 0.111 293.571);\n  --color-violet-400: oklch(70.2% 0.183 293.541);\n  --color-violet-500: oklch(60.6% 0.25 292.717);\n  --color-violet-600: oklch(54.1% 0.281 293.009);\n  --color-violet-700: oklch(49.1% 0.27 292.581);\n  --color-violet-800: oklch(43.2% 0.232 292.759);\n  --color-violet-900: oklch(38% 0.189 293.745);\n  --color-violet-950: oklch(28.3% 0.141 291.089);\n\n  --color-purple-50: oklch(97.7% 0.014 308.299);\n  --color-purple-100: oklch(94.6% 0.033 307.174);\n  --color-purple-200: oklch(90.2% 0.063 306.703);\n  --color-purple-300: oklch(82.7% 0.119 306.383);\n  --color-purple-400: oklch(71.4% 0.203 305.504);\n  --color-purple-500: oklch(62.7% 0.265 303.9);\n  --color-purple-600: oklch(55.8% 0.288 302.321);\n  --color-purple-700: oklch(49.6% 0.265 301.924);\n  --color-purple-800: oklch(43.8% 0.218 303.724);\n  --color-purple-900: oklch(38.1% 0.176 304.987);\n  --color-purple-950: oklch(29.1% 0.149 302.717);\n\n  --color-fuchsia-50: oklch(97.7% 0.017 320.058);\n  --color-fuchsia-100: oklch(95.2% 0.037 318.852);\n  --color-fuchsia-200: oklch(90.3% 0.076 319.62);\n  --color-fuchsia-300: oklch(83.3% 0.145 321.434);\n  --color-fuchsia-400: oklch(74% 0.238 322.16);\n  --color-fuchsia-500: oklch(66.7% 0.295 322.15);\n  --color-fuchsia-600: oklch(59.1% 0.293 322.896);\n  --color-fuchsia-700: oklch(51.8% 0.253 323.949);\n  --color-fuchsia-800: oklch(45.2% 0.211 324.591);\n  --color-fuchsia-900: oklch(40.1% 0.17 325.612);\n  --color-fuchsia-950: oklch(29.3% 0.136 325.661);\n\n  --color-pink-50: oklch(97.1% 0.014 343.198);\n  --color-pink-100: oklch(94.8% 0.028 342.258);\n  --color-pink-200: oklch(89.9% 0.061 343.231);\n  --color-pink-300: oklch(82.3% 0.12 346.018);\n  --color-pink-400: oklch(71.8% 0.202 349.761);\n  --color-pink-500: oklch(65.6% 0.241 354.308);\n  --color-pink-600: oklch(59.2% 0.249 0.584);\n  --color-pink-700: oklch(52.5% 0.223 3.958);\n  --color-pink-800: oklch(45.9% 0.187 3.815);\n  --color-pink-900: oklch(40.8% 0.153 2.432);\n  --color-pink-950: oklch(28.4% 0.109 3.907);\n\n  --color-rose-50: oklch(96.9% 0.015 12.422);\n  --color-rose-100: oklch(94.1% 0.03 12.58);\n  --color-rose-200: oklch(89.2% 0.058 10.001);\n  --color-rose-300: oklch(81% 0.117 11.638);\n  --color-rose-400: oklch(71.2% 0.194 13.428);\n  --color-rose-500: oklch(64.5% 0.246 16.439);\n  --color-rose-600: oklch(58.6% 0.253 17.585);\n  --color-rose-700: oklch(51.4% 0.222 16.935);\n  --color-rose-800: oklch(45.5% 0.188 13.697);\n  --color-rose-900: oklch(41% 0.159 10.272);\n  --color-rose-950: oklch(27.1% 0.105 12.094);\n\n  --color-slate-50: oklch(98.4% 0.003 247.858);\n  --color-slate-100: oklch(96.8% 0.007 247.896);\n  --color-slate-200: oklch(92.9% 0.013 255.508);\n  --color-slate-300: oklch(86.9% 0.022 252.894);\n  --color-slate-400: oklch(70.4% 0.04 256.788);\n  --color-slate-500: oklch(55.4% 0.046 257.417);\n  --color-slate-600: oklch(44.6% 0.043 257.281);\n  --color-slate-700: oklch(37.2% 0.044 257.287);\n  --color-slate-800: oklch(27.9% 0.041 260.031);\n  --color-slate-900: oklch(20.8% 0.042 265.755);\n  --color-slate-950: oklch(12.9% 0.042 264.695);\n\n  --color-gray-50: oklch(98.5% 0.002 247.839);\n  --color-gray-100: oklch(96.7% 0.003 264.542);\n  --color-gray-200: oklch(92.8% 0.006 264.531);\n  --color-gray-300: oklch(87.2% 0.01 258.338);\n  --color-gray-400: oklch(70.7% 0.022 261.325);\n  --color-gray-500: oklch(55.1% 0.027 264.364);\n  --color-gray-600: oklch(44.6% 0.03 256.802);\n  --color-gray-700: oklch(37.3% 0.034 259.733);\n  --color-gray-800: oklch(27.8% 0.033 256.848);\n  --color-gray-900: oklch(21% 0.034 264.665);\n  --color-gray-950: oklch(13% 0.028 261.692);\n\n  --color-zinc-50: oklch(98.5% 0 0);\n  --color-zinc-100: oklch(96.7% 0.001 286.375);\n  --color-zinc-200: oklch(92% 0.004 286.32);\n  --color-zinc-300: oklch(87.1% 0.006 286.286);\n  --color-zinc-400: oklch(70.5% 0.015 286.067);\n  --color-zinc-500: oklch(55.2% 0.016 285.938);\n  --color-zinc-600: oklch(44.2% 0.017 285.786);\n  --color-zinc-700: oklch(37% 0.013 285.805);\n  --color-zinc-800: oklch(27.4% 0.006 286.033);\n  --color-zinc-900: oklch(21% 0.006 285.885);\n  --color-zinc-950: oklch(14.1% 0.005 285.823);\n\n  --color-neutral-50: oklch(98.5% 0 0);\n  --color-neutral-100: oklch(97% 0 0);\n  --color-neutral-200: oklch(92.2% 0 0);\n  --color-neutral-300: oklch(87% 0 0);\n  --color-neutral-400: oklch(70.8% 0 0);\n  --color-neutral-500: oklch(55.6% 0 0);\n  --color-neutral-600: oklch(43.9% 0 0);\n  --color-neutral-700: oklch(37.1% 0 0);\n  --color-neutral-800: oklch(26.9% 0 0);\n  --color-neutral-900: oklch(20.5% 0 0);\n  --color-neutral-950: oklch(14.5% 0 0);\n\n  --color-stone-50: oklch(98.5% 0.001 106.423);\n  --color-stone-100: oklch(97% 0.001 106.424);\n  --color-stone-200: oklch(92.3% 0.003 48.717);\n  --color-stone-300: oklch(86.9% 0.005 56.366);\n  --color-stone-400: oklch(70.9% 0.01 56.259);\n  --color-stone-500: oklch(55.3% 0.013 58.071);\n  --color-stone-600: oklch(44.4% 0.011 73.639);\n  --color-stone-700: oklch(37.4% 0.01 67.558);\n  --color-stone-800: oklch(26.8% 0.007 34.298);\n  --color-stone-900: oklch(21.6% 0.006 56.043);\n  --color-stone-950: oklch(14.7% 0.004 49.25);\n\n  --color-black: #000;\n  --color-white: #fff;\n\n  --spacing: 0.25rem;\n\n  --breakpoint-sm: 40rem;\n  --breakpoint-md: 48rem;\n  --breakpoint-lg: 64rem;\n  --breakpoint-xl: 80rem;\n  --breakpoint-2xl: 96rem;\n\n  --container-3xs: 16rem;\n  --container-2xs: 18rem;\n  --container-xs: 20rem;\n  --container-sm: 24rem;\n  --container-md: 28rem;\n  --container-lg: 32rem;\n  --container-xl: 36rem;\n  --container-2xl: 42rem;\n  --container-3xl: 48rem;\n  --container-4xl: 56rem;\n  --container-5xl: 64rem;\n  --container-6xl: 72rem;\n  --container-7xl: 80rem;\n\n  --text-xs: 0.75rem;\n  --text-xs--line-height: calc(1 / 0.75);\n  --text-sm: 0.875rem;\n  --text-sm--line-height: calc(1.25 / 0.875);\n  --text-base: 1rem;\n  --text-base--line-height: calc(1.5 / 1);\n  --text-lg: 1.125rem;\n  --text-lg--line-height: calc(1.75 / 1.125);\n  --text-xl: 1.25rem;\n  --text-xl--line-height: calc(1.75 / 1.25);\n  --text-2xl: 1.5rem;\n  --text-2xl--line-height: calc(2 / 1.5);\n  --text-3xl: 1.875rem;\n  --text-3xl--line-height: calc(2.25 / 1.875);\n  --text-4xl: 2.25rem;\n  --text-4xl--line-height: calc(2.5 / 2.25);\n  --text-5xl: 3rem;\n  --text-5xl--line-height: 1;\n  --text-6xl: 3.75rem;\n  --text-6xl--line-height: 1;\n  --text-7xl: 4.5rem;\n  --text-7xl--line-height: 1;\n  --text-8xl: 6rem;\n  --text-8xl--line-height: 1;\n  --text-9xl: 8rem;\n  --text-9xl--line-height: 1;\n\n  --font-weight-thin: 100;\n  --font-weight-extralight: 200;\n  --font-weight-light: 300;\n  --font-weight-normal: 400;\n  --font-weight-medium: 500;\n  --font-weight-semibold: 600;\n  --font-weight-bold: 700;\n  --font-weight-extrabold: 800;\n  --font-weight-black: 900;\n\n  --tracking-tighter: -0.05em;\n  --tracking-tight: -0.025em;\n  --tracking-normal: 0em;\n  --tracking-wide: 0.025em;\n  --tracking-wider: 0.05em;\n  --tracking-widest: 0.1em;\n\n  --leading-tight: 1.25;\n  --leading-snug: 1.375;\n  --leading-normal: 1.5;\n  --leading-relaxed: 1.625;\n  --leading-loose: 2;\n\n  --radius-xs: 0.125rem;\n  --radius-sm: 0.25rem;\n  --radius-md: 0.375rem;\n  --radius-lg: 0.5rem;\n  --radius-xl: 0.75rem;\n  --radius-2xl: 1rem;\n  --radius-3xl: 1.5rem;\n  --radius-4xl: 2rem;\n\n  --shadow-2xs: 0 1px rgb(0 0 0 / 0.05);\n  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);\n  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);\n\n  --inset-shadow-2xs: inset 0 1px rgb(0 0 0 / 0.05);\n  --inset-shadow-xs: inset 0 1px 1px rgb(0 0 0 / 0.05);\n  --inset-shadow-sm: inset 0 2px 4px rgb(0 0 0 / 0.05);\n\n  --drop-shadow-xs: 0 1px 1px rgb(0 0 0 / 0.05);\n  --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);\n  --drop-shadow-md: 0 3px 3px rgb(0 0 0 / 0.12);\n  --drop-shadow-lg: 0 4px 4px rgb(0 0 0 / 0.15);\n  --drop-shadow-xl: 0 9px 7px rgb(0 0 0 / 0.1);\n  --drop-shadow-2xl: 0 25px 25px rgb(0 0 0 / 0.15);\n\n  --text-shadow-2xs: 0px 1px 0px rgb(0 0 0 / 0.15);\n  --text-shadow-xs: 0px 1px 1px rgb(0 0 0 / 0.2);\n  --text-shadow-sm:\n    0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075);\n  --text-shadow-md:\n    0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1);\n  --text-shadow-lg:\n    0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1);\n\n  --ease-in: cubic-bezier(0.4, 0, 1, 1);\n  --ease-out: cubic-bezier(0, 0, 0.2, 1);\n  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n\n  --animate-spin: spin 1s linear infinite;\n  --animate-ping: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n  --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n  --animate-bounce: bounce 1s infinite;\n\n  @keyframes spin {\n    to {\n      transform: rotate(360deg);\n    }\n  }\n\n  @keyframes ping {\n    75%,\n    100% {\n      transform: scale(2);\n      opacity: 0;\n    }\n  }\n\n  @keyframes pulse {\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes bounce {\n    0%,\n    100% {\n      transform: translateY(-25%);\n      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);\n    }\n\n    50% {\n      transform: none;\n      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);\n    }\n  }\n\n  --blur-xs: 4px;\n  --blur-sm: 8px;\n  --blur-md: 12px;\n  --blur-lg: 16px;\n  --blur-xl: 24px;\n  --blur-2xl: 40px;\n  --blur-3xl: 64px;\n\n  --perspective-dramatic: 100px;\n  --perspective-near: 300px;\n  --perspective-normal: 500px;\n  --perspective-midrange: 800px;\n  --perspective-distant: 1200px;\n\n  --aspect-video: 16 / 9;\n\n  --default-transition-duration: 150ms;\n  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  --default-font-family: --theme(--font-sans, initial);\n  --default-font-feature-settings: --theme(--font-sans--font-feature-settings, initial);\n  --default-font-variation-settings: --theme(--font-sans--font-variation-settings, initial);\n  --default-mono-font-family: --theme(--font-mono, initial);\n  --default-mono-font-feature-settings: --theme(--font-mono--font-feature-settings, initial);\n  --default-mono-font-variation-settings: --theme(--font-mono--font-variation-settings, initial);\n}\n\n/* Deprecated */\n@theme default inline reference {\n  --blur: 8px;\n  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);\n  --drop-shadow: 0 1px 2px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.06);\n  --radius: 0.25rem;\n  --max-width-prose: 65ch;\n}\n",
    utilities: "@tailwind utilities;\n"
  };
  console.warn(
    "The browser build of Tailwind CSS should not be used in production. To use Tailwind CSS in production, use the Tailwind CLI, Vite plugin, or PostCSS plugin: https://tailwindcss.com/docs/installation"
  );
  var tailwindCompiler_inLhaq,
    tailwindTypeValue_IysNOw = "text/tailwindcss",
    currentClassSet_nHbxcQ = new Set(),
    lastInputCss_OEWiso = "",
    outputStyleElement_faOivb = document.createElement("style"),
    queuedBuildPromise_Gmxdmu = Promise.resolve(),
    buildNumCounter_iXYDEr = 1,
    performanceUtil_iFdJxH = new class {
      start(markName_ZQwWLO) {
        performance.mark(`${markName_ZQwWLO} (start)`);
      }
      end(measureName_lUQkzP, details_CtTRuu) {
        performance.mark(`${measureName_lUQkzP} (end)`),
        performance.measure(measureName_lUQkzP, {
          start: `${measureName_lUQkzP} (start)`,
          end: `${measureName_lUQkzP} (end)`,
          detail: details_CtTRuu
        });
      }
      hit(hitMarkName_tuFhoi, hitDetails_jqQCML) {
        performance.mark(hitMarkName_tuFhoi, { detail: hitDetails_jqQCML });
      }
      error(errorDetails_lGNJQd) {
        throw performance.mark("(error)", { detail: { error: `${errorDetails_lGNJQd}` } }), errorDetails_lGNJQd;
      }
    }();
  async function loadBuiltinTailwindModule_MGKpsw(id_rDEigR, base_KloVIR) {
    try {
      let result_JNRIoF = function () {
        if ("tailwindcss" === id_rDEigR) return { base: base_KloVIR, content: defaultTailwindStyleContent_UlQqnO.index };
        if (
        "tailwindcss/preflight" === id_rDEigR ||
        "tailwindcss/preflight.css" === id_rDEigR ||
        "./preflight.css" === id_rDEigR)

        return { base: base_KloVIR, content: defaultTailwindStyleContent_UlQqnO.preflight };
        if (
        "tailwindcss/theme" === id_rDEigR ||
        "tailwindcss/theme.css" === id_rDEigR ||
        "./theme.css" === id_rDEigR)

        return { base: base_KloVIR, content: defaultTailwindStyleContent_UlQqnO.theme };
        if (
        "tailwindcss/utilities" === id_rDEigR ||
        "tailwindcss/utilities.css" === id_rDEigR ||
        "./utilities.css" === id_rDEigR)

        return { base: base_KloVIR, content: defaultTailwindStyleContent_UlQqnO.utilities };
        throw new Error(
          `The browser build does not support @import for "${id_rDEigR}"`
        );
      }();
      return (
        performanceUtil_iFdJxH.hit("Loaded stylesheet", { id: id_rDEigR, base: base_KloVIR, size: result_JNRIoF.content.length }),
        result_JNRIoF);

    } catch (err_sjKlTN) {
      throw (
        performanceUtil_iFdJxH.hit("Failed to load stylesheet", {
          id: id_rDEigR,
          base: base_KloVIR,
          error: err_sjKlTN.message ?? err_sjKlTN
        }),
        err_sjKlTN);

    }
  }
  async function throwNoPluginSupport_OaejcX() {
    throw new Error(
      "The browser build does not support plugins or config files."
    );
  }
  function queueTailwindBuild_ELDkRP(mode_BpFfSU) {
    queuedBuildPromise_Gmxdmu = queuedBuildPromise_Gmxdmu.
    then(async function () {
      if (!tailwindCompiler_inLhaq && "full" !== mode_BpFfSU) return;
      let buildNum_vDCPwY = buildNumCounter_iXYDEr++;
      performanceUtil_iFdJxH.start(`Build #${buildNum_vDCPwY} (${mode_BpFfSU})`),
      "full" === mode_BpFfSU && (
      await async function () {
        performanceUtil_iFdJxH.start("Create compiler"), performanceUtil_iFdJxH.start("Reading Stylesheets");
        let styleEls_paLfhn = document.querySelectorAll(`style[type="${tailwindTypeValue_IysNOw}"]`),
          css_cLrSfo = "";
        for (let styleEl_xfPWyG of styleEls_paLfhn) observeStyleElement_SaToTH(styleEl_xfPWyG), css_cLrSfo += styleEl_xfPWyG.textContent + "\n";
        if (
        css_cLrSfo.includes("@import") || (css_cLrSfo = `@import "tailwindcss";${css_cLrSfo}`),
        performanceUtil_iFdJxH.end("Reading Stylesheets", {
          size: css_cLrSfo.length,
          changed: lastInputCss_OEWiso !== css_cLrSfo
        }),
        lastInputCss_OEWiso !== css_cLrSfo)
        {
          lastInputCss_OEWiso = css_cLrSfo, performanceUtil_iFdJxH.start("Compile CSS");
          try {
            tailwindCompiler_inLhaq = await compileTailwindCss_uyhkzZ(css_cLrSfo, {
              base: "/",
              loadStylesheet: loadBuiltinTailwindModule_MGKpsw,
              loadModule: throwNoPluginSupport_OaejcX
            });
          } finally {
            performanceUtil_iFdJxH.end("Compile CSS"), performanceUtil_iFdJxH.end("Create compiler");
          }
          currentClassSet_nHbxcQ.clear();
        }
      }()),
      performanceUtil_iFdJxH.start("Build"),
      await async function (mode_XIpkgj) {
        if (!tailwindCompiler_inLhaq) return;
        let classCandidates_XUlLPG = new Set();
        performanceUtil_iFdJxH.start("Collect classes");
        for (let el_sRULKr of document.querySelectorAll("[class]"))
        for (let className_NJGbeT of el_sRULKr.classList) currentClassSet_nHbxcQ.has(className_NJGbeT) || (currentClassSet_nHbxcQ.add(className_NJGbeT), classCandidates_XUlLPG.add(className_NJGbeT));
        performanceUtil_iFdJxH.end("Collect classes", { count: classCandidates_XUlLPG.size }),
        (0 !== classCandidates_XUlLPG.size || "incremental" !== mode_XIpkgj) && (
        performanceUtil_iFdJxH.start("Build utilities"),
        outputStyleElement_faOivb.textContent = tailwindCompiler_inLhaq.build(Array.from(classCandidates_XUlLPG)),
        performanceUtil_iFdJxH.end("Build utilities"));
      }(mode_BpFfSU),
      performanceUtil_iFdJxH.end("Build"),
      performanceUtil_iFdJxH.end(`Build #${buildNum_vDCPwY} (${mode_BpFfSU})`);
    }).
    catch((error_zWXZdg) => performanceUtil_iFdJxH.error(error_zWXZdg));
  }
  var tailwindStyleObserver_semHIu = new MutationObserver(() => queueTailwindBuild_ELDkRP("full"));
  function observeStyleElement_SaToTH(el_zuQOXo) {
    tailwindStyleObserver_semHIu.observe(el_zuQOXo, {
      attributes: !0,
      attributeFilter: ["type"],
      characterData: !0,
      subtree: !0,
      childList: !0
    });
  }
  new MutationObserver((mutationRecords_KkcWWK) => {
    let addedTwStyles_tMkrTA = 0,
      otherDomChanges_JmLVse = 0;
    for (let mutation_TiMDmE of mutationRecords_KkcWWK) {
      for (let node_vNEkqa of mutation_TiMDmE.addedNodes)
      node_vNEkqa.nodeType === Node.ELEMENT_NODE &&
      "STYLE" === node_vNEkqa.tagName &&
      node_vNEkqa.getAttribute("type") === tailwindTypeValue_IysNOw && (
      observeStyleElement_SaToTH(node_vNEkqa), addedTwStyles_tMkrTA++);
      for (let el_iABgMS of mutation_TiMDmE.addedNodes) 1 === el_iABgMS.nodeType && el_iABgMS !== outputStyleElement_faOivb && otherDomChanges_JmLVse++;
      "attributes" === mutation_TiMDmE.type && otherDomChanges_JmLVse++;
    }
    return addedTwStyles_tMkrTA > 0 ? queueTailwindBuild_ELDkRP("full") : otherDomChanges_JmLVse > 0 ? queueTailwindBuild_ELDkRP("incremental") : void 0;
  }).observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["class"],
    childList: !0,
    subtree: !0
  }),
  queueTailwindBuild_ELDkRP("full"),
  document.head.append(outputStyleElement_faOivb);
})();


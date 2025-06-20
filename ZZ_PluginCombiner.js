/*:ja
 * @target MZ
 * @plugindesc 他のプラグイン同士の機能を組み合わせ、新たな動作を提供。
 * @author あるく
 * @url 
 * @help
 * 
 * 【ZZ_PluginCombiner 概要】
 * 本プラグインは、複数の他者製プラグインの機能や動作を組み合わせ、
 * それらを統合したり、連携を補助する機能を提供します。
 * 本プラグイン単独では目立った機能は持たず、他プラグインと併用することで効果を発揮します。
 * 
 * 【利用上の注意】
 * ・このプラグインは、他者が作成したプラグインの挙動に依存します。
 * ・組み合わせ対象のプラグインのライセンスや利用規約を必ず確認し、
 *   該当プラグインの著作権者の権利を尊重してください。
 * ・本プラグインは、対象プラグインの改変は行わず、
 *   既存機能の連携・統合をJavaScript上で補助するだけです。
 * 
 * 【互換性・順序】
 * ・ZZ_PluginCombiner は必ずプラグイン管理での順番を最後にしてください。
 * 　組み合わせ対象のプラグインより後に読み込まなければ予期しない競合が起こる可能性があります。
 * ・必要に応じてデバッグや調整を行ってください。
 * 
 * 【利用規約】
 * ・本プラグイン自体は商用・非商用を問わず利用可能です。
 * ・改変・再配布は自由ですが、改変時はオリジナルの著作表示を残してください。
 * ・組み合わせ対象となる他プラグインの著作権・ライセンス条件に従う義務があります。
 * ・本プラグインを利用したことによる不具合・損害等について、作者は一切の責任を負いません。
 * 
 * 
 * @param isEnable_AlchemySystem_ARTM_TMDescriptionExMZ
 * @text AlchemySystem + ARTM_TMDescriptionExMZ 組み合わせ機能を有効化
 * @type boolean
 * @default true
 * 
 * @param isEnable_SkillTree_ARTM_TMDescriptionExMZ
 * @text SkillTree + ARTM_TMDescriptionExMZ 組み合わせ機能を有効化
 * @type boolean
 * @default true
 */


(() => {
    'use strict';
    const parameters = PluginManager.parameters("ZZ_PluginCombiner");

    // -----------------------------------------------------------------------------
    // AlchemySystem + ARTM_TMDescriptionExMZ
    // 概要: AlchemySystemの合成画面で、ARTM_TMDescriptionExMZの詳細確認を実装
    // -----------------------------------------------------------------------------
    const isEnable_AlchemySystem_ARTM_TMDescriptionExMZ = parameters["isEnable_AlchemySystem_ARTM_TMDescriptionExMZ"] === "true";
    if (isEnable_AlchemySystem_ARTM_TMDescriptionExMZ) {
        if (typeof AlchemyClassAlias !== "undefined") {
            const _Scene_Alchemy_create = AlchemyClassAlias.Scene_Alchemy.prototype.create;
            AlchemyClassAlias.Scene_Alchemy.prototype.create = function() {
                _Scene_Alchemy_create.call(this);
                this._windowSelectRecipes.setHandler("description", this.descriptionOpen.bind(this));
                this.createDescriptionExWindow();
            };

            AlchemyClassAlias.Scene_Alchemy.prototype.descriptionOpen = function(mainWindow) {
                this._descriptionMainWindow = mainWindow;
                this._descriptionExWindow.setItem(this._descriptionMainWindow.recipe().targetItemData());
                this._descriptionExWindow.open();
                this._descriptionExWindow.activate();
            };
        } else {
            console.warn("AlchemySystem + ARTM_TMDescriptionExMZ の組み合わせは有効化されていますが、AlchemySystemのプラグインが存在しません。");
        }
    }

    // -----------------------------------------------------------------------------
    // SkillTree + ARTM_TMDescriptionExMZ
    // 概要: SkillTreeのスキルツリー画面で、ARTM_TMDescriptionExMZの詳細確認を実装
    // -----------------------------------------------------------------------------
    const isEnable_SkillTree_ARTM_TMDescriptionExMZ = parameters["isEnable_SkillTree_ARTM_TMDescriptionExMZ"] === "true";
    if (isEnable_SkillTree_ARTM_TMDescriptionExMZ) {
        if (typeof SkillTreeClassAlias !== "undefined") {
            const _Scene_SkillTree_create = SkillTreeClassAlias.Scene_SkillTree.prototype.create;
            SkillTreeClassAlias.Scene_SkillTree.prototype.create = function() {
                _Scene_SkillTree_create.call(this);
                this._windowSkillTree.setHandler("description", this.descriptionOpen.bind(this));
                this.createDescriptionExWindow();
            };

            SkillTreeClassAlias.Scene_SkillTree.prototype.descriptionOpen = function(mainWindow) {
                this._descriptionMainWindow = mainWindow;
                const skill = this._skillTreeManager.selectNode().info().skill();
                this._descriptionExWindow.setItem(skill);
                this._descriptionExWindow.open();
                this._descriptionExWindow.activate();
            };
        } else {
            console.warn("SkillTree + ARTM_TMDescriptionExMZ の組み合わせは有効化されていますが、SkillTreeのプラグインが存在しません。");
        }
    }

})();
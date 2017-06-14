'use srict';

var year = new Date().getFullYear(),
    exp = year+1,
    month = new Date().getMonth();
    
module.exports = {
    
    expires: function(){
        return new Date(year+1,month+1);
    },
    makeCVV: function(){
        return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    },
    cardNumber: function(id){
        return numbers[id];
    },


    validateOne: function(params){
        let validPromise = new Promise((fulfill, reject) => {
            Card.findOne({cardNumber: params.cardNumber})
            .exec(function (err,card){
                if (err) {
                    console.log('validate one error ' + err);
                        reject (err);
                    }
                if (!card || card.cvv != params.cvv || card.status != 'Active')//|| card.expiry_date != req.allParams.expiry_date )
                    { 
                        reject ('invalid card')
                }
                else{ 
                    console.log(card);
                    fulfill(card) } 
            })
        })
        return validPromise;
    },

    validateId: function(params){
        let validPromise = new Promise((fulfill, reject) => {
            Card.findOne({id: params.card_ID})
            .exec(function (err,card){
                if (err) {
                    console.log('validate one error ' + err);
                        reject (err);
                    }
                if (!card || card.cvv != params.cvv || card.status != 'Active')//|| card.expiry_date != req.allParams.expiry_date )
                    { 
                        reject ('invalid card')
                }
                else{ 
                    console.log(card);
                    fulfill(card) } 
            })
        })
        return validPromise;
    }
}

var numbers = [5527039244041431,5250592883630263,5429632327219574,5246832122775983,5475277075286517,5166179238559141,5415969719969101,5275375867863535,5373097461519864,5465764352882540,5131496792290174,5586030515787941,5487526582030016,5438465058409414,5305674993042681,5574087394737664,5446494273069613,5494586495406845,5491082684903860,5109455693964616,5133886243602506,5549711699189477,5439255339112948,5184307890938026,5451479855847199,5233698236473566,5394387724916022,5109304195258244,5204248672448493,5132900817309652,5343669040583707,5353311354288139,5493327471894717,5537557332163922,5301381149345745,5222043029435675,5439253893598289,5521407042246039,5107145085338444,5240903633593730,5481262859680889,5206711028534470,5154151544022589,5383292562420082,5191539215886206,5496722294945984,5255264903747288,5166665098173882,5277027216952943,5194475290163186,5577708943929331,5383069101791359,5359143210360164,5121851456196129,5523010580060099,5338960970187222,5450163563621408,5351243013072475,5211752512868142,5597346526589242,5260389388869894,5204687178171416,5145579317564936,5109182616117177,5526676227506301,5193524605053557,5478975384991464,5153082192926980,5211669660294774,5294477069016693,5194028282418363,5382017891781438,5553770874545534,5367744711136688,5338073023593253,5172032134354426,5597708991332574,5348438994975680,5500063431749169,5276991223958089,5322010884866970,5163120577610577,5366802537132181,5121371893650927,5451365346161615,5224007062779677,5556650665261771,5509897430924989,5545004021743631,5378918126267612,5469592929954328,5578852317535677,5468830216919435,5343410818903540,5598001798383498,5185122025700806,5556603111664015,5269132515637714,5314842244399296,5390464305926342,5437137317518183,5364224319712902,5453777029720038,5153380555878297,5222936300715402,5216401536428948,5169834442436091,5458196742132709,5191551484261334,5390791306168569,5483327206119416,5298692087878314,5120956522943536,5435089598672530,5432551046049275,5179906161508900,5166970333227885,5309646809329334,5359741336591495,5123852014514488,5500980873340043,5544970226621106,5372872574281110,5572879300927294,5258076301024210,5409253495964638,5448684319410015,5144525045017359,5507106278653797,5350297094936850,5201998535365614,5347873318572733,5282136195497433,5155776457545660,5496419648178400,5575225277255391,5590627957094118,5353683952395163,5381291745437239,5596337665047135,5113962257899041,5118240499611671,5200897437774405,5501150082416575,5275449865529107,5415659909569791,5116373800046451,5167849150970125,5436681818231987,5570754843969099,5442969541791647,5212133231818800,5359407047681716,5331291981170164,5259684352330540,5234736384665739,5294262508672953,5249235155110770,5487954985856433,5174336307614492,5166792186749918,5247408610462357,5250506783524756,5467081037588774,5593023558581785,5128583424689611,5385290156956477,5517583464168400,5151962114343749,5100137421351592,5516887928593769,5579925986398475,5365036638535874,5489605245340380,5355146981030472,5166622186567111,5318822995558585,5355014190283540,5289533955768701,5425100842391280,5325442396593171,5191222336942006,5378021937635513,5362555106727716,5478385562583853,5158685137859770,5562288843129495,5347529483299391,5301984535023865,5527986974230990,5126131517764156,5553907307806170,5364355303773052,5148002773678725,5533296570555937,5507390069331546,5584460811101475,5527239529647635,5496960562312533,5453615178769101,5234846458690636,5557923075232875,5373102874512769,5259687432219849,5318348362640079,5518263872022379,5410840014308359,5370694849972220,5437088658543100,5210001039437663,5353134580982378,5426671210053644,5357693312504673,5202207007433838,5457686965600276,5391509186128266,5241672951208945,5163053021099610,5567977896804211,5265523391344363,5214105192252672,5263017156526951,5247083208277366,5280564889546508,5181335965437833,5588705030393998,5111798411640703,5227246401151621,5350533133745211,5346381323444345,5324164565340652,5477103011538142,5417064942828700,5520923027326225,5311819959232287,5447280492928096,5243867235313994,5221824493244284,5154155071194844,5568916747035087,5157130819295341,5111426736894066,5140206397139794,5332325820957420,5274370443515346,5367102500823786,5590196065861495,5487632836075243,5235252376221373,5244777293756357,5338347744741155,5451486772306985,5235359771691108,5332614562388583,5154639043693140,5465237434201542,5485349418008102,5389670818195125,5252925881883062,5549420363454163,5289191473241808,5214736618718563,5506106534973618,5400043025894556,5317783597835188,5253148825404908,5276804728476939,5355529769567825,5117528169953550,5101113140072255,5533592712314732,5375221844024909,5246535421914761,5393105454728966,5251186901697989,5388569462396362,5320203234074724,5189766480525235,5387590866687934,5203112108285815,5287168058892504,5175567384517344,5123580334627801,5331867098566392,5184816377926585,5315627397507459,5375421815257872,5236508860842019,5513797180737652,5583044680577295,5236054875164404,5475689313910031,5236359105027689,5208608203794788,5120607138117243,5501071212276111,5201654161484449,5295257513205723,5116508227272723,5363766590190274,5261445966128043,5322871323072367,5442693959937688,5356698956910400,5385081620369201,5240425899022428,5154979439216795,5489437986953043,5377443821818727,5554985136378636,5413012644689098,5167620533457225,5357089246479209,5403665613747981,5118883228282080,5375032416904851,5317808799707032,5121632321157979,5364151953650918,5235263498460997,5207951846125189,5525917559953104,5126212360588361,5169805923978579,5329321198241617,5295694018903461,5393106838590445,5152595180384756,5175691903716870,5144917519714076,5446631828424179,5493434425720202,5586436922048795,5192386432794188,5224045006273407,5368990834749415,5227777211054951,5114196763842406,5588325355965344,5162055935835386,5337311775699998,5583446618170475,5386708303531066,5577044523281640,5174856826334124,5544150644126216,5522385067226681,5244182547007576,5349167027809413,5500738948880843,5535143512083628,5479925901165778,5144173147314000,5360298903430018,5346046196277458,5264983562151156,5501691758479876,5139175242830241,5433689403192848,5171030192005519,5300670681003923,5124530128206170,5373242031710094,5540149049716955,5221798541904810,5278872146703836,5295209458013265,5324561111251756,5480229295906534,5164167810099661,5449485838653146,5425623020030883,5293499436144074,5476472427489062,5564895555848936,5435816459996453,5315667292736621,5199915141093277,5589976285749809,5521847843736821,5343631534007312,5546389229597445,5337010221344106,5159275834314508,5116694568755375,5399831576035378,5384670511120417,5140583138077321,5387045246498775,5556685506824080,5204792537136694,5283816735714053,5232926590502048,5596935565048705,5106946617833161,5381541110747475,5461849850205650,5338647542870233,5417796311900442,5506333662630980,5552053022249783,5565565413279876,5552379019960862,5502481041062286,5450763489041175,5154941691960643,5444039506160390,5181949512582204,5181825751500513,5500168698633780,5351295554619866,5248827523706916,5302721200378334,5362979132350683,5240566094648440,5509579932511304,5259410867618025,5269129419165727,5136059002566638,5395039647066372,5412506752337912,5440940103987529,5226048319147035,5302046219980486,5584673387477778,5518768830631913,5472090662846939,5481965081159494,5371313183822672,5257237026352010,5320523136966069,5221151932773677,5363537427421939,5552489332170139,5387521424053335,5591378736355995,5347789504114892,5322036911608978,5459120796615780,5290662867581907,5562387846029882,5311595780240828,5340949909283521,5236219694764235,5361143279751176,5390415729136579,5426516458948908,5503648749801822,5270754010911620,5483503718274176,5199559962094988,5496797849544805,5196117991228607,5204659115304152,5357507905273712,5592709229057293,5452058443154729,5112454186972090,5295091528506217,5265527382555853,5178478552742135,5463523533922183,5377264622707459,5238978562474924,5376745901472683,5572123547041399,5214079320828903,5441530538378375,5120922526336747,5458160980206344,5388179756395201,5336699384893049,5252217131535159,5342575647816278,5142169415289736,5177805406267169,5437693903949414,5310368258496061,5438762050855143,5327224607737757,5559325452202778,5579266455479987,5576930427132270,5585243374361705,5446661749817094,5202577721174086,5179358060866080,5548151937050499,5353535882168625,5450971461532661,5578744479938494,5258133703301975,5267094222110405,5417874907669034,5209604847132393,5511530017907871,5473191985398738,5532283247152059,5473685780805557,5196761325435634,5599050457585538,5580490692957566,5489091038067201,5546774836358028,5203867175895222,5123341531837408,5387801481530429,5395067949092713,5295265662873415,5348850233745841,5493127646296701,5218253277538015,5190358757184925,5401804374686565,5360826961816734,5489376755407452,5150331119141436,5215427038924614,5371453274365734,5376141610494582,5218393826543585,5115884049765272,5250886832843195,5392833267282134,5281620712448673,5135162946754384,5450848676254077,5468056664409360,5411214547117720,5106973838324044,5442237815249688,5352475551970848,5406844243665999,5177899441102317,5164412423127784,5413112638705890,5209038077601076,5230735102744879,5228900079962284,5505443720281220,5464039482761158,5140073513457041,5537982800144990,5575968719362115,5211000017933882,5346173016561091,5322843948870277,5113774532520460,5482184050311081,5369466251082878,5269740526490087,5445541941713740,5191917317249087,5336982431698037,5513282760330327,5417989274325968,5358408883598114,5477197246286014,5417165809778548,5546282398789929,5521848162871066,5190881218130344,5512838480293052,5123640273742688,5181569513839047,5550205768619999,5391620342963171,5546100055891871,5323473694684828,5448264711041963,5111396451724295,5447897711578863,5356512304552345,5132872859517759,5298054081055185,5304735130124004,5312654249912953,5420624448295293,5365994117254609,5296546072270204,5557853903702221,5388484268529002,5597985269439766,5538694968495424,5335681327891141,5422265348536622,5229094509212731,5466035861104836,5430965615064741,5474176564813016,5275652649239410,5576080595255154,5160361736004194,5111492646689715,5333175712060224,5288439663722033,5388502193929763,5257655105717698,5116421506356953,5412747503013127,5111935874895537,5170779167240458,5519313348057332,5418629846587658,5383683201637484,5578571597719419,5279604389553506,5136098589845874,5226942535847644,5270278876547187,5378138769757353,5294802845390205,5326685968228290,5440313440332959,5520909558211290,5276595003051757,5304725642114262,5341025797633470,5361935666397897,5509447914440670,5287031092496056,5372492577713751,5181549972282913,5159874266679105,5510128811606657,5333652138539908,5344415701922464,5476623828939440,5119257230765862,5186561299524450,5572193629433319,5417118725505214,5348449751060392,5534853420165090,5171924479215892,5274389789288300,5598691954221233,5589825576580607,5256943419058574,5427679584724046,5535644193216007,5195500344283687,5511700454705787,5174979200620908,5111991126835250,5422735456334630,5250371801343279,5502369065147291,5249423572826299,5597618112055105,5304291830273121,5461766622474994,5416178793040826,5522521854522946,5315603983945536,5491045085338895,5484099628755783,5343672854385540,5524259723533533,5551816975048001,5365362418746170,5485773040216355,5475495563931788,5256187719211042,5347473872805676,5371152979127692,5446537259687574,5347890832022136,5299031506615396,5347418887958580,5377358997590274,5386270564538058,5528185285783164,5486454360422134,5179025318003184,5237151006338508,5299450098809219,5314031739661499,5447811966293722,5480851105890705,5577066715280411,5386618729043002,5589736312744268,5541852306655084,5151254151319224,5467820732103409,5196845011749414,5234493900136080,5327191048618849,5546559527243567,5489965207229504,5580945787562720,5455672895276280,5185812152903658,5418087934215916,5314712741469951,5599800942902759,5501135183136578,5475638359201367,5558206871364368,5424781772248011,5550635704472154,5143545873682067,5198886209312050,5363584035775603,5357944558844186,5418001639064115,5432141821449781,5112179934399557,5138020066778756,5410524562884066,5292892151025885,5393870641679758,5285580845426317,5412693467633585,5233933721995116,5450881856974396,5215805469423174,5436063703060781,5524705671733657,5350350865569226,5464816511025188,5375067522034391,5270824786860200,5421270014494669,5150090124599695,5483666371466163,5544773294966332,5223901368511357,5304464405915950,5350144195102158,5100327661884598,5389745932245830,5325979312552898,5548496219873641,5122164889166019,5476429395585677,5326303421891700,5190351120404013,5383824513036615,5285440269956846,5595592023128339,5200011002611915,5257209551665330,5580191226737116,5436438936443527,5227224703366080,5107352751494283,5466750432568778,5440043075751369,5545104483519857,5458465766789714,5461488629313444,5529404642875764,5223684501566724,5279096704015784,5341823150556480,5370819593384534,5298820640133519,5506026604048077,5551798158185067,5319031837776509,5506491143388766,5387658220972530,5471694632444849,5315708803724928,5229002649466257,5513488092772892,5276176956696573,5586529068007706,5399477840218646,5134190730011464,5124233386725789,5187676512542565,5338079439019833,5494294710410854,5139188805285976,5287662002017242,5114452092809081,5358273409758505,5113438181116737,5164412773120033,5445474093679735,5136007149588619,5434384656065052,5240534300812408,5387377467144725,5221601781895021,5476453771445603,5249139719693299,5150131883942450,5533744132586627,5476914403216720,5389457226027482,5143227194240384,5363512838922098,5404772240234141,5258404707036705,5382643965104742,5569244832254250,5110039008487443,5195892596642581,5584163392695275,5571476507346039,5144641953676670,5332123765857584,5176579307032599,5554983918900115,5200370420853370,5378519770793067,5590666837121311,5410629059984301,5200873021676900,5384772490599072,5333708329767615,5127543382731368,5398138078435192,5547064792532942,5185651119856843,5391659551793481,5175649904473669,5398016374344773,5440057495789908,5237218678286107,5579809454530431,5236322350041219,5119331263311736,5432015822817552,5258035418929414,5174673081714878,5248543402490866,5109951499851379,5342737666264307,5285135312631533,5327236272054615,5341865210984749,5355575874865091,5568258689635305,5476506417940202,5418301020250129,5347489721015895,5180936939052441,5326440514519440,5126955330747190,5361171471401514,5540678489019769,5263875001495940,5433110584139284,5318435575297803,5121843589955927,5395868234097980,5183456473977546,5466752875715395,5520248386889807,5181947735313233,5267362748108504,5115443720499113,5274709640102871,5275910644966894,5228152524238122,5441435225135379,5518324682711948,5109797641024922,5202018797181952,5310889455592436,5307750015870180,5153345929994674,5122231262670535,5180268868722079,5488225674303733,5462236842636888,5312497570625392,5425835217450571,5120937081917822,5578797874231907,5179206768744689,5204223176442508,5268110897893445,5434475573769907,5332751335296402,5416498491447523,5158284673933478,5169091948620435,5433685421578885,5399221177109287,5188387212555597,5304934538087968,5540176262769585,5418170427920687,5236329694559467,5503157224068014,5525821340084551,5206762166473542,5136480865752521,5316331250860126,5309612804822400,5184411479909216,5524979810292103,5460856693718691,5227717444490648,5385420497314207,5480421194386013,5117692163472387,5104710604677490,5323448487161721,5462932619854437,5185679934720910,5365997812369705,5325417864248979,5105958751882418,5569919540581942,5298114642898059,5406617468079694,5478829538382866,5596119726896175,5538114986778917,5307275758906850,5223018106103569,5111273147629057,5220915348196132,5251860929184838,5100745678757780,5190591863996580,5590329991136282,5536579245324772,5374972083922200,5208201554141690,5117375496326138,5225556256216903,5363986913207957,5274687778440299,5476783380505979,5541098105438476,5566227001270119,5492386888248660,5281627406479740,5113801665117135,5167645725101646,5594691679665460,5253916257200949,5148322282278019,5593006178134614,5434503401778582,5599885315416222,5325778528199928,5349132123352189,5524750248704740,5419358842367019,5316824496696601,5476154231701151,5269521048581219,5371342061060493,5260440989978293,5554643017214160,5119270483156283,5512836000960549,5574049811683863,5188668240304078,5335803125904344,5329645711200985,5421968428954919,5164414076240492,5342151629612661,5156857712778384,5167345594702844,5516580673937451,5368770758928900,5468897544426771,5145866478284838,5170241246202330,5335862390780185,5150111766407177,5243385614753953,5421347412186442,5371791652489943,5424910670505111,5506941508899575,5531298342991087,5481288147554859,5224846382790983,5359236708655648,5309699141032934,5569879641600043,5188515690625355,5149490823756790,5319041182590645,5214023298853691,5155421520907890,5355952203497617,5316211041203671,5433544461822374,5325767898785531,5169830607756240,5338923964624592,5121053835166739,5523388257529202,5278729015288168,5516273816178593,5344286909858648,5220037974489911]
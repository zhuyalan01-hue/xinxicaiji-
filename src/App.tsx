/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  User, 
  Home, 
  Wheat, 
  CreditCard, 
  Users, 
  Camera, 
  HandCoins,
  Check,
  Plus
} from 'lucide-react';

const steps = [
  { id: 1, title: '身份联系', short: '身份', icon: User },
  { id: 2, title: '家庭资产', short: '资产', icon: Home },
  { id: 3, title: '生产经营', short: '生产', icon: Wheat },
  { id: 4, title: '负债信用', short: '信用', icon: CreditCard },
  { id: 5, title: '村务社交', short: '社交', icon: Users },
  { id: 6, title: '影像采集', short: '影像', icon: Camera },
  { id: 7, title: '金融意愿', short: '需求', icon: HandCoins },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  // Helper for input layout
  const FormGroup = ({ label, children, required = false }: { label: string, children: React.ReactNode, required?: boolean }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5 pl-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input 
      className="w-full px-4 py-3 rounded-xl border border-[#eeeeee] bg-gray-50 caret-[#007BFF] transition-colors outline-none text-gray-800"
      {...props} 
    />
  );

  const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }) => (
    <select 
      className="w-full px-4 py-3 rounded-xl border border-[#eeeeee] bg-gray-50 caret-[#007BFF] transition-colors outline-none text-gray-800 appearance-none"
      {...props}
    >
      <option value="">请选择...</option>
      {props.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );

  const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea 
      className="w-full px-4 py-3 rounded-xl border border-[#eeeeee] bg-gray-50 caret-[#007BFF] transition-colors outline-none text-gray-800"
      rows={3}
      {...props} 
    />
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 selection:bg-brand-200">
      {/* Mobile container wrapper */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <header className="bg-brand-600 text-white pt-10 pb-4 px-5 shrink-0 z-10 shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-500 rounded-full opacity-50 blur-2xl"></div>
          
          <h1 className="text-xl font-bold mb-1 relative z-10 tracking-tight">农牧户信息采集</h1>
          <p className="text-brand-100 text-xs relative z-10 opacity-90">移动端普惠金融数据录入系统</p>
          
          {/* Steps Progress Indicator */}
          <div className="mt-6 flex justify-between items-center relative z-10">
            {steps.map((step, index) => {
              const active = currentStep === step.id;
              const passed = currentStep > step.id;
              const StepIcon = step.icon;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300
                      ${active ? 'bg-white text-brand-600 shadow-md scale-110' : 
                        passed ? 'bg-brand-500 text-white' : 'bg-brand-700 text-brand-300'}`}
                  >
                    {passed ? <Check className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[10px] mt-1.5 transition-colors ${active ? 'text-white font-medium' : 'text-brand-200'}`}>
                    {step.short}
                  </span>
                </div>
              );
            })}
            
            {/* Connecting lines */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-brand-700 -z-0"></div>
            <div 
              className="absolute top-4 left-4 h-0.5 bg-brand-400 transition-all duration-300 -z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </header>

        {/* Form Content Area */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-white relative">
          <AnimatePresence initial={false} custom={1} mode="wait">
            <motion.div
              key={currentStep}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="p-5"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center border-b border-[#eeeeee] pb-3">
                <span className="bg-brand-100 text-brand-700 p-1.5 rounded-lg mr-3">
                  {React.createElement(steps[currentStep-1].icon, { className: "w-5 h-5" })}
                </span>
                {steps[currentStep-1].title}
              </h2>

              {/* --- STEP 1: Basic Info --- */}
              {currentStep === 1 && (
                <div className="space-y-1">
                  <FormGroup label="姓名" required>
                    <Input name="name" placeholder="请输入姓名" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="身份证号" required>
                    <Input name="idCard" placeholder="18位身份证号码" maxLength={18} onChange={handleChange} />
                  </FormGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <FormGroup label="性别">
                      <Select name="gender" options={['男', '女']} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup label="年龄">
                      <Input name="age" type="number" placeholder="岁" onChange={handleChange} />
                    </FormGroup>
                  </div>
                  <FormGroup label="民族" required>
                    <Select name="ethnicity" options={['维吾尔族', '哈萨克族', '回族', '柯尔克孜族', '蒙古族', '塔吉克族', '汉族', '其他']} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="国家通用语言水平">
                    <Select name="language" options={['流利 (听说读写)', '一般 (能听懂日常)', '较弱 (需翻译)']} onChange={handleChange} />
                  </FormGroup>
                  <div className="flex items-center mb-5 p-3 bg-brand-50 rounded-xl border border-brand-100">
                    <label className="flex items-center text-sm text-brand-900 w-full cursor-pointer">
                      <input type="checkbox" name="needsTranslator" className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 mr-3 border-[#eeeeee]" onChange={handleChange} />
                      是否需维语/哈语辅助服务
                    </label>
                  </div>
                  <FormGroup label="本人手机号" required>
                    <Input name="phone" type="tel" placeholder="主用联系方式" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="详细居住地址">
                    <Textarea name="address" placeholder="地州→县市→乡镇→村/连队→小组/条田号" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="房屋类型">
                    <Select name="houseType" options={['普通自建房', '安居富民房', '定居兴牧房', '城镇商品房']} onChange={handleChange} />
                  </FormGroup>
                </div>
              )}

              {/* --- STEP 2: Assets --- */}
              {currentStep === 2 && (
                <div className="space-y-1">
                  <FormGroup label="家庭人口数 (劳动能力者)">
                    <Input name="familyWorkers" type="number" placeholder="例如: 3" onChange={handleChange} />
                  </FormGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <FormGroup label="宅基地/房屋面积(㎡)">
                      <Input name="houseArea" type="number" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup label="庭院面积(㎡)">
                      <Input name="yardArea" type="number" onChange={handleChange} />
                    </FormGroup>
                  </div>
                  <FormGroup label="政府补贴金额 (安居/定居)">
                    <Input name="houseSubsidy" type="number" placeholder="元" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="家用车辆">
                    <Input name="car" placeholder="品牌、型号(如: 是否四驱)" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="大型农用机械">
                    <Textarea name="machines" placeholder="拖拉机、采棉机、收割机等 (请注明是否享受农机补贴)" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="金融与其他资产估算">
                    <Textarea name="financeAssets" placeholder="存款理财估算、牲畜暖圈、青贮窖、太阳能设备等" onChange={handleChange} />
                  </FormGroup>
                </div>
              )}

              {/* --- STEP 3: Production --- */}
              {currentStep === 3 && (
                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-4">
                    <FormGroup label="耕地面积(亩)">
                      <Input name="landArea" type="number" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup label="草场面积(亩)">
                      <Input name="pastureArea" type="number" onChange={handleChange} />
                    </FormGroup>
                  </div>
                  <FormGroup label="种植业明细">
                    <Textarea name="crops" placeholder="棉花(机采/手摘)、玉米、小麦、林果等及面积产量" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="养殖业明细">
                    <Textarea name="livestock" placeholder="牛羊马骆驼存栏量，如: 本地羊200只，奶牛50头" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="家庭年总收入估算 (元)">
                    <Input name="annualIncome" type="number" placeholder="农牧业+务工+其他经营" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="享受的主要政府补贴">
                    <Textarea name="subsidies" placeholder="棉花目标价格、退耕还草、边民补贴等" onChange={handleChange} />
                  </FormGroup>
                </div>
              )}

              {/* --- STEP 4: Credit --- */}
              {currentStep === 4 && (
                <div className="space-y-1">
                  <FormGroup label="本行现有贷款 (余额/用途)">
                    <Textarea name="ourBankLoan" placeholder="例: 棉农e贷 5万元" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="他行或农信社贷款">
                    <Textarea name="otherBankLoan" placeholder="银行机构名称及金额" onChange={handleChange} />
                  </FormGroup>
                  <div className="flex items-center mb-5 p-3 bg-white rounded-xl border border-[#eeeeee] shadow-sm">
                    <label className="flex items-center text-sm text-gray-800 w-full cursor-pointer">
                      <input type="checkbox" name="hasPovertyLoan" className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 mr-3 border-[#eeeeee]" onChange={handleChange} />
                      存在扶贫小额信贷
                    </label>
                  </div>
                  <FormGroup label="民间借贷及对外担保">
                    <Textarea name="privateLoan" placeholder="借款对象及金额、为他人担保情况" onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="公共不良记录 (选填)">
                    <Textarea name="badCredit" placeholder="拖欠农资款、纠纷、失信被执行等（无则不填）" onChange={handleChange} />
                  </FormGroup>
                  <div className="flex items-center p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <label className="flex items-center text-sm text-amber-900 w-full cursor-pointer font-medium">
                      <input type="checkbox" name="isCreditUser" className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 mr-3 border-amber-300" onChange={handleChange} />
                      是否为评定“信用户/信用连队”
                    </label>
                  </div>
                </div>
              )}

              {/* --- STEP 5: Social --- */}
              {currentStep === 5 && (
                <div className="space-y-1">
                  <FormGroup label="邻里评价 (信誉度)">
                    <Select name="reputation" options={['优秀 (口碑极佳)', '良好 (诚实守信)', '一般', '较差']} onChange={handleChange} />
                  </FormGroup>
                  <FormGroup label="民族交往与节日习俗">
                    <Textarea name="socialCustoms" placeholder="主要交往群体、大额人情节日支出情况等" onChange={handleChange} />
                  </FormGroup>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center text-sm text-gray-700 bg-white p-3 rounded-xl border border-[#eeeeee] shadow-sm cursor-pointer">
                      <input type="checkbox" name="coopPolicy" className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 mr-3 border-[#eeeeee]" onChange={handleChange} />
                      积极配合驻村工作队 / 农技推广
                    </label>
                    <label className="flex items-center text-sm text-gray-700 bg-white p-3 rounded-xl border border-[#eeeeee] shadow-sm cursor-pointer">
                      <input type="checkbox" name="isBorderGuard" className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 mr-3 border-[#eeeeee]" onChange={handleChange} />
                      属于护边员家庭 (享护边员补助)
                    </label>
                  </div>
                </div>
              )}

              {/* --- STEP 6: Media --- */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-4">请现场拍摄或上传佐证材料原件照片，确保清晰可辨认。</p>
                  
                  {[
                    { id: 'idcard', label: '身份证与户口本' },
                    { id: 'house', label: '安居房与庭院实景' },
                    { id: 'farm', label: '农机/农田/棚圈存栏' },
                    { id: 'auth', label: '征信查询与信息采集授权书' }
                  ].map(item => (
                    <div key={item.id} className="border-2 border-dashed border-[#eeeeee] rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 bg-white hover:bg-brand-50 hover:border-brand-300 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-brand-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                        <Camera className="w-6 h-6 group-hover:text-brand-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <span className="text-xs text-gray-400 mt-1">点击拍摄或上传</span>
                    </div>
                  ))}
                </div>
              )}

              {/* --- STEP 7: Needs --- */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <FormGroup label="意向产品">
                    <Input name="intendedProduct" placeholder="如: 棉农e贷、普通农户贷款等" onChange={handleChange} />
                  </FormGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <FormGroup label="意向金额 (万元)">
                      <Input name="intendedAmount" type="number" placeholder="输入金额" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup label="意向等级">
                      <Select name="intendedLevel" options={['高 (急需用款)', '中 (近期有需求)', '低 (暂无需求)']} onChange={handleChange} />
                    </FormGroup>
                  </div>
                  <FormGroup label="意向资金需求类型 (可多选)">
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {['春耕备耕资金', '牛羊扩繁贷款', '农机升级购置', '庭院改造/装修', '乡村旅游周转'].map(need => (
                        <label key={need} className="flex items-center text-sm bg-white border border-[#eeeeee] rounded-lg p-3 cursor-pointer hover:border-brand-500">
                          <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500 mr-2" />
                          {need}
                        </label>
                      ))}
                    </div>
                  </FormGroup>
                  <FormGroup label="非信贷金融服务偏好">
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {['需要经营收款码', '愿意开通办理手机银行', '需要少数民族语言上门指导'].map(pref => (
                        <label key={pref} className="flex items-center text-sm bg-white border border-[#eeeeee] rounded-lg p-3 cursor-pointer hover:border-brand-500">
                          <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500 mr-3" />
                          {pref}
                        </label>
                      ))}
                    </div>
                  </FormGroup>
                  <div className="mt-6">
                    <FormGroup label="紧急联系人 (联户长或基层威望人员)">
                      <Input name="emergencyContact" placeholder="姓名及电话" onChange={handleChange} />
                    </FormGroup>
                  </div>
                </div>
              )}

              {/* Spacer for bottom nav */}
              <div className="h-20"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] p-4 shrink-0 flex justify-between items-center z-20 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 1 ? 'text-gray-300 bg-gray-50' : 'text-gray-700 border border-[#eeeeee] hover:bg-gray-50 active:bg-gray-100'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            上一步
          </button>
          
          {currentStep < steps.length ? (
            <button 
              onClick={handleNext}
              className="flex items-center px-8 py-3 rounded-xl bg-brand-600 text-white font-medium shadow-md shadow-brand-200 hover:bg-brand-700 active:bg-brand-800 transition-all active:scale-95"
            >
              下一步
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button 
              className="flex items-center px-8 py-3 rounded-xl bg-brand-600 text-white font-medium shadow-md shadow-brand-200 hover:bg-brand-700 active:bg-brand-800 transition-all active:scale-95"
            >
              完成提交
              <Check className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}


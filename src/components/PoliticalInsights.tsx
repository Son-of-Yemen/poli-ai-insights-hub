
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Users, Globe, TrendingUp, FileText, Download } from "lucide-react";

interface PoliticalInsightsProps {
  language: string;
}

export const PoliticalInsights = ({ language }: PoliticalInsightsProps) => {
  const insights = [
    {
      id: 1,
      type: "trend",
      title: language === "ar" ? "تزايد النشاط الدبلوماسي في الشرق الأوسط" : "Rising Diplomatic Activity in Middle East",
      description: language === "ar" 
        ? "تشهد المنطقة زيادة ملحوظة في النشاط الدبلوماسي مع تركيز متزايد على حل النزاعات" 
        : "The region shows notable increase in diplomatic activity with growing focus on conflict resolution",
      confidence: 89,
      impact: "high",
      timeframe: language === "ar" ? "الأشهر الثلاثة القادمة" : "Next 3 months",
      sources: 15,
      keywords: language === "ar" ? ["دبلوماسية", "سلام", "تعاون"] : ["diplomacy", "peace", "cooperation"]
    },
    {
      id: 2,
      type: "prediction",
      title: language === "ar" ? "توقع اتفاقيات تجارية جديدة" : "Expected New Trade Agreements",
      description: language === "ar" 
        ? "مؤشرات قوية تدل على قرب التوصل لاتفاقيات تجارية متعددة الأطراف" 
        : "Strong indicators point to upcoming multilateral trade agreement negotiations",
      confidence: 76,
      impact: "medium",
      timeframe: language === "ar" ? "6-9 أشهر" : "6-9 months",
      sources: 22,
      keywords: language === "ar" ? ["تجارة", "اقتصاد", "اتفاقية"] : ["trade", "economy", "agreement"]
    },
    {
      id: 3,
      type: "risk",
      title: language === "ar" ? "تحدي السياسات البيئية" : "Environmental Policy Challenges",
      description: language === "ar" 
        ? "تباين في المواقف الدولية قد يؤثر على تنفيذ السياسات البيئية العالمية" 
        : "Diverging international positions may impact global environmental policy implementation",
      confidence: 82,
      impact: "high",
      timeframe: language === "ar" ? "طويل المدى" : "Long-term",
      sources: 18,
      keywords: language === "ar" ? ["بيئة", "مناخ", "تحدي"] : ["environment", "climate", "challenge"]
    }
  ];

  const keyPlayers = [
    {
      name: language === "ar" ? "الأمم المتحدة" : "United Nations",
      type: "organization",
      influence: 95,
      sentiment: "positive",
      mentions: 1247
    },
    {
      name: language === "ar" ? "الاتحاد الأوروبي" : "European Union",
      type: "organization", 
      influence: 88,
      sentiment: "neutral",
      mentions: 892
    },
    {
      name: language === "ar" ? "جامعة الدول العربية" : "Arab League",
      type: "organization",
      influence: 74,
      sentiment: "positive",
      mentions: 654
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-red-400 text-red-400';
      case 'medium':
        return 'border-yellow-400 text-yellow-400';
      case 'low':
        return 'border-green-400 text-green-400';
      default:
        return 'border-gray-400 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-4 w-4 text-blue-400" />;
      case 'prediction':
        return <Brain className="h-4 w-4 text-purple-400" />;
      case 'risk':
        return <Globe className="h-4 w-4 text-orange-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {language === "ar" ? "الرؤى السياسية الذكية" : "AI Political Insights"}
          </h2>
          <p className="text-slate-400">
            {language === "ar" ? "تحليلات معمقة وتوقعات مستقبلية" : "Deep analysis and future predictions"}
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          {language === "ar" ? "تصدير التقرير" : "Export Report"}
        </Button>
      </div>

      {/* Key Insights */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getTypeIcon(insight.type)}
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg leading-relaxed">
                      {insight.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400 mt-2 leading-relaxed">
                      {insight.description}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={getImpactColor(insight.impact)}>
                  {insight.impact} impact
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    {language === "ar" ? "مستوى الثقة" : "Confidence Level"}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Progress value={insight.confidence} className="flex-1 h-2" />
                    <span className="text-sm text-white font-medium">{insight.confidence}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    {language === "ar" ? "الإطار الزمني" : "Timeframe"}
                  </p>
                  <p className="text-sm text-white font-medium">{insight.timeframe}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    {language === "ar" ? "المصادر" : "Sources"}
                  </p>
                  <p className="text-sm text-white font-medium">{insight.sources} sources</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">
                  {language === "ar" ? "الكلمات المفتاحية" : "Key Keywords"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Political Players */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="h-4 w-4 mr-2 text-purple-400" />
            {language === "ar" ? "الجهات الفاعلة الرئيسية" : "Key Political Players"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" ? "أهم الشخصيات والمؤسسات في المشهد السياسي" : "Most influential figures and institutions in the political landscape"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {keyPlayers.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded border border-slate-600/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-600 rounded">
                    <Users className="h-4 w-4 text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{player.name}</h3>
                    <p className="text-xs text-slate-400">{player.mentions} mentions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">
                      {language === "ar" ? "التأثير" : "Influence"}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Progress value={player.influence} className="w-16 h-1" />
                      <span className="text-xs text-white">{player.influence}%</span>
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`${
                      player.sentiment === 'positive' ? 'border-green-400 text-green-400' :
                      player.sentiment === 'negative' ? 'border-red-400 text-red-400' :
                      'border-yellow-400 text-yellow-400'
                    }`}
                  >
                    {player.sentiment}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Brain className="h-4 w-4 mr-2 text-cyan-400" />
            {language === "ar" ? "التوصيات الذكية" : "AI Recommendations"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" ? "اقتراحات مبنية على التحليل الذكي للبيانات" : "Suggestions based on intelligent data analysis"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-slate-700/30 rounded border-l-4 border-blue-400">
              <p className="text-white text-sm leading-relaxed">
                {language === "ar" 
                  ? "ركز على متابعة التطورات الدبلوماسية في الشرق الأوسط للأسابيع القادمة"
                  : "Focus on monitoring diplomatic developments in the Middle East for the coming weeks"
                }
              </p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded border-l-4 border-purple-400">
              <p className="text-white text-sm leading-relaxed">
                {language === "ar" 
                  ? "أضف مصادر إضافية لتغطية السياسات التجارية الدولية"
                  : "Add additional sources to cover international trade policies"
                }
              </p>
            </div>
            <div className="p-3 bg-slate-700/30 rounded border-l-4 border-orange-400">
              <p className="text-white text-sm leading-relaxed">
                {language === "ar" 
                  ? "راقب التغيرات في السياسات البيئية العالمية لتوقع التحديات المستقبلية"
                  : "Monitor changes in global environmental policies to anticipate future challenges"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

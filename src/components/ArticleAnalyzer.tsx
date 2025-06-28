
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, FileText, Globe, TrendingUp, Users, MapPin } from "lucide-react";

interface ArticleAnalyzerProps {
  language: string;
}

export const ArticleAnalyzer = ({ language }: ArticleAnalyzerProps) => {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const analyzeText = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        sentiment: {
          score: 0.65,
          label: "Positive",
          confidence: 87
        },
        entities: [
          { text: "United Nations", type: "Organization", confidence: 95 },
          { text: "Middle East", type: "Location", confidence: 92 },
          { text: "Climate Change", type: "Topic", confidence: 88 }
        ],
        topics: [
          { name: "International Relations", weight: 0.8 },
          { name: "Environmental Policy", weight: 0.6 },
          { name: "Economic Development", weight: 0.4 }
        ],
        summary: language === "ar" 
          ? "تحليل شامل للتطورات السياسية الأخيرة يظهر اتجاهات إيجابية في العلاقات الدولية مع التركيز على قضايا البيئة والتنمية المستدامة."
          : "Comprehensive analysis of recent political developments shows positive trends in international relations with focus on environmental and sustainable development issues.",
        predictions: [
          { event: "Policy Implementation", probability: 78, timeframe: "3-6 months" },
          { event: "International Agreement", probability: 65, timeframe: "6-12 months" }
        ]
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Brain className="h-5 w-5 mr-2 text-blue-400" />
            {language === "ar" ? "محلل النصوص السياسية بالذكاء الاصطناعي" : "AI Political Text Analyzer"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {language === "ar" 
              ? "أدخل النص السياسي للحصول على تحليل شامل بالذكاء الاصطناعي"
              : "Enter political text for comprehensive AI-powered analysis"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={language === "ar" 
              ? "الصق النص السياسي هنا للتحليل..."
              : "Paste political text here for analysis..."
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-32 bg-slate-700/30 border-slate-600 text-white placeholder-slate-400"
          />
          
          <Button 
            onClick={analyzeText}
            disabled={!inputText.trim() || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                {language === "ar" ? "جاري التحليل..." : "Analyzing..."}
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                {language === "ar" ? "تحليل النص" : "Analyze Text"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Analysis */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                {language === "ar" ? "تحليل المشاعر" : "Sentiment Analysis"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">
                    {language === "ar" ? "التوجه العام" : "Overall Sentiment"}
                  </span>
                  <Badge 
                    className={`${
                      analysisResult.sentiment.label === 'Positive' ? 'bg-green-900 text-green-300' :
                      analysisResult.sentiment.label === 'Negative' ? 'bg-red-900 text-red-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}
                  >
                    {analysisResult.sentiment.label}
                  </Badge>
                </div>
                <Progress 
                  value={analysisResult.sentiment.confidence} 
                  className="h-2"
                />
                <p className="text-xs text-slate-400">
                  {language === "ar" ? "مستوى الثقة" : "Confidence"}: {analysisResult.sentiment.confidence}%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Named Entities */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="h-4 w-4 mr-2 text-purple-400" />
                {language === "ar" ? "الكيانات المحددة" : "Named Entities"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysisResult.entities.map((entity: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div className="flex items-center space-x-2">
                      {entity.type === 'Organization' && <Globe className="h-3 w-3 text-blue-400" />}
                      {entity.type === 'Location' && <MapPin className="h-3 w-3 text-green-400" />}
                      {entity.type === 'Topic' && <FileText className="h-3 w-3 text-yellow-400" />}
                      <span className="text-sm text-white">{entity.text}</span>
                    </div>
                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                      {entity.confidence}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Topics Analysis */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="h-4 w-4 mr-2 text-orange-400" />
                {language === "ar" ? "المواضيع الرئيسية" : "Key Topics"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResult.topics.map((topic: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{topic.name}</span>
                      <span className="text-slate-400">{Math.round(topic.weight * 100)}%</span>
                    </div>
                    <Progress value={topic.weight * 100} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Summary */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Brain className="h-4 w-4 mr-2 text-blue-400" />
                {language === "ar" ? "الملخص الذكي" : "AI Summary"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm leading-relaxed">
                {analysisResult.summary}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {analysisResult && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <TrendingUp className="h-4 w-4 mr-2 text-cyan-400" />
              {language === "ar" ? "التوقعات السياسية" : "Political Predictions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.predictions.map((prediction: any, index: number) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded border border-slate-600/50">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-white">{prediction.event}</h4>
                    <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                      {prediction.probability}%
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">
                    {language === "ar" ? "الإطار الزمني" : "Timeframe"}: {prediction.timeframe}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cryptoService } from '../../services/cryptoApi';
import { TIMEFRAMES, CHART_COLORS, CHART_CONFIG } from '../../constants/chart';
import { formatPrice } from '../../utils/formatters';
import { ChartSkeleton } from '../ui/LoadingSkeleton';

const PriceChart = ({ cryptoId, cryptoName }) => {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('7');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasDataRef = useRef(false);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        // Se já temos dados e estamos mudando timeframe, mostra transição
        if (hasDataRef.current) {
          setIsTransitioning(true);
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        setLoading(true);
        setError(null);
        
        if (retryCount > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const data = await cryptoService.getCryptoHistory(cryptoId, timeframe);
        
        if (!data?.prices?.length) {
          throw new Error('Dados inválidos recebidos da API');
        }
        
        const transformedData = data.prices
          .filter(([timestamp, price]) => timestamp && price && !isNaN(price))
          .map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price: parseFloat(price),
            timestamp: timestamp,
          }))
          .filter(item => item.price > 0);

        if (transformedData.length === 0) {
          throw new Error('Nenhum dado válido encontrado');
        }

        // Pequeno delay para transição suave
        if (hasDataRef.current) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        setChartData(transformedData);
        hasDataRef.current = true;
        setRetryCount(0);
      } catch (error) {
        console.error('Erro ao carregar dados do gráfico:', error);
        setError(error.message || 'Erro ao carregar dados do gráfico');
        setChartData([]);
        setRetryCount(prev => prev + 1);
      } finally {
        setLoading(false);
        setIsTransitioning(false);
      }
    };

    if (cryptoId) {
      loadChartData();
    }
  }, [cryptoId, timeframe, retryCount]);

  const handleRetry = useCallback(() => {
    setRetryCount(0);
  }, []);

  const handleTimeframeChange = useCallback((newTimeframe) => {
    setTimeframe(newTimeframe);
  }, []);

  const CustomTooltip = useCallback(({ active, payload, label }) => {
    if (active && payload?.[0]?.value) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  }, []);

  // Memoizar estatísticas do gráfico
  const chartStats = useMemo(() => {
    if (!chartData.length) return null;
    
    const prices = chartData.map(d => d.price);
    return {
      lowest: Math.min(...prices),
      highest: Math.max(...prices),
      current: chartData[chartData.length - 1]?.price
    };
  }, [chartData]);

  // Memoizar configurações do gráfico
  const chartConfig = useMemo(() => ({
    margin: CHART_CONFIG.MARGIN,
    activeDot: { 
      r: CHART_CONFIG.DOT_RADIUS, 
      fill: CHART_COLORS.PRIMARY, 
      stroke: '#ffffff', 
      strokeWidth: 2,
      style: { filter: 'drop-shadow(0 0 6px rgba(0, 212, 170, 0.6))' }
    }
  }), []);

  if (loading || isTransitioning) {
    return <ChartSkeleton />;
  }

  if (error) {
    return (
      <div className="price-chart">
        <div className="chart-error">
          <p className="error-message">{error}</p>
          {retryCount < 3 && (
            <button onClick={handleRetry} className="retry-button">
              Tentar Novamente ({3 - retryCount} tentativas restantes)
            </button>
          )}
          {retryCount >= 3 && (
            <p className="error-limit-message">
              Tentando novamente...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="price-chart">
        <div className="chart-no-data">
          <p className="no-data-message">Nenhum dado disponível para exibir</p>
          <button onClick={handleRetry} className="reload-button">
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="price-chart chart-transition-enter-active">
      <div className="chart-header">
        <div className="chart-title">
          <h3>{cryptoName} Price Chart</h3>
          <p>Historical price data</p>
        </div>
        
        <div className="timeframe-selector">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              onClick={() => handleTimeframeChange(tf.value)}
              className={`timeframe-button ${timeframe === tf.value ? 'active' : ''}`}
              disabled={isTransitioning}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData} 
            margin={chartConfig.margin}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={CHART_COLORS.GRID}
              opacity={0.3}
            />
            <XAxis 
              dataKey="date" 
              stroke={CHART_COLORS.TEXT}
              fontSize={CHART_CONFIG.FONT_SIZE}
              tickLine={false}
              axisLine={false}
              tick={{ fill: CHART_COLORS.TEXT }}
            />
            <YAxis 
              stroke={CHART_COLORS.TEXT}
              fontSize={CHART_CONFIG.FONT_SIZE}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatPrice}
              tick={{ fill: CHART_COLORS.TEXT }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              animationDuration={200}
              cursor={{ stroke: CHART_COLORS.PRIMARY, strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={CHART_COLORS.PRIMARY}
              strokeWidth={CHART_CONFIG.STROKE_WIDTH}
              dot={false}
              connectNulls={false}
              animationDuration={1000}
              animationEasing="ease-in-out"
              activeDot={chartConfig.activeDot}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {chartStats && (
        <div className="chart-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <p className="stat-label">Lowest</p>
              <p className="stat-value lowest">
                {formatPrice(chartStats.lowest)}
              </p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Current</p>
              <p className="stat-value current">
                {formatPrice(chartStats.current)}
              </p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Highest</p>
              <p className="stat-value highest">
                {formatPrice(chartStats.highest)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PriceChart);

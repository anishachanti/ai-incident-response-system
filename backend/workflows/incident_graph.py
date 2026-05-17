from langgraph.graph import StateGraph, END

from models.state import IncidentState

from agents.classifier_agent import classifier_agent
from agents.log_agent import log_analysis_agent
from agents.retrieval_agent import retrieval_agent
from agents.recommendation_agent import recommendation_agent

workflow = StateGraph(IncidentState)

workflow.add_node("classifier", classifier_agent)
workflow.add_node("log_analysis", log_analysis_agent)
workflow.add_node("retrieval", retrieval_agent)
workflow.add_node("recommendation", recommendation_agent)

workflow.set_entry_point("classifier")

workflow.add_edge("classifier", "log_analysis")
workflow.add_edge("log_analysis", "retrieval")
workflow.add_edge("retrieval", "recommendation")
workflow.add_edge("recommendation", END)

app_graph = workflow.compile()

